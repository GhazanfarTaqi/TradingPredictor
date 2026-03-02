# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from .TradingChart import getPrediction
# from .TradingNews import getNewsArticles,getAnalysisofNews
# from .esemble import getFinalDecision
# # Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Add these two lines:
from .models import ChartTradingAnalysis
from .serializers import ChartTradingAnalysisSerializer

from .TradingChart import getPrediction
from .TradingNews import getNewsArticles, getAnalysisofNews
from .esemble import getFinalDecision
class getAnalysisView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            # Call your external script logic
            result = getPrediction()
                
            if  result == None:
                return Response(result, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    
            return Response(result, status=status.HTTP_200_OK)
                
        except Exception as e:
            print("ERROR:", e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class getNewsView(APIView):

    def get(self,request):
        try:
            articles = getNewsArticles()
            if articles == None:
                return Response(articles, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(articles, status=status.HTTP_200_OK )  
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class getNewsAnalysisView(APIView):

    def get(self,request):
        try:
            aiResponse = getAnalysisofNews()
            if aiResponse == None:
                return Response(aiResponse, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(aiResponse, status=status.HTTP_200_OK )  
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class FusionPredictionAPIView(APIView):
    """
    Returns optimal trading decision by combining
    technical + sentiment engines.
    """
    def get(self, request):
        try:
            finalDecision = getFinalDecision()
            return Response(finalDecision, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class TradingHistoryAPIView(APIView):
    """
    Returns the history of all trading signals and their accuracy 
    status (Won, Lost, Pending) for the frontend dashboard.
    """
    def get(self, request):
        try:
            # Fetch all stored signals, ordering by newest first
            history = ChartTradingAnalysis.objects.all().order_by('-created_at')
            
            # Serialize the data into JSON
            serializer = ChartTradingAnalysisSerializer(history, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)