import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

SECRET_KEY = b'ss\x9a$M_\xfd\xee\xda\x12A\x88Z\xcf"$'
ADMIN_TOKEN = 'eyJhbGciOiJIUzUxMiIsImlhdCI6MTU3ODQ4NjQ3NiwiZXhwIjoxNTc4NTA0NDc2fQ.eyJ1c2VyX2lkIjoiYWRtaW4ifQ.tSFOdDHEDRcSKm5vHOOmdHryOpjfkqeO1ZYSR76fz_DUNHcjEMnkCCX0bdztLZqG9FcnjEnvuraCcZx3Epc4SQ'

# Database configaration
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO=False
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'flask_main.db')