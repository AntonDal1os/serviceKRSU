from flask import Flask
from flask_cors import CORS

from app.database import init_app as init_db_app


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    init_db_app(app)
    CORS(app)

    from app.routes.forms import forms_bp

    app.register_blueprint(forms_bp, url_prefix="/api/v1")

    return app
