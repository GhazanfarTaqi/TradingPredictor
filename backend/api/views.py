from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .trading_engine import getPrediction
from .TradingNews import getNewsArticles,getAnalysisofNews
# Create your views here.

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