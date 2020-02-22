import io
import fasttext

def load_vectors(fname):
    import io
    fin = io.open(fname, 'r', encoding='utf-8', newline='\n', errors='ignore')
    n, d = map(int, fin.readline().split())
    data = {}
    i = 0
    for line in fin:
        if(i < 80000):
            tokens = line.rstrip().split(' ')
            data[tokens[0]] = map(float, tokens[1:])
            print(i, end='\r')
        i+=1

    return data

vectors = None

if __name__ == "__main__":
    vectors = load_vectors('endpoints/data/wiki-news-300d-1M.vec')
