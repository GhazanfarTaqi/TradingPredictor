from rest_framework import serializers
from .models import ChartTradingAnalysis, NewsTradingAnalysis

class ChartTradingAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChartTradingAnalysis
        fields = [
            "module",
            "signal", 
            "confidence_score", 
            "trade_entry" ,
            "trade_sl", 
            "trade_tp", 
            "reasoning",
            "pattern",
            "created_at","exit_price",       # Add this
            "accuracy_status",  # Add this
        ]
        extra_kwargs = {"author":{"read_only":True}}

class NewsTradingAnalysis(serializers.ModelSerializer):
    class Meta:
        model = NewsTradingAnalysis
        fields = [
            "bias",
            "sentiment_score",
            "impact_duration",
            "key_catalyst",
            "reasoning",
            "top_news",
            "created_at",
        ]
        extra_kwargs = {"author":{"read_only":True}}