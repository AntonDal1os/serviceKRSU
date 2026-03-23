from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    db.init_app(app)
    CORS(app)  # Разрешает запросы с React (другой порт)

    from app.routes.forms import forms_bp
    app.register_blueprint(forms_bp, url_prefix="/api/v1")

    return app