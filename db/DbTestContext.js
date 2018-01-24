var mongoose = require('mongoose');

module.exports.createDatabase = function(){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/DbTest";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
    });
}

module.exports.createCollections = function(){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DbTest");
        dbo.createCollection("Localities", function(err, res) {
            if (err) throw err;
            console.log("Localities Collection created!");
            db.close();
        });
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DbTest");
        dbo.createCollection("Incidents", function(err, res) {
            if (err) throw err;
            console.log("Incidents Collection created!");
            db.close();
        });
    });
}

//Locality

module.exports.insertLocality = function(LocalityName){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DbTest");
        var myobj = { name: LocalityName };
        dbo.collection("Localities").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

module.exports.getAllLocalities = function(){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var re = null;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("DbTest");
      var query = { };
        dbo.collection("Localities").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            return result;
            db.close();
        });
    });
}

//Incidents

module.exports.insertIncidents = function(_kind, _locationId, _happenedAt, _isArchived){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DbTest");
        var myobj = { kind: _kind,locationId: _locationId , happenedAt : _happenedAt , isArchived : _isArchived  };
        dbo.collection("Incidents").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 Incident inserted");
            db.close();
        });
    });
}


