import nltk
from nltk.corpus import stopwords
from transformers import BertTokenizer, BertForQuestionAnswering
import en_core_web_sm
from .fastTextVectors import vectors

stop_words = None
question_answering_tokenizer = None
question_answering_model = None
nlp = None
vec = None

if __name__ == "__main__":

    stop_words = set(stopwords.words('english'))
    question_answering_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    question_answering_model = BertForQuestionAnswering.from_pretrained('bert-large-uncased-whole-word-masking-finetuned-squad')
    nlp = en_core_web_sm.load()
    vec = vectors
