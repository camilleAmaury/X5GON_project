from werkzeug.security import generate_password_hash, check_password_hash

from api.database import db

#Many to many link
user_knoledge = db.Table('user_knoledge',
    db.Column('user_id', db.Integer, db.ForeignKey('users.user_id')),
    db.Column('document_id', db.Integer, db.ForeignKey('documents.document_id'))
)

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False, index=True)
    password = db.Column(db.String())
    knolegdes = db.relationship("Document", secondary=user_knoledge)

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password)

    def __repr__(self):
        return '<User {}>'.format(self.user_id)

    def get_user_id(self):
        return self.user_id

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def add_knowledge(self, knowledge):
        self.knolegdes.append(knolegde)

    def get_knowledges(self):
        return self.knowledges

    def remove_knowledge(self, knowledge):
        self.knowledges.remove(knowledge)

class Document(db.Model):
    __tablename__ = 'documents'

    document_id = db.Column(db.Integer, primary_key=True)
