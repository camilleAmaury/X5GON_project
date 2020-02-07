from werkzeug.security import generate_password_hash, check_password_hash

from api.database import db

#Many to many link
user_opened_documents = db.Table('user_opened_documents',
    db.Column('user_id', db.Integer, db.ForeignKey('users.user_id')),
    db.Column('graph_ref', db.Integer, db.ForeignKey('documents.graph_ref'))
)

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False, index=True)
    password = db.Column(db.String())
    opened_documents = db.relationship("Document", secondary=user_opened_documents)
    scholar_questions = db.relationship('ScholarQuestion', backref='users', lazy=True)
    document_evaluations = db.relationship('DocumentEvaluation', backref='users', lazy=True)

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

    def add_opened_document(self, opened_document):
        self.opened_documents.append(opened_document)

    def get_opened_documents(self):
        return self.opened_documents

    def remove_opened_document(self, opened_document):
        self.opened_documents.remove(opened_document)

    def add_scholar_question(self, scholar_question):
        self.scholar_questions.append(scholar_question)

    def get_scholar_questions(self):
        return self.scholar_questions

    def remove_scholar_question(self, scholar_question):
        self.scholar_questions.remove(scholar_question)

    def add_document_evaluation(self, document_evaluation):
        self.document_evaluations.append(document_evaluation)

    def get_document_evaluations(self):
        return self.document_evaluations

    def remove_document_evaluation(self, document_evaluation):
        self.document_evaluations.remove(document_evaluation)

class Document(db.Model):
    __tablename__ = 'documents'

    document_id = db.Column(db.Integer, primary_key=True)
    graph_ref = db.Column(db.String(), unique=True, nullable=False, index=True)
    user_evaluations = db.relationship('DocumentEvaluation', backref='documents', lazy=True)

    def add_user_evaluation(self, user_evaluation):
        self.user_evaluations.append(user_evaluation)

    def get_user_evaluations(self):
        return self.user_evaluations

    def remove_user_evaluation(self, user_evaluation):
        self.user_evaluations.remove(user_evaluation)

class ScholarQuestion(db.Model):
    __tablename__ = 'scholar_questions'

    question_id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(), nullable=False)
    answer = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

class DocumentEvaluation(db.Model):
    __tablename__ = 'document_evaluations'

    evaluation_id = db.Column(db.Integer, primary_key=True)
    comprehension_rating = db.Column(db.Integer)
    quality_rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    document_id = db.Column(db.Integer, db.ForeignKey('documents.document_id'))
