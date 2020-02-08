from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator
import json

api = Namespace('login', description='Research document')

doc = api.model('Document', {
    'id': fields.String(required=True, description='The document identifier'),
})

@api.route('/<username>/<password>')
@api.param('username', 'User name')
@api.param('password', 'Password')
@api.response(404, 'Documents not found')
class Login(Resource):
    @api.doc('list_id_doc')
    #@api.marshal_list_with(doc)
    def get(self, username, password):
        server_URL = "http://localhost:3030/x5gon/"
        sparql = SPARQLWrapper(server_URL)


        def execQuery(sparql, query):
            sparql.setQuery(query)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()
            return results
             
        def login(username, password):
            res = execQuery(sparql, "PREFIX x5gonbjk: <http://x5gon/bjk/> SELECT ?username ?pwd WHERE {?user x5gonbjk:password '"+password+"'; x5gonbjk:username ?username. filter (?username = '"+username+"')}")['results']['bindings']
            print(res)
            return(len(res) >= 1)

        return login(username, password)
