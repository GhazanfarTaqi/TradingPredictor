from .TradingNews import getAnalysisofNews
from .TradingChart import getPrediction

def getFinalDecision():
    """
    Combines technical + sentiment predictions into one optimal trading decision.
    Returns unified FUSION JSON.
    """

    tech = getPrediction()
    sent = getAnalysisofNews()

    # -------------------------
    # 1. Normalize to numeric
    # -------------------------
    decision_map = {"BUY": 1, "WAIT": 0, "SELL": -1}
    bias_map = {"BULLISH": 1, "NEUTRAL": 0, "BEARISH": -1}

    tech_score = decision_map.get(tech["decision"], 0) * (float(tech["confidence"].replace("%", "")) / 100)
    sent_score = bias_map.get(sent["bias"], 0) * abs(float(sent["sentiment_score"]))

    # -------------------------
    # 2. Dynamic weights
    # -------------------------
    tech_weight = 0.7
    sent_weight = 0.3

    # If news has long-term impact → increase sentiment weight
    if sent["impact_duration"] == "LONG-TERM":
        tech_weight = 0.6
        sent_weight = 0.4

    final_score = (tech_weight * tech_score) + (sent_weight * sent_score)

    # -------------------------
    # 3. Conflict protection
    # -------------------------
    conflict = tech_score * sent_score < 0 and abs(tech_score - sent_score) > 0.8

    if conflict:
        return {
            "module": "FUSION",
            "decision": "WAIT",
            "confidence": 30,
            "entry_price": None,
            "stop_loss": None,
            "take_profit": None,
            "reason": "Technical and sentiment signals strongly conflict — trade skipped for safety"
        }

    # -------------------------
    # 4. Final decision
    # -------------------------
    THRESHOLD = 0.4

    if final_score > THRESHOLD:
        decision = "BUY"
    elif final_score < -THRESHOLD:
        decision = "SELL"
    else:
        decision = "WAIT"

    # -------------------------
    # 5. Confidence calculation
    # -------------------------
    confidence = round(min(abs(final_score) * 100, 100), 2)

    # boost confidence if both agree
    if tech_score * sent_score > 0:
        confidence = min(confidence + 10, 100)

    # -------------------------
    # 6. Build reasoning
    # -------------------------
    techReason = (
        f"Technical={tech['decision']} ({tech_score:.2f}), "
        f"Sentiment={sent['bias']} ({sent_score:.2f}), "
        f"WeightedScore={final_score:.2f}"
    )
    AiReasoning = tech["reasoning"]
    combined_reasoning = f"{techReason} {AiReasoning}"
    
    # Safely extract the pattern (checking the different keys Groq might use)
    pattern_found = tech.get("pattern_identified", tech.get("pattern_detected", tech.get("pattern", "Unknown Pattern")))
    # -------------------------
    # 7. Return unified format
    # -------------------------
    return {
        "module": "FUSION",
        "decision": decision,
        "confidence": confidence,
        "entry_price": tech.get("entry_price"),
        "stop_loss": tech.get("stop_loss"),
        "take_profit": tech.get("take_profit"),
        "reasoning": combined_reasoning,  # <-- FIXED KEY
        "pattern": pattern_found
    }
