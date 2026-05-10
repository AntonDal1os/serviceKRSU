import os
from pathlib import Path

import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename


BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", "").strip()
UPLOAD_FOLDER = BASE_DIR / "uploads"
ALLOWED_EXTENSIONS = {"doc", "docx", "pdf"}

app = Flask(__name__)
CORS(app)


def get_db_connection():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL is not configured")

    return psycopg2.connect(DATABASE_URL)


def init_db():
    connection = get_db_connection()
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


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def create_enrollment(university_id, course_id, students):
    connection = get_db_connection()

    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO enrollments (university_id, course_id)
                    VALUES (%s, %s)
                    RETURNING id
                    """,
                    (university_id, course_id),
                )
                enrollment_id = cursor.fetchone()[0]

                cursor.executemany(
                    """
                    INSERT INTO enrolled_students (enrollment_id, full_name, email)
                    VALUES (%s, %s, %s)
                    """,
                    [
                        (
                            enrollment_id,
                            student.get("fullName", ""),
                            student.get("email", ""),
                        )
                        for student in students
                    ],
                )
    finally:
        connection.close()

    return enrollment_id


def create_prof_dev_application(
    course_id,
    full_name,
    email,
    phone,
    statement_file_path,
    consent_file_path,
):
    connection = get_db_connection()

    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO prof_dev_applications (
                        course_id,
                        full_name,
                        email,
                        phone,
                        statement_file_path,
                        consent_file_path
                    )
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    (
                        course_id,
                        full_name,
                        email,
                        phone,
                        statement_file_path,
                        consent_file_path,
                    ),
                )
                application_id = cursor.fetchone()[0]
    finally:
        connection.close()

    return application_id


@app.route("/api/v1/enrollment", methods=["POST"])
def enrollment():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    if not data.get("courseId") or not data.get("universityId"):
        return jsonify({"error": "courseId and universityId are required"}), 422

    students = data.get("students", [])
    if not students:
        return jsonify({"error": "At least one student is required"}), 422

    enrollment_id = create_enrollment(
        university_id=data["universityId"],
        course_id=data["courseId"],
        students=students,
    )

    return jsonify(
        {
            "message": "Enrollment submitted",
            "enrollment_id": enrollment_id,
            "students_count": len(students),
        }
    ), 201


@app.route("/api/v1/prof-dev", methods=["POST"])
def prof_dev():
    course_id = request.form.get("courseId")
    full_name = request.form.get("fullName")
    email = request.form.get("email")
    phone = request.form.get("phone")

    if not course_id or not full_name or not email:
        return jsonify({"error": "courseId, fullName and email are required"}), 422

    UPLOAD_FOLDER.mkdir(exist_ok=True)

    def save_file(field_name):
        file = request.files.get(field_name)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            path = UPLOAD_FOLDER / filename
            file.save(path)
            return str(path)
        return None

    statement_path = save_file("statementFile")
    consent_path = save_file("consentFile")

    application_id = create_prof_dev_application(
        course_id=course_id,
        full_name=full_name,
        email=email,
        phone=phone,
        statement_file_path=statement_path,
        consent_file_path=consent_path,
    )

    return jsonify(
        {
            "message": "Application submitted",
            "application_id": application_id,
        }
    ), 201


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
