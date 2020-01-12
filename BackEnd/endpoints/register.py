from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator
import json

api = Namespace('register', description='Research document')

doc = api.model('Document', {
    'id': fields.String(required=True, description='The document identifier'),
})

parser = api.parser()
parser.add_argument('username', type=str)
parser.add_argument('email', type=str)
parser.add_argument('pwd', type=str)
parser.add_argument('name', type=str)
parser.add_argument('year', type=str)

@api.route('/register', methods = ['POST'])
class Register(Resource):
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
            
        def checkIfUserExist(username):
            res = execQuery(sparql, "PREFIX x5gonbjk: <http://x5gon/bjk/> SELECT ?username WHERE {?user x5gonbjk:username '"+username+"'.}")['results']['bindings']
            return(len(res) >= 1)

        def register():
            print(args)
            if(not checkIfUserExist(args['username'])):
                if(args['username'] != None and args['pwd'] != None and args['name'] != None and args['year'] != None and args['email'] != None):
                    queryInsert = "PREFIX x5gonbjk: <http://x5gon/bjk/> INSERT DATA{<http://x5gon/bjk/user/"+args['username']+"> x5gonbjk:password '"+args['pwd']+"'; x5gonbjk:email '"+args['email']+"'; x5gonbjk:username '"+args['username']+"'; x5gonbjk:name '"+args['name']+"'; x5gonbjk:yearBac '"+args['year']+"'.}"
                    execQuery(sparql, queryInsert)
                    print(queryInsert)
                    return 1
                else:
                    return -2
            else:
                return -1
                
        return register()
