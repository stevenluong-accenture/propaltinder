var mysql = require("mysql");
var AWS = require('aws-sdk');
var xlsx = require('node-xlsx');
var s3 = new AWS.S3();

var myBucket = 'propaltinder';
var dbTable= 'opportunity4';

var myKey = 'newFile';
var params = {Bucket: myBucket, Key: 'GLAFY17-ALT4 - MMS extract cleaned v06.xlsx'}
var con = mysql.createConnection({
    host: "propaltinder-mysql-cluster.cluster-cek9m9yl7zkn.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "propaltinder_db_1"
});
con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});
s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
        //console.log(data.Body.toString());           // successful response
        var obj = xlsx.parse(data.Body);
        //console.log(obj[0].data[0]);
        //console.log(obj[0].data[1]);
        //console.log(obj[0].data[2]);
        for(var i = 2; i <obj[0].data.length;i++){
            console.log(i);
            var line = obj[0].data[i];
            var opportunity = {
                opportunityId: line[0],
                ou: line[2],
                csg: line[3],
                subcsg: line[4],
                masterClient: line[5],
                closedQuarter: line[13],
                salesCapture: line[30],
                clientLocation: line[54],
                og : line[1],
                industrySegment: line[8],
                tow: line[11],
                ic: line[17],
                mc: line[18],
                sc: line[19],
                si: line[20],
                tc: line[21],
                ao: line[22],
                bpo: line[23],
                io: line[24],
                responsibleBusiness: line[48],
                contractExtensionFlag: line[51],
                softwareDelivery: line[52]
            };
            //console.log(opportunity);
            con.query('INSERT INTO '+dbTable+' SET ?', opportunity, function(err,res){
                if(err) throw err;
                //console.log('Last insert:', res);
            });
        }
        con.end(function(err) {
        });

    }
});



