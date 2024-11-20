# Fuzzy docs

Built primarily for javascript ecma docs.
Search anything

### Example,

Lets say we are searching for reduceRight in javascript, and I want to see the official docs for it,
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/41bdafc7-bfcb-4e71-afe6-89568dc1008b">

We can see that in the official website also by doing ctrl + f, what is different here?
Lets say I made a spelling mistake, or I remembered something somewhat but not the exact word, for example, if I made a spelling mistake, ill still see it
<img width="1722" alt="image" src="https://github.com/user-attachments/assets/55ec9380-0735-4ea1-872b-8c1edb05e452">

The main thing is official website takes a lot of time to load the entire huge html doc. This website solves both issues, speed and fuzzy search within docs.


---

### Scripts used to get data

```python
from bs4 import BeautifulSoup as bs
from elasticsearch import Elasticsearch
import requests

client = Elasticsearch(
  "https://792b619607a642cb9ce8166445428350.us-central1.gcp.cloud.es.io:443",
  api_key="Zmc2UFJaTUJVVHUxNTU2NDJIMWQ6a2M2S0VySWJRc3UxT2lveGMyd0Ztdw=="
)

def extract_js():
  url = 'https://262.ecma-international.org/15.0/index.html'

  sp = bs(requests.get(url).content)

  arr = sp.findAll(['h1', 'p', 'emu-production'])

  data = []

  for ht in arr:
    if ht.name == 'h1':
      data.append([ht])
    else:
      data[-1].append(ht)

  objects = []
  for art in data:
    obj = {
      'h1' : art[0].text,
      'hh1' : art[0].prettify()
    }
    for i in range(1, len(art)):
      obj['p' + str(i)] = art[i].text
      obj['hp' + str(i)] = art[i].prettify()
    objects.append(obj)
  return objects

def extract_es_js():
  url = 'https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/8.16/api-reference.html'

  sp = bs(requests.get(url).content)

  bk = sp.find("div", {"class": "book"})
  arr = bk.findAll(['h3', 'h4', 'h5', 'h6', 'p', 'pre', 'li'])
  data = []

  header = None
  for ht in arr:
    if ht.name == 'h3':
      header = ht
    elif ht.name == 'h4':
      data.append([header, ht])
    elif len(data) > 0:
      data[-1].append(ht)
    else:
      pass

  objects = []
  for art in data:
    obj = {
      'h1' : art[0].text,
      'hh1' : art[0].prettify()
    }
    for i in range(1, len(art)):
      obj['p' + str(i)] = art[i].text
      if art[i].name == 'li':
        obj['hp' + str(i)] = '<small>' + art[i].text + '</small>'
      else:
        obj['hp' + str(i)] = art[i].prettify()
    objects.append(obj)
  return objects

es_js = extract_es_js()

for i in range(len(es_js)):
  print(i, len(es_js))
  doc = es_js[i]
  # print(es_js[i])
  client.index(index="es-js", id=i+1, document=doc)


client.bulk(operations=documents, pipeline="ent-search-generic-ingestion")

client.deleteByQuery({"index" : "js"})
print(client.search(index="js", q="rev"))
objects = extract_js()
for i in range(len(objects)):
  doc = objects[i]
  print(client.index(index="js", id=i+1, document=doc))

print(client.index(index="js", id=2078+1, document=objects[2078]))

```
