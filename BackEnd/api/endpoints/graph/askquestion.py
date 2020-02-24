from flask_restplus import Namespace, Resource, fields
from SPARQLWrapper import SPARQLWrapper, JSON
import re
import os
import operator
import datetime
import json
import pprint
import random
import string
import sys
import tensorflow as tf
import time
import spacy
import requests
import bs4
import torch
import numpy as np
import math
from spacy import displacy
from collections import Counter
import shlex
import subprocess
import copy
from . import stop_words, question_answering_tokenizer, question_answering_model, nlp
from .fastTextVectors import vectors

api = Namespace('askquestion', description='Ask a question to a ML Model')

doc = api.model('Answer', {
    'answer': fields.String(required=True, description='The answer of the post question'),
})

@api.route('/<question>')
@api.param('question', 'Any question. You can try : Who is Barack Obama ? or In what year was Jazz invented ? or When was PHP developed ?')
@api.param('idDoc', 'Any document id that you want ask question')
@api.response(404, 'Documents not found')
class AskQuestion(Resource):

    #@api.marshal_list_with(doc)
    def get(self, question, idDoc=None):
        server_URL = "http://localhost:3030/x5gon/"
        sparqlDbPediaEndpoint = "http://dbpedia.org/sparql"
        sparql = SPARQLWrapper(server_URL)

        #hyperparameters
        SIZE_CHUNK = 500
        document = 5

        #var to set global and vector of fasttext
        print("Charging models")

        #print(vectors)
        #print(stop_words)
        #print(question_answering_tokenizer)
        #print(question_answering_model)
        #print(nlp)
        print("End charging model")

        def splitTextByChunk(text_divide, s):
            chunk = [[]]
            i = 1
            nChunk = 0
            for word in text_divide:
              if(i%(s+1) == 0):
                i = 2
                chunk.append([])
                nChunk+=1
                chunk[nChunk].append(word)
              else:
                chunk[nChunk].append(word)
                i+=1

            return(chunk)

        def TF(textDictio, corpus):
            tf = np.zeros((len(textDictio), len(corpus)))
            dictio = list(textDictio.keys())
            for i in range(len(textDictio)):
              for j in range(len(corpus)):
                tf[i, j] = corpus[j].count(dictio[i])/len(corpus[j])
            #print(dictio)

            return(np.array(tf))

        def IDF(textDictio, corpus):
            dictio = list(textDictio.keys())
            idf = [0 for x in range(len(dictio))]
            for i in range(len(dictio)):
              for chunk in corpus:
                if(dictio[i] in chunk):
                  idf[i]+=1
            idf2 = [(math.log(len(corpus)/x) if x != 0 else x) for x in idf]
            return(np.array(idf2))

        def TFIDF(text, corpus):
            return(TF(text, corpus).transpose() * IDF(text, corpus))

        def getTheBestChunk(question, dictio, tfidf):
            words = list(set(question.split()))
            score = [0 for i in range(tfidf.shape[0])]
            for i in range(tfidf.shape[0]):
              for word in words:
                if(word in dictio.keys()):
                  score[i] += tfidf[i, dictio[word]]
            def softmax(x):
                e_x = np.exp(x - np.max(x))
                return e_x / e_x.sum()

            return(np.argmax(softmax(score)))

        def execQuery(sparql, query):
            sparql.setQuery(query)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()
            return results

        def getArticleContent(url):
            ret = requests.get(url)

            if ret is not None:
                html = bs4.BeautifulSoup(ret.text, 'html.parser')
                title = html.select("#firstHeading")[0].text
                paragraphs = html.select("p")

                  # just grab the text up to contents as stated in question
                intro = '\n'.join([ para.text for para in paragraphs])
                return(intro)

        def euclidian_distance(a, b):
            sum = 0
            if(len(a) == len(b)):
                for i in range(0, len(a)):
                    sum = sum + math.pow(a[i] - b[i], 2)
            return math.sqrt(sum)


        def getContentDocument(id, PLATFORM_URL):
            # initialise the endpoint
            get_specific_materials_endpoint = "/oer_materials/{}/contents/"

            # get the material id of the first material returned from previous example
            test_material_id = id

            # query for meta-information about this material, Note that there are no
            # parameters for this endpoint
            response = requests.get(PLATFORM_URL + get_specific_materials_endpoint.format(test_material_id))
            ret = ""

            if(response.status_code == 200):
                r_json = response.json()
                ret = str(r_json["oer_contents"][0]["value"]["value"])
            return(ret)

        # The objective is to get a subgraph of our KG which contains some documents using tfidf
        # return : concatenation of all of the document into the subgraph


        def getPertinentDocument(question, idDoc, split=True):
            print(idDoc)
            PLATFORM_URL = "https://platform.x5gon.org/api/v1"

            #doc = nlp(question)
            #print(doc.ents)
            #allEntities = ["<http://dbpedia.org/resource/"+X.text.replace(" ", "_").title()+">" for X in doc.ents]

            res = requests.get("http://api.dbpedia-spotlight.org/en/annotate?text="+question.lower()+"&confidence=0.5&support=50", headers = {'Accept': 'application/json'}).json()
            resFormat = {}
            print(res)
            if('Resources' in list(res.keys())):
                for r in res['Resources']:
                    if(r['@URI'] in list(resFormat.keys())):
                        resFormat[r['@URI']] = max(r['@similarityScore'], resFormat[r['@URI']])
                    else:
                        resFormat[r['@URI']] = r['@similarityScore']

            print(resFormat)


            resRet = []
            for key in resFormat:
                resRet.append(key)

            print(resRet)
            concatenationDocument = []
            if(idDoc == None):
                for entity in resRet:
                    #queryDocumentOnDataset = "PREFIX dcterms: <http://purl.org/dc/terms/> SELECT ?idDocument WHERE {?doc dcterms:identifier ?idDocument. ?doc dcterms:concept "+entity+".}"
                    #res = execQuery(sparql, queryDocumentOnDataset)['results']['bindings'][:document]
                    #print(res)
                    #print(len(res))
                    #for j in range(len(res)):
                        #print(getContentDocument(int(res[j]['idDocument']['value']), PLATFORM_URL))
                        #doc = getContentDocument(int(res[j]['idDocument']['value']), PLATFORM_URL)
                        #if("<?xml" not in doc):
                            #concatenationDocument.append(doc)
                    print(entity)
                    queryDocumentOnDbpedia = "PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?abstract WHERE {SERVICE <http://dbpedia.org/sparql> {<"+entity+"> dbo:abstract ?abstract.}FILTER LANGMATCHES(LANG(?abstract), 'EN')}"
                    res = execQuery(sparql, queryDocumentOnDbpedia)['results']['bindings'][:document]
                    #print(res)
                    #print(len(res))
                    for j in range(len(res)):
                        concatenationDocument.append(res[j]['abstract']['value'])
                        #concatenationDocument.append(getArticleContent("https://en.wikipedia.org/wiki/"+entity.replace('<http://dbpedia.org/resource/', '').replace('>', '')))
                    if(len(res) < 1):
                        queryDocumentOnDbpediaDerived = "PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?abstract WHERE {SERVICE <http://dbpedia.org/sparql> {<"+entity+"> dbo:wikiPageRedirects ?page. ?page dbo:abstract ?abstract.}FILTER LANGMATCHES(LANG(?abstract), 'EN')}"
                        res = execQuery(sparql, queryDocumentOnDbpediaDerived)['results']['bindings'][:document]
                        #print(res)
                        #print(len(res))
                        for j in range(len(res)):
                            concatenationDocument.append(res[j]['abstract']['value'])
                            #concatenationDocument.append(getArticleContent("https://en.wikipedia.org/wiki/"+entity.replace('<http://dbpedia.org/resource/', '').replace('>', '')))

                        queryDocumentOnDbpediaDisambiquates = "PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?disambiquatespages ?abstract WHERE {SERVICE <http://dbpedia.org/sparql> {<"+entity+"> dbo:wikiPageDisambiguates ?disambiquatespages. ?disambiquatespages dbo:abstract ?abstract.}FILTER LANGMATCHES(LANG(?abstract), 'EN')}"
                        res = execQuery(sparql, queryDocumentOnDbpediaDisambiquates)['results']['bindings'][:document]
                        #print(res)
                        #print(len(res))
                        for j in range(len(res)):
                            concatenationDocument.append(res[j]['abstract']['value'])
                            #concatenationDocument.append(getArticleContent("https://en.wikipedia.org/wiki/"+entity.replace('<http://dbpedia.org/resource/', '').replace('>', '')))
            else:
                concatenationDocument.append(getContentDocument(idDoc, PLATFORM_URL))
            if(split):
                if(len(question.split(" ")) > 0):
                    text = ' '.join(concatenationDocument).replace("[", "").replace("]", "").replace("\\", "").replace("/", "").lower()
                    text = text.split(" ")
                    textWithoutStopWords = [w for w in text if not w in stop_words]
                    text = ' '.join(textWithoutStopWords)
                    #text = text.decode('utf-8')
                    c = text.split(" ")
                    corpus = splitTextByChunk(c, 500)
                    print(len(corpus))
                    documentRepresentation = []
                    key = list(vectors.keys())
                    print(len(vectors))
                    print(len(corpus[0]))
                    distance = 0
                    for doc in corpus:
                        words = []
                        for word in doc:
                            if(word in key):
                                v = list(vectors[word])
                                if(len(v) > 0):
                                    words.append(v)
                        print(words)
                        documentRepresentation.append([float(sum(col))/len(col) for col in zip(*words)])
                    print(len(documentRepresentation))
                    print(len(documentRepresentation[0]))
                    print("doc")
                    questionRepresentation = []
                    for wQ in question.split(" "):
                        if(wQ in key):
                            v = list(vectors[wQ])
                            if(len(v) > 0):
                                questionRepresentation.append(v)
                                print(v)
                    #print(len(questionRepresentation))
                    #print(len(questionRepresentation[0]))
                    if(len(questionRepresentation) > 0):
                        questionvectors = [float(sum(col))/len(col) for col in zip(*questionRepresentation)]
                        print(len(questionvectors))
                        print("question")
                        distance = []
                        for vecs in documentRepresentation:
                            #print(vectors[:10])
                            #print(questionvectors[:10])
                            distance.append(euclidian_distance(vecs, questionvectors))
                        #print(corpus)
                        return corpus[np.argmin(distance)]
                    else:
                        return "empty"
                else:
                    return "empty"
            else:
                return ' '.join(concatenationDocument).replace("[", "").replace("]", "").replace("\\", "").replace("/", "").lower()



        def askQuestionToBERT(question, idDoc):
            start = time.time()
            corpusPertinent = getPertinentDocument(question, idDoc, False)
            end2 = time.time()
            #print(corpusPertinent)
            if(isinstance(corpusPertinent, list)):
                corpusPertinent = ' '.join([str(w) for w in corpusPertinent])
            else:
                corpusPertinent = str(corpusPertinent)
            print(corpusPertinent.encode('utf-8'))
            #print(corpusPertinent.encode('utf-8'))
            '''t_encoded_1 = question_answering_tokenizer.encode(corpusPertinent)
            t_encoded_2 = question_answering_tokenizer.encode(question)
            indexed_tokens = question_answering_tokenizer.encode(corpusPertinent, question, add_special_tokens=True)
            segments_ids = [0 for i in range(len(t_encoded_1))]+[1 for i in range(len(t_encoded_2)-1)]
            segments_tensors = torch.tensor([segments_ids])
            tokens_tensor = torch.tensor([indexed_tokens])

            # Predict the start and end positions logits
            t = time.time()
            with torch.no_grad():
                start_logits, end_logits = question_answering_model(tokens_tensor, token_type_ids=segments_tensors)
            print("Time : {}s".format(time.time()-t))
            print("Start logits : {}".format(torch.argmax(start_logits)))
            print("End logits : {}".format(torch.argmax(end_logits)))
            #return('coucou')
            #print(question_answering_tokenizer.decode(indexed_tokens[0:len(indexed_tokens)-1]))
            return(question_answering_tokenizer.decode(indexed_tokens[torch.argmax(start_logits):torch.argmax(end_logits)+1]))
            '''

            if(corpusPertinent != "empty" and corpusPertinent != ""):
                fileContent = "{\"version\": \"v2.0\",\"data\": [{\"title\": \"your_title\",\"paragraphs\": [{\"qas\": [{\"question\": \"<question>\",\"id\": \"0\",\"is_impossible\": \"\"}],\"context\": \"<content>\"}]}]}"
                fileContent = fileContent.replace("<question>", question, 1)
                fileContent = fileContent.replace("<content>", corpusPertinent.replace("\"", ""), 1)
                myfile = "endpoints/data/input_file.json"
                #print(fileContent)
                with open(myfile, "wb+") as f:
                    data = f.read()
                    f.seek(0)
                    f.write(fileContent.encode('utf-8'))
                    f.truncate()
                res = ""
                start = time.time()
                command = shlex.split("python3 endpoints/bert/run_squad.py --vocab_file="+os.path.abspath("endpoints/wwm_uncased_L-24_H-1024_A-16/vocab.txt")+" --bert_config_file="+os.path.abspath("endpoints/wwm_uncased_L-24_H-1024_A-16/bert_config.json")+" --init_checkpoint="+os.path.abspath("endpoints/data/model.ckpt-10859")+" --do_train=False --max_query_length=30 --do_predict=True --predict_file="+os.path.abspath("endpoints/data/input_file.json")+" --predict_batch_size=8 --n_best_size=3 --max_seq_length=384 --doc_stride=128 --output_dir="+os.path.abspath('endpoints/data/output/'))
                process = subprocess.Popen(command, stdout = subprocess.PIPE)
                process.wait()
                res = ""
                with open("endpoints/data/output/predictions.json", 'r+') as fin:
                    res = fin.read()
                end = time.time()
                print(str((end - start)/60)+" min")
                return(res)
            else:
                return "empty"

        return askQuestionToBERT(question, idDoc)
