from flask_restplus import Namespace, fields

api = Namespace('shcolar_questions', description='Question shema')

scholar_question_schema = api.model('Question', {
    'question_id': fields.Integer(required=False, description='ID of the question', readonly=True),
    'question': fields.String(required=True, description='User question'),
    'answer': fields.String(required=True, description='Scholar answer'),
})
