from SPARQLWrapper import SPARQLWrapper, JSON

def build_skills_schema(skills_dictionary):
    arr = []
    for key, level in skills_dictionary.items():
        mod = {
            'skill_name' : key,
            'skill_level' : skills_dictionary.get(key)
        }
    return arr

def execQuery(sparql, query):
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    return results

def getKeywords(listIdDoc):
    server_URL = "http://localhost:3030/x5gon/"
    sparqlDbPediaEndpoint = "http://dbpedia.org/sparql"
    sparql = SPARQLWrapper(server_URL)
    resultat = {}
    union = ""
    for id in listIdDoc:
        union += "{?doc dcterms:subject ?key; dcterms:identifier "+str(id)+".}"
        union += "UNION"

    union = union[:-5]

    query = "PREFIX x5gonbjk: <http://x5gon/bjk/> PREFIX dcterms: <http://purl.org/dc/terms/> SELECT ?key (COUNT(?key) as ?val) WHERE {"+union+"}GROUP BY ?key ORDER BY DESC(?val) LIMIT 8"
    
    print(query)
    
    res = execQuery(sparql, query)['results']['bindings']
    print(res)
    if("key" in list(res[0])):
        for i in range(len(res)):
            resultat[res[i]['key']['value']] = res[i]['val']['value']

    print(resultat)
    return resultat
