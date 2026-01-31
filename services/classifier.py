import os
import json

from  groq    import Groq
from .prompts import EMAIL_CLASSIFICATION_PROMPT

class EmailClassifier:
    def __init__(self, groq_api_key=None, model="llama-3.3-70b-versatile"):
        self.client = Groq(api_key=groq_api_key or os.environ.get("GROQ_API_KEY"))
        self.model = model

    def classify(self, email_text: str) -> list[dict]:
        prompt = EMAIL_CLASSIFICATION_PROMPT.format(email=email_text)

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}]
            )

            content = response.choices[0].message.content.strip()

            data = json.loads(content)

            def is_valid(item):
                return (
                    isinstance(item, dict) and
                    "category" in item and
                    "confidence" in item and
                    "suggested_response" in item
                )

            if isinstance(data, dict) and is_valid(data):
                return [self.normalize(data)]

            if isinstance(data, list) and all(is_valid(item) for item in data):
                return [self.normalize(item) for item in data]

        except Exception as e:
            logging.error(f"Classifier error: {e}")

        return self.fallback_classify(email_text)

    def normalize(self, data: dict) -> dict:
        return {
            "category": data.get("category", "Produtivo"),
            "confidence": float(data.get("confidence", 0.7)),
            "suggested_response": data.get("suggested_response",  "Por favor, entre em contato com o suporte.")
        }

    def fallback_classify(self, email_texts: str) -> list[dict]:
        return [{
            "category": "Produtivo",
            "confidence": 0.7,
            "suggested_response": "Por favor, entre em contato com o suporte."
        }]
