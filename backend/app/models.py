from app import db
from datetime import datetime


# Форма 1: Запись студентов на курс
class Enrollment(db.Model):
    __tablename__ = "enrollments"

    id            = db.Column(db.Integer, primary_key=True)
    university_id = db.Column(db.String(100), nullable=False)
    course_id     = db.Column(db.String(100), nullable=False)
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)

    students = db.relationship("EnrolledStudent", backref="enrollment", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "university_id": self.university_id,
            "course_id": self.course_id,
            "created_at": self.created_at.isoformat(),
            "students": [s.to_dict() for s in self.students]
        }


class EnrolledStudent(db.Model):
    __tablename__ = "enrolled_students"

    id            = db.Column(db.Integer, primary_key=True)
    enrollment_id = db.Column(db.Integer, db.ForeignKey("enrollments.id"), nullable=False)
    full_name     = db.Column(db.String(200), nullable=False)
    email         = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email
        }


class ProfDevApplication(db.Model):
    __tablename__ = "prof_dev_applications"

    id                  = db.Column(db.Integer, primary_key=True)
    course_id           = db.Column(db.String(100), nullable=False)
    full_name           = db.Column(db.String(200), nullable=False)
    email               = db.Column(db.String(200), nullable=False)
    phone               = db.Column(db.String(50))
    statement_file_path = db.Column(db.String(500))
    consent_file_path   = db.Column(db.String(500))
    created_at          = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "course_id": self.course_id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "created_at": self.created_at.isoformat()
        }