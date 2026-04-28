from dataclasses import dataclass

from app.database import get_db


@dataclass(slots=True)
class EnrollmentStudent:
    full_name: str
    email: str


def create_enrollment(university_id: str, course_id: str, students: list[EnrollmentStudent]) -> int:
    connection = get_db()

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
                [(enrollment_id, student.full_name, student.email) for student in students],
            )

    return enrollment_id


def create_prof_dev_application(
    course_id: str,
    full_name: str,
    email: str,
    phone: str | None,
    statement_file_path: str | None,
    consent_file_path: str | None,
) -> int:
    connection = get_db()

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

    return application_id
