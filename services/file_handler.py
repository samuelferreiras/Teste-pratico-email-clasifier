import os
import PyPDF2
from werkzeug.utils import secure_filename

class FileHandler:
    def __init__(self, allowed_extensions, upload_folder_path):
        self.allowed_extensions = allowed_extensions
        self.upload_folder_path = upload_folder_path
        os.makedirs(upload_folder_path, exist_ok=True)

    def is_extension_allowed(self, file_name):
        return '.' in file_name and \
               file_name.rsplit('.', 1)[1].lower() in self.allowed_extensions

    def extract_text_from_pdf_file(self, file_path):
        text = ""
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
        return text

    def extract_text_from_text_file(self, file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    def process_uploaded_file(self, uploaded_file):
        file_name = secure_filename(uploaded_file.filename)
        file_path = os.path.join(self.upload_folder_path, file_name)
        uploaded_file.save(file_path)
        try:
            if file_name.endswith(".pdf"):
                text = self.extract_text_from_pdf_file(file_path)
            else:
                text = self.extract_text_from_text_file(file_path)
        finally:
            os.remove(file_path)
        return text
