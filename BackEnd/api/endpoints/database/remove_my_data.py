from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator
import pandas as pd
import math
import numpy as np
import requests
import json
from sqlalchemy import create_engine
import numpy 

api = Namespace('remove_my_data', description='The endpoint to allow a user to remove all of his data')


@api.route('/<idUser>')
@api.param('idUser', 'User identifier')
class remove_my_data(Resource):
    @api.doc('list_id_doc')
    #@api.marshal_list_with(doc)
    def delete(self, idUser):
        
        engine2 = create_engine('mysql://torilen:kiogre97@localhost:3306/x5gon')
        connection2 = engine2.connect()
        resoverall = connection2.execute("DELETE FROM evaluations WHERE user_id = "+str(idUser))
        resoverall = connection2.execute("DELETE FROM notifications_sms_hours WHERE user_id = "+str(idUser))
        resoverall = connection2.execute("DELETE FROM scholar_questions WHERE user_id = "+str(idUser))
        resoverall = connection2.execute("DELETE FROM trace_navigation_users WHERE user_id = "+str(idUser))
        resoverall = connection2.execute("DELETE FROM user_badges WHERE user_id = "+str(idUser))
        resoverall = connection2.execute("DELETE FROM user_opened_documents WHERE user_id = "+str(idUser))
        resoverall = connection2.execute("DELETE FROM user_search WHERE user_id = "+str(idUser))
        resoverall = connection2.execute("DELETE FROM user_validated_documents WHERE user_id = "+str(idUser))
        
