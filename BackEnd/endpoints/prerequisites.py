from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator
import pandas as pd
import math
import numpy as np
import requests


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

        # function which create

        
        
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
            
        def recAddBeVertices(uriConcept, abstract, add, l):
            #print(uriConcept)
            #get rdf:type
            string_constructor = "PREFIX dcterms: <http://purl.org/dc/terms/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX dbr: <http://dbpedia.org/resource/>\nPREFIX dbo: <http://dbpedia.org/ontology/>\n\nSELECT ?type ?label WHERE {\nSERVICE <http://dbpedia.org/sparql> {\n <"+uriConcept+"> rdf:type ?type.\n<"+uriConcept+"> rdfs:label ?label.\n}\nFILTER LANGMATCHES(LANG(?label), 'EN')\n}"
            
            sparql.setQuery(string_constructor)
            sparql.setReturnFormat(JSON)


            results = sparql.query().convert()
            res = []
            #print(results['results']['bindings'])
            if(len(results['results']['bindings']) > 0):
                for j in range(len(results['results']['bindings'])):
                    res.append(results['results']['bindings'][j]['type']['value'])
                corpus = [getAbstract(concept) for concept in res] #very greedy !! TO REPLACE BY A BIG REQUEST
              #print(corpus)

              

                concept_to_know = [re.sub('[0-9]+', '', re.findall('[A-Za-z0-9]+$', concept)[0]) for concept in res]

                if(''.join(corpus) != ''):
                    if(sum([1 if text!='' else 0 for text in corpus]) > 1):
                        label = results['results']['bindings'][0]['label']['value']
                        tf = [abstract.count(label)/len(abstract.split()) for abstract in corpus]
                        c = sum([1 if label in abstract else 0 for abstract in corpus])
                        idf = 0
                        if c > 0:
                            idf = log(len(corpus))
                        tfidf = [t*idf for t in tf]
                        objet = concept_to_know[np.argmax(tfidf)]
                        if(objet != "Thing"):
                            if(add):
                                string_con = "PREFIX x5gonbjk: <http://x5gon/bjk/>\nINSERT DATA{\n <"+uriConcept+"> x5gonbjk:is "+objet+".\n}"
                                execQuery(sparql, string_con)
                            print("3- "+res[np.argmax(tfidf)])
                            l.append(res[np.argmax(tfidf)])
                            return(recAddBeVertices(res[np.argmax(tfidf)], corpus[np.argmax(tfidf)], add, l))
                            
                            #print("run query")
                    else:
                        tf = [abstract.count(concept)/len(abstract.split()) for concept in concept_to_know]
                        idf = 1
                        objet = concept_to_know[np.argmax(tf)]
                        if(objet != "Thing"):
                            if(add):
                                string_con = "PREFIX x5gonbjk: <http://x5gon/bjk/>\nINSERT DATA{\n <"+uriConcept+"> x5gonbjk:is \""+objet+"\".\n}"
                                execQuery(sparql, string_con)
                            print("1- "+res[np.argmax(tf)])
                            l.append(res[np.argmax(tf)])
                            print(l)
                            return(l)
                        #print("run query")
                        #print(string_con)
                else:
                    tf = [abstract.count(concept)/len(abstract.split()) for concept in concept_to_know]
                    idf = 1
                    objet = concept_to_know[np.argmax(tf)]
                    if(objet != "Thing"):
                        if(add):
                            string_con = "PREFIX x5gonbjk: <http://x5gon/bjk/>\nINSERT DATA{\n <"+uriConcept+"> x5gonbjk:is \""+objet+"\".\n}"
                            execQuery(sparql, string_con)
                        print("2- "+res[np.argmax(tf)])
                        l.append(res[np.argmax(tf)])
                        print(l)
                        return(l)
                        #print("run query")
                        #print(string_con)
                        
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

            concept_abstract = [getAbstract(concept) for concept in concept_init] #very greedy !! TO REPLACE BY A BIG REQUEST
            print("If you want to read \""+results['results']['bindings'][j]['title']['value']+"\" be sure to understand these concepts :")
            res = list()
            l = list()
            if(''.join(concept_abstract) != ''):
                for concept in concept_init:
                    res_rec = recAddBeVertices(concept, r_json["oer_contents"][0]["value"]["value"], memorize, l)
                    res = res + ([] if res_rec is None else res_rec)

            for concept in concept_init:
                res.append(concept)
                
            retour = {}
            con = []
            k = 0
            for c in res:
                if(c not in con):
                    concept = c.split('/')
                    retour[k] = [concept[len(concept)-1].replace("_", " "), c]
                    con.append(c)
                    k+=1
                
            return(retour)

        return checkKnowledgeBeforeRead(id, False)
