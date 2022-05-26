'use strict';
const { PerformanceObserver, performance } = require('perf_hooks');
var hana = require('@sap/hana-client');
var express = require('express');

var port = process.env.PORT || 8080;

var connOptions = {
    serverNode: 'f81226c2-466e-44d6-ab39-84604cf3be7f.hana.trial-us10.hanacloud.ondemand.com:443',
    UID: 'DBADMIN',
    PWD: 'Welcome1.',
};

var app = express();
app.use(express.static('public'));

var connection = hana.createConnection();

connection.connect(connOptions);

//Tables are DEVS, COMMUNITY, LEARNING_RELATION

app.get("/", function(req,res){
    res.send("You can search for the /devs, /community or /learning_relation tables.")
});

app.get("/:table", function(req,res){
    var table = req.params.table.toString()
    console.log(table)
    var sql = 'SELECT * FROM "DB_1"."' + table.toUpperCase() + '"';
    console.log(sql)
    var t0 = performance.now()
    var result = connection.exec(sql);
    var t1 = performance.now();
    console.log("time in ms " +  (t1 - t0));
	res.send(result);
});

app.listen(port, function(req,res){
	console.log("App ready and listening on port: " + port);
});