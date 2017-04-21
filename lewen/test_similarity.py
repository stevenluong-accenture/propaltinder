import numpy as np
import pandas as pd
#import matplotlib.pyplot as plt

from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import json

app = Flask('Similarity')
CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
from sklearn.preprocessing import OneHotEncoder

in_data = pd.read_csv('data/inputs_only.csv',sep=";",encoding="utf-8",dtype=str)
transformed = in_data[['Opportunity ID #']]
col_names = list(in_data)

for k in range(1,len(in_data.columns)):
    col = in_data[[col_names[k]]]
    dum = pd.get_dummies(col,prefix=col_names[k])

    transformed = pd.concat([transformed, dum], axis=1)

print(list(transformed))

#searchDict = {'Client Location':'France','ToW':'C','OG':'Products','Closed Quarter':'FY16Q3','Software Delivery':'Y'}
searchDict = {'Client Location':'France','ToW':'C','Closed Quarter':'FY16Q4','Software Delivery':'Y'
    ,'OG':'Health & Public Service','Industry Segment':'H&PS Health','IC  -  Net Revenue':'S','Responsible Business Entity':'OG'
              }



search_names = list(transformed)

def calculate_scores(searchDict):
    search_vect = [0]*(len(search_names)-1)

    for k in searchDict:
        name = k + '_'+searchDict[k]
        idx = search_names.index(name)
        search_vect[idx-1] = 1

    vals = transformed.iloc[:,1:len(search_names)].as_matrix()

    scores = np.dot(vals,search_vect)
    scores = pd.DataFrame(scores,columns=["score"])

    df_score = pd.concat([in_data,scores], axis=1)
    df_score = df_score.sort(columns=['score'], ascending=False)
    print(df_score.head(10).to_json())

    return df_score.head(10).to_json()

@app.route('/', methods=['POST'])
def top_match_ids():
    print(request.data)
    data = json.loads(request.data)

    return json.dumps(calculate_scores(data))

app.run(host="0.0.0.0",port=80)



