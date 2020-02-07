def build_scholar_question_schema(scholar_question):
    mod = {}
    mod['question_id'] = scholar_question.question_id
    mod['question'] = scholar_question.question
    mod['answer'] = scholar_question.answer
    return mod
