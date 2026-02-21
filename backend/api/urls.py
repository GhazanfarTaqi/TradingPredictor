from django.urls import path
from .views import getAnalysisView, getNewsView, getNewsAnalysisView, FusionPredictionAPIView

urlpatterns = [
    path('analyze/', getAnalysisView.as_view(), name='market_analysis'),
    path('newsAnalysis/', getNewsAnalysisView.as_view(), name='market_news'),
    path('news/', getNewsView.as_view(), name='market_news'),
    path('finalPrediction/',FusionPredictionAPIView.as_view(), name="final_prediction" )
]