import io
import fasttext

vectors = None

def load_vectors(fname):
    import io
    fin = io.open(fname, 'r', encoding='utf-8', newline='\n', errors='ignore')
    n, d = map(int, fin.readline().split())
    vector = {}
    i = 0
    for line in fin:
        if(i < 80000):
            tokens = line.rstrip().split(' ')
            vector[tokens[0]] = map(float, tokens[1:])
            print(i, end='\r')
        i+=1