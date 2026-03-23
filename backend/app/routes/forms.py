import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app import db
from app.models import Enrollment, EnrolledStudent, ProfDevApplication

forms_bp = Blueprint("forms", __name__)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"doc", "docx", "pdf"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# ─────────────────────────────────────────
# POST /api/v1/enrollment
# Форма 1: Запись студентов на курс
# ─────────────────────────────────────────
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

    new_enrollment = Enrollment(
        university_id=data["universityId"],
        course_id=data["courseId"]
    )
    db.session.add(new_enrollment)
    db.session.flush()

    for s in students_data:
        student = EnrolledStudent(
            enrollment_id=new_enrollment.id,
            full_name=s.get("fullName", ""),
            email=s.get("email", "")
        )
        db.session.add(student)

    db.session.commit()

    return jsonify({
        "message": "Enrollment submitted",
        "enrollment_id": new_enrollment.id,
        "students_count": len(students_data)
    }), 201


# ─────────────────────────────────────────
# POST /api/v1/prof-dev
# Форма 2: Заявка на повышение квалификации
# ─────────────────────────────────────────
@forms_bp.route("/prof-dev", methods=["POST"])
def prof_dev():
    course_id = request.form.get("courseId")
    full_name = request.form.get("fullName")
    email     = request.form.get("email")
    phone     = request.form.get("phone")

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
    consent_path   = save_file("consentFile")

    application = ProfDevApplication(
        course_id=course_id,
        full_name=full_name,
        email=email,
        phone=phone,
        statement_file_path=statement_path,
        consent_file_path=consent_path
    )
    db.session.add(application)
    db.session.commit()

    return jsonify({
        "message": "Application submitted",
        "application_id": application.id
    }), 201