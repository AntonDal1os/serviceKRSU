import os

from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename

from app.models import EnrollmentStudent, create_enrollment, create_prof_dev_application


forms_bp = Blueprint("forms", __name__)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"doc", "docx", "pdf"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@forms_bp.route("/enrollment", methods=["POST"])
def enrollment():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    if not data.get("courseId") or not data.get("universityId"):
        return jsonify({"error": "courseId and universityId are required"}), 422

    students_data = data.get("students", [])
    if not students_data:
        return jsonify({"error": "At least one student is required"}), 422

    students = [
        EnrollmentStudent(
            full_name=student.get("fullName", ""),
            email=student.get("email", ""),
        )
        for student in students_data
    ]
    enrollment_id = create_enrollment(
        university_id=data["universityId"],
        course_id=data["courseId"],
        students=students,
    )

    return jsonify(
        {
            "message": "Enrollment submitted",
            "enrollment_id": enrollment_id,
            "students_count": len(students_data),
        }
    ), 201


@forms_bp.route("/prof-dev", methods=["POST"])
def prof_dev():
    course_id = request.form.get("courseId")
    full_name = request.form.get("fullName")
    email = request.form.get("email")
    phone = request.form.get("phone")

    if not course_id or not full_name or not email:
        return jsonify({"error": "courseId, fullName and email are required"}), 422

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    def save_file(field_name):
        file = request.files.get(field_name)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(path)
            return path
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
