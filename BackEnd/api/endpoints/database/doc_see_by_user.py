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

api = Namespace('doc_see_by_user', description='The document see by user')

doc = api.model('Document', {
    'id': fields.String(required=True, description='The document identifier'),
})

@api.route('/<idDoc>')
@api.param('idDoc', 'Document identifier')
@api.response(404, 'Documents not found')
class doc_see_by_user(Resource):
    @api.doc('list_id_doc')
    #@api.marshal_list_with(doc)
    def get(self, idDoc):
    
        server_URL = "http://localhost:3030/x5gon/"
        sparqlDbPediaEndpoint = "http://dbpedia.org/sparql"
        sparql = SPARQLWrapper(server_URL)

        def execQuery(sparql, query):
            sparql.setQuery(query)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()
            return results     
        
        engine2 = create_engine('mysql://torilen:kiogre97@localhost:3306/x5gon')
        connection2 = engine2.connect()
        resoverall = connection2.execute("SELECT * FROM trace_navigation_users")
        df = pd.DataFrame(resoverall.fetchall())
        df.columns = resoverall.keys()
        id = numpy.int64(int(idDoc))
        d = df[df['graph_ref'] == id]
        di = dict()
        for index, row in d.iterrows():
          if(index+1 < len(df)):
              elem = df.loc[index+1].graph_ref
              if(elem != id):
                if(elem in list(di.keys())):
                  di[elem] = di[elem]+1
                else:
                  di[elem] = 1
              
              
        di_sorted = sorted(di.items(), key=lambda x: x[1], reverse=True)
        l = [int(x[0]) for x in di_sorted[0:len(di_sorted)]]
        ret = {}
        m = 0
        for id in l:
            if(m >= 3):
                return json.dumps(ret)
            query = "PREFIX dcterms: <http://purl.org/dc/terms/> SELECT ?id ?title WHERE {?doc dcterms:identifier "+str(id)+"; dcterms:title ?title.}"
            
            res = execQuery(sparql, query)['results']['bindings']
            if(len(res) > 0):
                ret[id] = res[0]['title']['value']
                m += 1
        
        return ret
