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

# At the very top of api/views.py, add this import:
from .trading_engine import update_all_pending_trades

# ... down where your history view is:

# @api_view(['GET']) # (Or whatever decorator/class you are using)
# def history_view(request):
    
    # 🔴 THIS IS THE MISSING MAGIC LINE 🔴
    # You MUST call this function before you fetch data from MongoDB
    
    # ... the rest of your existing code that fetches from MongoDB ...
    # trades = list(trades_collection.find(...))
    # return Response(trades)
# class TradingHistoryAPIView(APIView):
#     """
#     Returns the history of all trading signals and their accuracy 
#     status (Won, Lost, Pending) for the frontend dashboard.
#     """
#     def get(self, request):
#         try:
#             # Fetch all stored signals, ordering by newest first
#             updates_made = update_all_pending_trades()
#             # update_all_pending_trades()
#             history = ChartTradingAnalysis.objects.all().order_by('-created_at')
            
#             # Serialize the data into JSON
#             serializer = ChartTradingAnalysisSerializer(history, many=True)
            
#             return Response(serializer.data, status=status.HTTP_200_OK)
            
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class TradingHistoryAPIView(APIView):
    def get(self, request):
        try:
            update_all_pending_trades() # UNCOMMENT THIS NOW
            history = ChartTradingAnalysis.objects.all().order_by('-created_at')
            serializer = ChartTradingAnalysisSerializer(history, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            # Add this print statement so you can see the exact error in your terminal!
            print(f"🔴 API CRASHED IN UPDATE LOOP: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)        
        
# # api/views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .trading_engine import update_all_pending_trades, trades_collection

# @api_view(['GET'])
# def get_dashboard_trades(request):
#     """
#     Called by React. Forces an update of pending trades before returning data.
#     """
#     # 1. Backtrack and update any trades that hit TP/SL while we were away
#     updates_made = update_all_pending_trades()
#     print(f"🔄 API triggered historical check. Updated {updates_made} trades.")
    
#     # 2. Fetch the newly updated data from MongoDB
#     # We exclude '_id' because React doesn't need MongoDB's internal object ID format
#     all_trades = list(trades_collection.find({}, {"_id": 0}).sort("created_at", -1))
    
#     return Response({
#         "status": "success",
#         "updates_processed": updates_made,
#         "data": all_trades
#     })