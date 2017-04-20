var mysql = require("mysql");
 var dbTable = "opportunity4"
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
con.query('SELECT * FROM '+dbTable,function(err,rows){
      if(err) throw err;

        console.log('Data received from Db:\n');
          console.log(rows.length);
          console.log(rows[0]);
});
con.end(function(err) {
});
