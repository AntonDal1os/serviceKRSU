import psycopg2
from flask import current_app, g


def get_db():
    connection = g.get("db_connection")

    if connection is None or connection.closed:
        database_url = current_app.config.get("DATABASE_URL")
        if not database_url:
            raise RuntimeError("DATABASE_URL is not configured")

        connection = psycopg2.connect(database_url)
        g.db_connection = connection

    return connection


def close_db(_error=None):
    connection = g.pop("db_connection", None)
    if connection is not None and not connection.closed:
        connection.close()


def init_db():
    database_url = current_app.config.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not configured")

    connection = psycopg2.connect(database_url)
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    CREATE TABLE IF NOT EXISTS enrollments (
                        id SERIAL PRIMARY KEY,
                        university_id VARCHAR(100) NOT NULL,
                        course_id VARCHAR(100) NOT NULL,
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    )
                    """
                )
                cursor.execute(
                    """
                    CREATE TABLE IF NOT EXISTS enrolled_students (
                        id SERIAL PRIMARY KEY,
                        enrollment_id INTEGER NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
                        full_name VARCHAR(200) NOT NULL,
                        email VARCHAR(200) NOT NULL
                    )
                    """
                )
                cursor.execute(
                    """
                    CREATE TABLE IF NOT EXISTS prof_dev_applications (
                        id SERIAL PRIMARY KEY,
                        course_id VARCHAR(100) NOT NULL,
                        full_name VARCHAR(200) NOT NULL,
                        email VARCHAR(200) NOT NULL,
                        phone VARCHAR(50),
                        statement_file_path VARCHAR(500),
                        consent_file_path VARCHAR(500),
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    )
                    """
                )
    finally:
        connection.close()


def init_app(app):
    app.teardown_appcontext(close_db)
