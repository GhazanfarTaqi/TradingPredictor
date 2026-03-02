from django.db import models

# Create your models here.
class ChartTradingAnalysis(models.Model):
    module = models.CharField(max_length=20)
    signal = models.CharField(max_length=20)
    confidence_score = models.FloatField()
    trade_entry = models.FloatField()
    trade_sl = models.FloatField()
    trade_tp = models.FloatField()
    reasoning = models.TextField()
    pattern = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    exit_price = models.FloatField(null=True, blank=True)
    accuracy_status = models.CharField(
    max_length=20, 
    choices=[('Pending', 'Pending'), ('Won', 'Won'), ('Lost', 'Lost')],
    default='Pending')
    
    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["signal"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.signal}"

class NewsTradingAnalysis(models.Model):

    module = models.CharField(
        max_length=20,
        default="SENTIMENT"
    )
    bias = models.CharField(
        max_length=10,
    )

    sentiment_score = models.FloatField()
    impact_duration = models.CharField(max_length=15)
    key_catalyst = models.TextField()
    reasoning = models.TextField()
    # store important headlines list
    top_news = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["bias"]),
            models.Index(fields=["sentiment_score"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.bias}"


    


# Inside your model (e.g., ChartTradingAnalysis or FinalPrediction)
