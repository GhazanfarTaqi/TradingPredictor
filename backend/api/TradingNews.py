from requests import *
import os
from dotenv import load_dotenv
from django.conf import settings
from groq import Groq
import json

load_dotenv()

GROQ_API_KEY = settings.GROQ_API_KEY
NEWS_API_KEY = settings.NEWS_API_KEY
NEWS_ENDPOINT = "https://newsapi.org/v2/everything"
SYMBOL = "XAUUSD"
query = "(Gold Price OR XAUUSD OR Bullion OR Federal Reserve) AND NOT (Jewelry OR Gold Mine)"
client = Groq(api_key=GROQ_API_KEY)

def getNewsArticles():
    # GETS THE NEWS ARTICLES
    news_parameters = {
        "q":query,
        "sortBy": "relevancy",  # Ensures we get market analysis first
        "language": "en",
        "apikey":NEWS_API_KEY
    }
    try:
        news_response = get(NEWS_ENDPOINT,news_parameters)
        news_response.raise_for_status()
    except exceptions.HTTPError as errh:
        print("HTTP Error")
        print(errh.args[0])
        return None

    news_response_json =  news_response.json()
    articles = news_response.json().get("articles", [])
    # article1 = news_response_json["articles"][0]
    # article2 = news_response_json["articles"][1]
    # article3 = news_response_json["articles"][2]
    return [
        {
            "title": a.get("title"),
            "desc": a.get("description", ""),
            "source": a.get("source", {}).get("name"),
            "url": a.get("url")
        } for a in articles
        ]

def ask_news_oracle(news_headlines):
    # news_headlines is a list of strings or dicts from your API
    
    # 1. Aggregate the headlines into a single context string
    formatted_news = "\n".join([f"- {news}" for news in news_headlines[:10]]) # Top 10 latest
    
    market_context = f"""
    ASSET: {SYMBOL}
    LATEST NEWS HEADLINES:
    {formatted_news}
    """

    # 2. Update the System Prompt for Sentiment & Impact
    system_prompt = """
        You are a Macro-Economic Sentiment Analyst AI for Gold (XAUUSD). 
        Analyze the provided headlines to determine the current 'Market Bias'.

        SCORING LOGIC:
        - BULLISH (Score 0.5 - 1.0): Fed rate cuts, high inflation, geopolitical instability, or USD weakness.
        - BEARISH (Score 0.5 - 1.0): Fed rate hikes, lower-than-expected inflation, USD strength.
        - NEUTRAL (Score 0.0): Conflicting headlines or no high-impact data.

        OUTPUT RULES:
        - Return ONLY valid JSON.
        - 'sentiment_score' is a positive float (0.0 to 1.0) representing the strength of the news.
        - 'bias' must be "BULLISH", "BEARISH", or "NEUTRAL".

        {
            "module": "SENTIMENT",
            "bias": "string",
            "sentiment_score": float,
            "impact_duration": "SHORT-TERM" or "LONG-TERM",
            "key_catalyst": "The single most important news headline",
            "reasoning": "Briefly connect the news to gold price direction",
            "Top News":"These are the Three News titles from the data which I have given you which have the most impact on the market and on your decision"
        }
        """

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant", # Using the fast model
            # model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": market_context}
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        print(f"AI Error: {e}")
        return None

def getAnalysisofNews():
    articles = getNewsArticles()
    if articles != None:
        airesponse = ask_news_oracle(articles)
        if airesponse != None:
            print(airesponse)
            return airesponse
        else:
            return None
    else:
            return None
