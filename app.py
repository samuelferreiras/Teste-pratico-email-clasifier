import os

from flask         import Flask
from dotenv        import load_dotenv
from routes.routes import register_routes

load_dotenv()

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024
app.config["ALLOWED_EXTENSIONS"] = {"txt", "pdf"}

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

register_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
