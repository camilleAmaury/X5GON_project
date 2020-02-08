from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator
import json

api = Namespace('difficulty', description='Research document')

doc = api.model('Document', {
    'id': fields.String(required=True, description='The document identifier'),
})

parser = api.parser()
parser.add_argument('username', type=str)
parser.add_argument('pwd', type=str)
parser.add_argument('docId', type=str)
parser.add_argument('mark', type=str)

@api.route('/difficulty', methods = ['POST'])
class Difficulty(Resource):
    #@api.marshal_list_with(doc)
    @api.doc(parser=parser)
    def post(self):
        args = parser.parse_args()
        server_URL = "http://localhost:3030/x5gon/"
        sparql = SPARQLWrapper(server_URL)

        def execQuery(sparql, query):
            sparql.setQuery(query)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()
            return results
            
        def login(username, password):
            res = execQuery(sparql, "PREFIX x5gonbjk: <http://x5gon/bjk/> SELECT ?username ?pwd WHERE {?user x5gonbjk:password '"+password+"'; x5gonbjk:username ?username. filter (?username = '"+username+"')}")['results']['bindings']
            return(len(res) >= 1)

        def difficulty():
            print(args)
            if(login(args['username'], args['pwd'])):
                queryInsert = "PREFIX x5gonbjk: <http://x5gon/bjk/> INSERT DATA{<http://x5gon/bjk/user/"+args['username']+"> x5gonbjk:difficultyValue <http://x5gon/bjk/int/"+args['mark']+">. <http://x5gon/bjk/int/"+args['mark']+"> x5gonbjk:difficultyDoc ?doc. ?doc dcterms:identifier "+args['docId']+".}"
                execQuery(sparql, queryInsert)
                return True
            else:
                return False
                
        return difficulty()