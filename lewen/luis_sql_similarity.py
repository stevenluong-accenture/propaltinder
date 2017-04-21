import pymysql
import pymysql.cursors
import numpy as np
import pandas as pd

from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import json

from luis_sdk import LUISClient

luis_appid = "0d74d65a-5b58-4a58-b0af-a4652abae50a"
luis_app_key = "b4030b9815584985be1f46a35919d96e"
luis_url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/0d74d65a-5b58-4a58-b0af-a4652abae50a?subscription-key=b4030b9815584985be1f46a35919d96e&verbose=true&timezoneOffset=0.0&q="

conn = pymysql.connect(
    host="propaltinder-mysql-cluster.cluster-cek9m9yl7zkn.us-east-1.rds.amazonaws.com",
    user="admin",password="12345678",db="propaltinder_db_1")
db = conn.cursor()

col_names =["opportunityId","og","ou","csg","subCsg","masterClientClass","industrySegment","industrySubSegment","stage","tow","restricted","closedQuarter","totalNetRevenue","cons","os","ic","mc","sc","si","tc","ao","bpo","io","localCurrency","opportunityClass","riskProfile","pricingStructure","responsibleBusinessEntity","responsibleBusinessEntityOverride","clientClassificationAttribute","contractExtensionFlag","softwareDelivery","clientLocation","sellingCountry","geoArea","geoUnit","accentureDigital","accentureSoftware","alliances","businessService","consultingPractice","crossServiceGroupOffering","mergersAcquisitions","microsoftPlatformInformation","strategyOfferings","techOperationsOfferings"]
col_str = ",".join(col_names)

all_col_names = []
sql = "DESCRIBE opportunity8;"
db.execute(sql)

for row in db.fetchall():
    all_col_names.append(row[0])
print(all_col_names)

data_sql = []
sql = "select * from opportunity8;"
db.execute(sql)

for row in db.fetchall():
    data_sql.append(row)

app = Flask('Similarity')
CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
#in_data = pd.read_csv('data/inputs_only.csv',sep=";",encoding="utf-8",dtype=str)
in_data = pd.DataFrame(data_sql,columns=all_col_names)
transformed = in_data[['opportunityId']]
col_names = list(in_data)

for k in range(1,len(col_names)):
    col = in_data[col_names[k]].str.lower()
    dum = pd.get_dummies(col,prefix=col_names[k])

    transformed = pd.concat([transformed, dum], axis=1)

#print(list(transformed))

#searchDict = {'Client Location':'France','ToW':'C','OG':'Products','Closed Quarter':'FY16Q3','Software Delivery':'Y'}
#searchDict = {'clientLocation':'France','tow':'C','closedQuarter':'FY16Q4','softwareDelivery':'Y'
#    ,'OG':'Health & Public Service','Industry Segment':'H&PS Health','IC  -  Net Revenue':'S','Responsible Business Entity':'OG'
#              }

search_names = list(transformed)

def calculate_scores(searchDict):
    print(searchDict)
    search_vect = [0]*(len(search_names)-1)

    for k in searchDict:
        name = k + '_'+searchDict[k]
        if not name in search_names:
            continue
        idx = search_names.index(name)
        search_vect[idx-1] = 1
    #print(search_vect)

    vals = transformed.iloc[:,1:len(search_names)].as_matrix()

    scores = np.dot(vals,search_vect)
    scores = pd.DataFrame(scores,columns=["score"])

    df_score = pd.concat([in_data,scores], axis=1)
    df_score = df_score.sort_values('score', ascending=False)

    wins = [float(v) for v in df_score['win'][0:100]]
    rate = np.mean(wins)

    result = {}
    result['records'] = df_score.head(10).to_json(orient="records")
    result['successRate'] = rate
    return result

@app.route('/', methods=['POST'])
def top_match_ids():
    print(request.data)
    data = json.loads(request.data)

    return json.dumps(calculate_scores(data))

def process_res(res):
    result = {}
    for entity in res.get_entities():
        print('"%s":' % entity.get_name())
        print('Type: %s, Score: %s' % (entity.get_type(), entity.get_score()))

        result[entity.get_type()] = entity.get_name()

    return result

@app.route('/text/',methods=['POST'])
def top_match_txt():
    CLIENT = LUISClient(luis_appid, luis_app_key, True)
    TEXT = request.data
    res = CLIENT.predict(TEXT)
    parsed = process_res(res)

    return json.dumps(calculate_scores(parsed))

app.run(host="0.0.0.0",port=5000)
