var mysql = require("mysql");
 var dbTable = "opportunity6"
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
//var fields = 'og,ou';
con.query('SELECT * FROM '+dbTable,function(err,rows){
      if(err) throw err;
        console.log('Data received from Db:');
          //console.log(rows);
          var out ={}
        //var fields=["og","ou","csg","subCsg","masterClientClass","masterClientLevel","industrySegment","industrySubSegment","stage","tow","restricted","closedQuarter","totalNetRevenue","cons","os","ic","mc","sc","si","tc","ao","bpo","io","localCurrency","globalClientAccountLead","technologyAccountLead","clientAccountLead","salesCapturePrimary","salesCapture","overallSalesCapture","opportunityContact","solutionArchitect","enterpriseArchitect","deliveryLead","keyMembersOfOppTeam","bidManager","dealShaper","lCPResponsible","mobilizationLead","negotiator","salesOrigination","proposalArchitect","competitiveArchitect","opportunityClass","riskProfile","pricingStructure","responsibleBusinessEntity","responsibleBusinessEntityOverride","clientClassificationAttribute","contractExtensionFlag","softwareDelivery","clientLocation","sellingCountry","geoArea","geoUnit","accentureDigital","accentureSoftware","alliances","businessService","consultingPractice","crossServiceGroupOffering","mergersAcquisitions","microsoftPlatformInformation","strategyOfferings","techOperationsOfferings"];
        var fields=["og","ou","csg","subCsg","masterClientClass","masterClientLevel","industrySegment","industrySubSegment","stage","tow","restricted","closedQuarter","totalNetRevenue","cons","os","ic","mc","sc","si","tc","ao","bpo","io","localCurrency","opportunityClass","riskProfile","pricingStructure","responsibleBusinessEntity","responsibleBusinessEntityOverride","clientClassificationAttribute","contractExtensionFlag","softwareDelivery","clientLocation","sellingCountry","geoArea","geoUnit","accentureDigital","accentureSoftware","alliances","businessService","consultingPractice","crossServiceGroupOffering","mergersAcquisitions","microsoftPlatformInformation","strategyOfferings","techOperationsOfferings"];
        //var fields=["og","ou","csg","subCsg","masterClientClass"];
        fields.forEach(function(f){

         out[f] = [];
          rows.forEach(function(r){
              if(out[f].indexOf(r[f])==-1 && r[f]!=null)
                out[f].push(r[f]);
          });
          process.stdout.write(f+",")
          out[f].forEach(function(v){
          process.stdout.write(v+",")
          })
          console.log("");
          //process.stdout.write("\r")
            });
          //console.log(rows[0][0]);
});
con.end(function(err) {
});
