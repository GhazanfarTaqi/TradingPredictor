from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .trading_engine import getPrediction
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
    