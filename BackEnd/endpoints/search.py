from flask_restplus import Namespace, Resource, fields

from SPARQLWrapper import SPARQLWrapper, JSON
import re
import operator

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
            
        def getPertinentDocument(keywords, m):
            sparql = SPARQLWrapper(server_URL)
            ngrams = generate_ngrams(keywords, 4)
            ngramsRet = []
            ngramsRet += keywords.lower().split()
            ids = {}
            title = {}
            union = "("
            ngramsList = list(set(ngramsRet+ngrams))
            for gram in ngramsList:
                union += gram+"|"
            union = union[:-1]+")"

            queryExact = "PREFIX dcterms: <http://purl.org/dc/terms/> \nSELECT DISTINCT ?id ?title \nWHERE {\n{?doc dcterms:subject ?key; \ndcterms:title ?title; \ndcterms:identifier ?id. \nfilter regex(?title, '"+union+"', 'i')}}"+("\nLIMIT "+str(m) if m != -1 else "")
            query = "PREFIX dcterms: <http://purl.org/dc/terms/> \nSELECT DISTINCT ?id ?title (COUNT(?id) as ?score) \nWHERE {\n{?doc dcterms:subject ?key; \ndcterms:title ?title; \ndcterms:identifier ?id. \nfilter regex(?key, '"+union+"', 'i')}} \nGROUP BY ?title ?id\nORDER BY DESC(?score)"+("\nLIMIT "+str(m) if m != -1 else "")
            resExact = execQuery(sparql, queryExact)['results']['bindings']

            res = execQuery(sparql, query)['results']['bindings']
            
            print(res)

            for i in range(len(resExact)):
                ids[resExact[i]['id']['value']] = sum([7/len(keywords.split())+3 if ngram in resExact[i]['title']['value'] else 0 for ngram in ngramsRet])
                title[resExact[i]['id']['value']] = resExact[i]['title']['value']
            for j in range(len(res)):
                identifier = res[j]['id']['value']
                if(identifier in ids):
                    ids[identifier] =  ids[identifier] + int(res[j]['score']['value'])
                else:
                    ids[identifier] = int(res[j]['score']['value'])
                    
                title[identifier] = res[j]['title']['value']
            resR = [x for x in sorted(ids.items(), key=operator.itemgetter(1),reverse=True)]
            
            for i in range(len(resR)):
                print(resR[i])
                resR[i] = [resR[i][0], title[resR[i][0]]]
            
            return(list(resR[:m]))
                
        return getPertinentDocument(keywords, 100)
