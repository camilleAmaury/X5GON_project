from werkzeug.security import generate_password_hash, check_password_hash

from api.database import db

#Many to many link
user_opened_documents = db.Table('user_opened_documents',
    db.Column('user_id', db.Integer, db.ForeignKey('users.user_id')),
    db.Column('document_id', db.Integer, db.ForeignKey('documents.document_id'))
)

user_validated_documents = db.Table('user_validated_documents',
    db.Column('user_id', db.Integer, db.ForeignKey('users.user_id')),
    db.Column('document_id', db.Integer, db.ForeignKey('documents.document_id'))
)

user_badges = db.Table('user_badges',
    db.Column('user_id', db.Integer, db.ForeignKey('users.user_id')),
    db.Column('badge_id', db.Integer, db.ForeignKey('badges.badge_id'))
)

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False, index=True)
    pwd = db.Column(db.String(500))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(30))
    year = db.Column(db.Integer())
    opened_documents = db.relationship("Document", secondary=user_opened_documents)
    validated_documents = db.relationship("Document", secondary=user_validated_documents)
    scholar_questions = db.relationship('ScholarQuestion', backref='users', lazy=True)
    user_searches = db.relationship('UserSearch', backref='users', lazy=True)
    document_evaluations = db.relationship('Evaluation', backref='users', lazy=True)
    badges = db.relationship("Badge", secondary=user_badges)
    level_number = db.Column(db.Integer, db.ForeignKey('levels.level_number'))
    level = db.relationship("Level", back_populates="users")
    experience = db.Column(db.Integer)
    user_skills = db.relationship('User_skill', backref='users', lazy=True)

    def __init__(self, username, pwd, email, year):
        self.username = username
        self.pwd = generate_password_hash(pwd)
        self.email = email
        self.year = year

    def __repr__(self):
        return '<User {}>'.format(self.user_id)

    def get_user_id(self):
        return self.user_id

    def set_password(self, pwd):
        self.pwd = generate_password_hash(pwd)

    def check_password(self, pwd):
        return check_password_hash(self.pwd, pwd)

    def add_opened_document(self, opened_document):
        self.opened_documents.append(opened_document)

    def get_opened_documents(self):
        return self.opened_documents

    def remove_opened_document(self, opened_document):
        self.opened_documents.remove(opened_document)

    def get_validated_documents(self):
        return self.validated_documents

    def add_validated_document(self, validated_document):
        self.validated_documents.append(validated_document)

    def remove_validated_document(self, validated_document):
        self.validated_documents.remove(validated_document)

    def add_scholar_question(self, scholar_question):
        self.scholar_questions.append(scholar_question)

    def get_scholar_questions(self):
        return self.scholar_questions

    def remove_scholar_question(self, scholar_question):
        self.scholar_questions.remove(scholar_question)

    def get_user_searches(self):
        return self.user_searches

    def add_user_search(self, user_search):
        self.user_searches.append(user_search)

    def remove_user_search(self, user_search):
        self.user_searches.remove(user_search)

    def add_document_evaluation(self, document_evaluation):
        self.document_evaluations.append(document_evaluation)

    def get_document_evaluations(self):
        return self.document_evaluations

    def remove_document_evaluation(self, document_evaluation):
        self.document_evaluations.remove(document_evaluation)

    def add_badge(self, badge):
        self.badges.append(badge)

    def get_badges(self):
        return self.badges

    def remove_badge(self, badge):
        self.badges.remove(badge)

    def add_experience(self, experience):
        self.experience += experience
        while self.experience >= self.level.next_stage :
            new_level = Level.query.get(self.level.level_number+1)
            if not new_level :
                break;
            self.experience -= self.level.next_stage
            self.level = new_level

    def remove_experience(self, experience):
        self.experience -= experience
        while self.experience < 0 :
            previous_level = Level.query.get(self.level.level_number-1)
            if not previous_level :
                self.experience = 0
                break;
            self.experience += previous_level.next_stage
            self.level = previous_level

    def get_level(self):
        return self.level

    def set_level(self, level):
        self.level = level
        self.experience = 0

    def get_user_skills(self):
        return self.user_skills

    def remove_user_skills(self, skill):
        self.user_skills.remove(skill)

class Document(db.Model):
    __tablename__ = 'documents'

    document_id = db.Column(db.Integer, primary_key=True)
    graph_ref = db.Column(db.String(100), unique=True, nullable=False, index=True)
    document_title = db.Column(db.String(100))
    user_evaluations = db.relationship('Evaluation', backref='documents', lazy=True)

    def __init__(self, graph_ref):
        self.graph_ref = graph_ref

    def add_user_evaluation(self, user_evaluation):
        self.user_evaluations.append(user_evaluation)

    def get_user_evaluations(self):
        return self.user_evaluations

    def remove_user_evaluation(self, user_evaluation):
        self.user_evaluations.remove(user_evaluation)

class ScholarQuestion(db.Model):
    __tablename__ = 'scholar_questions'

    question_id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1000), nullable=False)
    answer = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

class UserSearch(db.Model):
    __tablename__ = 'user_search'

    search_id = db.Column(db.Integer, primary_key=True)
    search_subject = db.Column(db.String(300), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

class Evaluation(db.Model):
    __tablename__ = 'evaluations'

    evaluation_id = db.Column(db.Integer, primary_key=True)
    comprehension_rating = db.Column(db.Integer)
    quality_rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    document_ref = db.Column(db.Integer, db.ForeignKey('documents.graph_ref'))

class Badge(db.Model):
    __tablename__ = 'badges'

    badge_id = db.Column(db.Integer, primary_key=True)
    badge_name = db.Column(db.String(100))
    description = db.Column(db.String(300))

class Level(db.Model):
    __tablename__ = 'levels'

    level_number = db.Column(db.Integer, primary_key=True)
    next_stage = db.Column(db.Integer)
    users = db.relationship("User", back_populates="level")

class Skill(db.Model):
    __tablename__ = 'skills'

    skill_id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(100), unique=True, nullable=False, index=True)

class User_skill(db.Model):
    __tablename__ = 'user_skills'

    user_skill_id = db.Column(db.Integer, primary_key=True)
    skill_level = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    skill_name = db.Column(db.String(100), db.ForeignKey('skills.skill_name'))

    def get_skill_level(self):
        return self.skill_level

    def increase_level(self, nb_level):
        self.skill_level += nb_level

    def decrease_level(self, nb_level):
        self.skill_level -= nb_level
