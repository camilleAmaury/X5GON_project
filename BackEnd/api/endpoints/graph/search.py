from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator
import json

api = Namespace('search', description='Research document')

doc = api.model('Document', {
    'id': fields.String(required=True, description='The document identifier'),
})

@api.route('/<keywords>')
@api.param('keywords', 'All keywords')
@api.response(404, 'Documents not found')
class SearchDocument(Resource):
    @api.doc('list_id_doc')
    #@api.marshal_list_with(doc)
    def get(self, keywords):
        server_URL = "http://localhost:3030/x5gon/"
        sparqlDbPediaEndpoint = "http://dbpedia.org/sparql"


        def execQuery(sparql, query):
            sparql.setQuery(query)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()
            return results

        # function which create

        
        
        def generate_ngrams(s, m):
            mi = min([len(word) for word in s.split()])
            ng = [x for x in range(m, max([mi, m])+1)]
            ngram = []
            for n in ng:
                for word in s.split():
                    ngram += [word[j:j+n] for j in range(0, len(word), n)]
            ngramRet = []
            ngramRet = ngramRet+ngram
            return [x for x in ngramRet if len(x) >= mi]
            
        def getPertinentDocument(keywords, m, offset):
            sparql = SPARQLWrapper(server_URL)
            ngrams = generate_ngrams(keywords, 4)
            ngramsRet = []
            ngramsRet += keywords.lower().split()
            ids = {}
            title = {}
            keys = {}
            format = {}
            union = "("
            ngramsList = list(set(ngramsRet+ngrams))
            for gram in ngramsList:
                union += gram+"|"
            union = union[:-1]+")"

            queryExact = "PREFIX dcterms: <http://purl.org/dc/terms/> SELECT DISTINCT ?id ?title ?format (group_concat(?key;separator=',') AS ?keys) WHERE{ ?doc dcterms:identifier ?id; dcterms:subject ?key. { SELECT DISTINCT ?id ?title ?format WHERE { {?doc dcterms:title ?title; dcterms:identifier ?id; dcterms:format ?format. filter regex(?title, '"+union+"', 'i') filter regex(?format, '(docx|html|ods|odt|pdf|txt)', 'i') } } GROUP BY ?title ?id ?format "+("\nLIMIT "+str(m)+" OFFSET "+str(int(offset)*m) if m != -1 else "")+" } } GROUP BY ?title ?id ?format"
            query = "PREFIX dcterms: <http://purl.org/dc/terms/> \nSELECT DISTINCT ?id ?title ?format (group_concat(?key;separator=',') AS ?keys) (COUNT(?id) as ?score) \nWHERE {\n{?doc dcterms:subject ?key; \ndcterms:title ?title; \ndcterms:identifier ?id; \ndcterms:format ?format. \nfilter regex(?key, '"+union+"', 'i')\nfilter regex(?format, '(docx|html|ods|odt|pdf|txt)', 'i')}} \nGROUP BY ?title ?id ?format\nORDER BY DESC(?score)"+("\nLIMIT "+str(m)+" OFFSET "+str(int(offset)*m) if m != -1 else "")
            #print(queryExact)
            resExact = execQuery(sparql, queryExact)['results']['bindings']
            
            res = execQuery(sparql, query)['results']['bindings']
            
            #print(res)

            for i in range(len(resExact)):
                ids[resExact[i]['id']['value']] = sum([7/len(keywords.split())+3 if ngram in resExact[i]['title']['value'] else 0 for ngram in ngramsRet])
                title[resExact[i]['id']['value']] = resExact[i]['title']['value']
                keys[resExact[i]['id']['value']] = resExact[i]['keys']['value']
                format[resExact[i]['id']['value']] = resExact[i]['format']['value']
            for j in range(len(res)):
                identifier = res[j]['id']['value']
                if(identifier in ids):
                    ids[identifier] =  ids[identifier] + int(res[j]['score']['value'])
                else:
                    ids[identifier] = int(res[j]['score']['value'])
                    
                title[identifier] = res[j]['title']['value']
                keys[identifier] = res[j]['keys']['value']
                format[identifier] = res[j]['format']['value']
            resR = [x for x in sorted(ids.items(), key=operator.itemgetter(1),reverse=True)]
            
            for i in range(len(resR)):
                #print(resR[i])
                resR[i] = [resR[i][0], title[resR[i][0]], keys[resR[i][0]], format[resR[i][0]]]
            
            return(json.dumps(list(resR[:m])))
                
        return getPertinentDocument(keywords, 100, 0)
