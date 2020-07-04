from models.companies import Company
from models.users import User
import uuid


def join_bridge(first_name: str, last_name: str, work_email: str, organisation: str, description: str,
                product: str) -> Company:
    company = Company()
    company.first_name = first_name
    company.last_name = last_name
    company.work_email = work_email
    company.organisation = organisation
    company.description = description
    company.product = product

    company.save()

    return company


def create_user_account(username: str, password: str) -> User:
    user = User()
    user.id = str(uuid.uuid4())
    user.username = username
    user.password = password

    user.save()

    return user


def find_company_by_name(work_email: str, organisation: str) -> Company:
    company = Company.objects().filter(work_email=work_email, organisation=organisation).first()
    return company


def find_user_by_name(username: str) -> User:
    user = User.objects().filter(username=username).first()
    return user


def find_user_by_id(_id: str) -> User:
    user = User.objects().filter(_id=_id).first()
    return user
