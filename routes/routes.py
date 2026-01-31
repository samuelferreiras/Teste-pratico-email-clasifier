import os

from flask                 import render_template, request, jsonify
from services.classifier   import EmailClassifier
from services.file_handler import FileHandler
from services.prompts      import EMAIL_CLASSIFICATION_PROMPT

classifier = EmailClassifier(groq_api_key=os.environ.get("GROQ_API_KEY"))

file_handler = FileHandler(
    allowed_extensions={"txt", "pdf"},
    upload_folder_path="uploads",
)

def get_email_text_from_request(req) -> str | None:
    uploaded_file = req.files.get("file")
    text_input = req.form.get("text")

    if uploaded_file and uploaded_file.filename:
        if not file_handler.is_extension_allowed(uploaded_file.filename):
            raise ValueError("Formato não permitido. Use .txt ou .pdf")
        return file_handler.process_uploaded_file(uploaded_file)

    if text_input and text_input.strip():
        return text_input

    return None

def register_routes(app):
    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/classify", methods=["POST"])
    def classify():
        try:
            email_text = get_email_text_from_request(request)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

        if not email_text:
            return jsonify({"error": "Nenhum email fornecido"}), 400

        try:
            result = classifier.classify(email_text)
            return jsonify(result)
        except Exception as e:
            logging.error(f"Erro interno ao classificar email: {e}")
            return jsonify({"error": "Erro interno ao classificar email"}), 500

    @app.route("/health")
    def health():
        return jsonify({"status": "ok"})
