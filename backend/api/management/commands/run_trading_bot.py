import time
import schedule
from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import ChartTradingAnalysis
from api.esemble import getFinalDecision # Import your ensemble logic
from api.models import ChartTradingAnalysis


from api.TradingChart import getPrediction
class Command(BaseCommand):
    help = 'Runs the 15-minute trading AI signal loop'

    def evaluate_pending_signals(self, current_price):
        """Checks if pending trades hit Stop Loss (SL) or Take Profit (TP)"""
        # Fetch signals that haven't been resolved yet
        pending_signals = ChartTradingAnalysis.objects.filter(accuracy_status='Pending')
        
        for signal in pending_signals:
            if signal.signal.upper() == "BUY":
                if current_price >= signal.trade_tp:
                    signal.accuracy_status = 'Won'
                    signal.exit_price = current_price
                elif current_price <= signal.trade_sl:
                    signal.accuracy_status = 'Lost'
                    signal.exit_price = current_price
                    
            elif signal.signal.upper() == "SELL":
                if current_price <= signal.trade_tp:
                    signal.accuracy_status = 'Won'
                    signal.exit_price = current_price
                elif current_price >= signal.trade_sl:
                    signal.accuracy_status = 'Lost'
                    signal.exit_price = current_price
            
            # If the status changed, save it to the database
            if signal.accuracy_status != 'Pending':
                signal.save()
                self.stdout.write(self.style.SUCCESS(f"Evaluated Signal ID {signal.id}: {signal.accuracy_status}"))
    
    
    def run_cycle(self):
        self.stdout.write(f"[{timezone.now()}] Starting 1-min cycle...")
        try:
            # 1. Fetch the prediction
            decision = getFinalDecision() # (or getFinalDecision() if you changed it)
            
            if not decision:
                self.stdout.write(self.style.WARNING("Cycle skipped: API error or no data."))
                return

            # 2. Extract the signal safely (handles both 'decision' and 'bias' keys)
            signal = decision.get('decision') or decision.get('bias', 'WAIT')
            
            if signal.upper() == "WAIT":
                self.stdout.write(self.style.WARNING("Cycle skipped: Signal is WAIT."))
                return

            # 3. Safely clean the confidence score (converts to string first to prevent crashes)
            raw_confidence = str(decision.get('confidence', decision.get('sentiment_score', 0)))
            clean_confidence = float(raw_confidence.replace('%', ''))

            # 4. Save to Database
            new_trade = ChartTradingAnalysis.objects.create(
                module=decision.get('module', 'TECHNICAL/SENTIMENT'),
                signal=signal,
                confidence_score=clean_confidence,
                trade_entry=decision.get('entry_price', 0),
                trade_tp=decision.get('take_profit', 0),
                trade_sl=decision.get('stop_loss', 0),
                reasoning=decision.get('reasoning', ''),
                pattern=decision.get("pattern_identified", decision.get("pattern", "Unknown Pattern")),
                accuracy_status="Pending"
            )
            
            self.stdout.write(self.style.SUCCESS(f"✅ Real Signal Saved! ID: {new_trade.id}"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Error in cycle: {e}"))
    
                
    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING("Starting Automated Trading Bot..."))
        
        # Run immediately on boot
        self.run_cycle()
        
        # Schedule every 15 minutes
        schedule.every(15).minutes.do(self.run_cycle)
        
        # Keep the script running forever
        while True:
            schedule.run_pending()
            time.sleep(1)
