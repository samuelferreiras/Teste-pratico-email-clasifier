import os

class Config:
    UPLOAD_FOLDER      = "uploads"
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    ALLOWED_EXTENSIONS = {"txt", "pdf"}
    PORT               = int(os.environ.get("PORT", 5000))
    DEBUG              = True
