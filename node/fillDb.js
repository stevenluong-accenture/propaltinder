var mysql = require("mysql");
var AWS = require('aws-sdk');
var xlsx = require('node-xlsx');
var s3 = new AWS.S3();

var myBucket = 'propaltinder';
var dbTable= 'opportunity8';

var myKey = 'newFile';
var params = {Bucket: myBucket, Key: 'GLAFY17-ALT4 - MMS extract cleaned v07.xlsx'}
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
            //console.log(i);
            var line = obj[0].data[i];
            var win = 0;
            if (line[10]=="3B")
                win = 1;
            //console.log(win);
            var opportunity = {
                opportunityId:line[0],
                og:line[1],
                ou:line[2],
                csg:line[3],
                subCsg:line[4],
                masterClient:line[5],
                masterClientClass:line[6],
                masterClientLevel:line[7],
                industrySegment:line[8],
                industrySubSegment:line[9],
                stage:line[10],
                tow:line[11],
                restricted:line[12],
                closedQuarter:line[13],
                totalNetRevenue:line[14],
                cons:line[15],
                os:line[16],
                ic:line[17],
                mc:line[18],
                sc:line[19],
                si:line[20],
                tc:line[21],
                ao:line[22],
                bpo:line[23],
                io:line[24],
                localCurrency:line[25],
                globalClientAccountLead:line[26],
                technologyAccountLead:line[27],
                clientAccountLead:line[28],
                salesCapturePrimary:line[29],
                salesCapture:line[30],
                overallSalesCapture:line[31],
                opportunityContact:line[32],
                solutionArchitect:line[33],
                enterpriseArchitect:line[34],
                deliveryLead:line[35],
                keyMembersOfOppTeam:line[36],
                bidManager:line[37],
                dealShaper:line[38],
                lCPResponsible:line[39],
                mobilizationLead:line[40],
                negotiator:line[41],
                salesOrigination:line[42],
                proposalArchitect:line[43],
                competitiveArchitect:line[44],
                opportunityClass:line[45],
                riskProfile:line[46],
                pricingStructure:line[47],
                responsibleBusinessEntity:line[48],
                responsibleBusinessEntityOverride:line[49],
                clientClassificationAttribute:line[50],
                contractExtensionFlag:line[51],
                softwareDelivery:line[52],
                clientLocation:line[53],
                sellingCountry:line[54],
                geoArea:line[55],
                geoUnit:line[56],
                accentureDigital:line[57],
                accentureSoftware:line[58],
                alliances:line[59],
                businessService:line[60],
                consultingPractice:line[61],
                crossServiceGroupOffering:line[62],
                mergersAcquisitions:line[63],
                microsoftPlatformInformation:line[64],
                strategyOfferings:line[65],
                techOperationsOfferings:line[66],
                win:win
            };
            //console.log(opportunity);
            con.query('INSERT INTO '+dbTable+' SET ?', opportunity, function(err,res){
                if(err) throw err;
            });
        }
        con.end(function(err) {
        });

    }
});



