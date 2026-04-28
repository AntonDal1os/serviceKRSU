import os
from pathlib import Path
from dotenv import load_dotenv


_ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=_ENV_PATH)


class Config:
    _db_url = os.getenv("DATABASE_URL")
    if _db_url:
        _db_url = _db_url.strip()

    DATABASE_URL = _db_url
