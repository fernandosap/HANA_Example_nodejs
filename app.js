'use strict';
const { PerformanceObserver, performance } = require('perf_hooks');
var hana = require('@sap/hana-client');
var express = require('express'); //Importing HANA and Express libraries to work with

var port = process.env.PORT || 8080; //Port for the application to run in

var connOptions = {
    serverNode: 'f81226c2-466e-44d6-ab39-84604cf3be7f.hana.trial-us10.hanacloud.ondemand.com:443',
    UID: 'DBADMIN',
    PWD: 'Welcome1.',
};

//Setting up the HANA connection. To connect change the DB URL to the one from "MANAGE SAP HANA Cloud" option in the BTP Cockpit and "Copy SQL Endpoint option"
// For the user, use the USER and PASSWORD for DBAdmin from the creation of database

var app = express();
app.use(express.static('public'));
// Initializing express (webapp framework)

var connection = hana.createConnection();
connection.connect(connOptions);

//Create the connection to HANA_DB
//Tables are DEVS, COMMUNITY, LEARNING_RELATION

//From here we have 2 routes configured the "home" and the "DB" search

app.get("/", function(req,res){
    res.send("You can search for the /devs, /community or /learning_relation tables.")
});

//We get the table requested from the URL and execute a query against HANA. We send the result back as a Jason.
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

//When we execute the application we create the webapp using express to accept web requests
app.listen(port, function(req,res){
	console.log("App ready and listening on port: " + port);
});