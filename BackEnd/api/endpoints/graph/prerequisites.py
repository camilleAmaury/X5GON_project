from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator
import pandas as pd
import math
import numpy as np
import requests
import json


api = Namespace('prerequisites', description='All prerequisites')

doc = api.model('Document', {
    'id': fields.String(required=True, description='The document identifier'),
})

@api.route('/<id>')
@api.param('id', 'Document identifier')
@api.response(404, 'Documents not found')
class SearchDocument(Resource):
    @api.doc('list_id_doc')
    #@api.marshal_list_with(doc)
    def get(self, id):
        server_URL = "http://localhost:3030/x5gon/"
        sparqlDbPediaEndpoint = "http://dbpedia.org/sparql"
        sparql = SPARQLWrapper(server_URL)

        def execQuery(sparql, query):
            sparql.setQuery(query)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()
            return results        
        
        allIds = list()
        string_constructor = "PREFIX dcterms: <http://purl.org/dc/terms/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX dbr: <http://dbpedia.org/resource/>\nPREFIX dbo: <http://dbpedia.org/ontology/>\n\nSELECT ?id WHERE {\n  ?doc dcterms:identifier ?id.\n}"
        sparql.setQuery(string_constructor)
        sparql.setReturnFormat(JSON)

        results = sparql.query().convert()
        
        def getAbstract(uri):
            string_constructor = "PREFIX dcterms: <http://purl.org/dc/terms/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX dbr: <http://dbpedia.org/resource/>\nPREFIX dbo: <http://dbpedia.org/ontology/>\n\nSELECT ?abs WHERE {\nSERVICE <http://dbpedia.org/sparql> {\n<"+uri+"> dbo:abstract ?abs.\n}\nFILTER LANGMATCHES(LANG(?abs), 'EN')\n}"
            sparql.setQuery(string_constructor)
            sparql.setReturnFormat(JSON)

            results = sparql.query().convert()
            res = ""
            if(len(results['results']['bindings'])>0):
                res = results['results']['bindings'][0]['abs']['value']
            return res
            
 
                        
        PLATFORM_URL = "https://platform.x5gon.org/api/v1"

        concept_init = list()

        def checkKnowledgeBeforeRead(id, memorize):
            concept_init = list()
            string_constructor_enrich = "PREFIX dcterms: <http://purl.org/dc/terms/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX dbr: <http://dbpedia.org/resource/>\nPREFIX dbo: <http://dbpedia.org/ontology/>\n\nSELECT ?con ?title WHERE {\n  ?doc dcterms:identifier "+str(id)+";\n  dcterms:concept ?con;\n  dcterms:title ?title.\n}"

            sparql.setQuery(string_constructor_enrich)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()
            res = results['results']['bindings']
            for j in range(len(res)):
                concept_init.append(results['results']['bindings'][j]['con']['value'])

              #print(concept_init)

              # initialise the endpoint
            get_specific_materials_endpoint = "/oer_materials/{}/contents/"

              # get the material id of the first material returned from previous example
            test_material_id = id

              # query for meta-information about this material, Note that there are no 
              # parameters for this endpoint
            response = requests.get(PLATFORM_URL + get_specific_materials_endpoint.format(test_material_id))

              # convert the json response to a Python dictionary object for further processing
            r_json = response.json()
              #print(r_json["oer_contents"][0]["value"]["value"])

              #concept_abstract = [getAbstract(concept) for concept in concept_init] #very greedy !! TO REPLACE BY A BIG REQUEST
            print("If you want to read \""+results['results']['bindings'][j]['title']['value']+"\" be sure to understand these concepts :")
            res = requests.get("http://api.dbpedia-spotlight.org/en/annotate?text="+r_json["oer_contents"][0]["value"]["value"][:2000]+"&confidence=0.5&support=50", headers = {'Accept': 'application/json'}).json()
            resFormat = {}
            for r in res['Resources']:
                if(r['@URI'] in list(resFormat.keys())):
                    resFormat[r['@URI']] = max(r['@similarityScore'], resFormat[r['@URI']])
                else:
                    resFormat[r['@URI']] = r['@similarityScore']
            l = list()              
            if(len(resFormat) >= 8):
                l = list(dict(sorted(resFormat.items(), key=operator.itemgetter(1),reverse=True)))[:8]
            else:
                l = list(dict(sorted(resFormat.items(), key=operator.itemgetter(1),reverse=True)))+concept_init[:8-len(resFormat)]
                
            resRet = []
            for el in l:
                resRet.append([el.split('/')[len(el.split('/'))-1].replace('_', ' '), el.replace('http://dbpedia.org/resource/', 'https://en.wikipedia.org/wiki/')])
            return resRet

        return checkKnowledgeBeforeRead(id, False)
