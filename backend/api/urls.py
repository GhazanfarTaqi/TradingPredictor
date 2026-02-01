from django.urls import path
from .views import getAnalysisView

urlpatterns = [
    path('analyze/', getAnalysisView.as_view(), name='market_analysis'),
]