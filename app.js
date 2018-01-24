var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

DbTestContext = require('./db/DbTestContext.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


DbTestContext.createDatabase();

DbTestContext.createCollections();

//POST /incidents
//Samples:
//http://localhost:2000/incidents
app.post('/incidents', function (req, res) {
  DbTestContext.insertIncidents(req.body.kind, req.body.locationId, new Date(), (req.body.isArchived == null ? false : true));
  res.send('Incidente registrado con exito.');
});

//GET incidents
//incidents?Skip=0&Take=3&Sort=Asc|Desc
//Samples:
//http://localhost:2000/incidents?Skip=0&Take=3&Sort=Asc
app.get('/incidents', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  var take = 100;
  var skip = 0;
  var sort_ = "Asc";

  if (req.query.Take) {
    take = parseInt(req.query.Take);
  }

  if (req.query.Skip) {
    skip = parseInt(req.query.Skip);
  }

  if (req.query.Sort) {
    sort_ = req.query.Sort;
  }

  var mysort = { kind: (sort_ == "Asc" ? 1 : -1) };

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");
    var query = { isArchived: false };
    dbo.collection("Incidents").find(query).skip(skip).limit(take).sort(mysort).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});


//POST /incidents/:incidentId/archive
//Samples:
//http://localhost:2000//incidents/{incidentId}/archive
app.post('/incidents/:incidentId/archive', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");
    var id = require('mongodb').ObjectID(req.params.incidentId);
    var query = { "_id": id };
    var newvalues = { $set: { isArchived: true } };
    dbo.collection("Incidents").updateOne(query, newvalues, function (err, result) {
      if (err) throw err;
      console.log("Incident #" + req.params.incidentId + " archived");
      res.send("Incident #" + req.params.incidentId + " archived");
      db.close();
    });

  });

});

//GET /localities
//GET /localities?Skip=0&Take=3&Sort=Asc|Desc
//Samples:
//http://localhost:2000/localities
//http://localhost:2000/localities?Skip=0&Take=3&Sort=Desc
app.get('/localities', function (req, res) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  console.log(req.params);

  var pagination = 100;
  var sort_ = "Asc";
  var skip = 0;
  var take = 0;

  if (req.query.Take) {
    take = parseInt(req.query.Take);
  }

  if (req.query.Skip) {
    skip = parseInt(req.query.Skip);
  }

  if (req.query.Sort) {
    sort_ = req.query.Sort;
  }

  var mysort = { name: (sort_ == "Asc" ? 1 : -1) };

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");
    var query = {};
    dbo.collection("Localities").find(query).skip(skip).limit(take).sort(mysort).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });

});

//GET /localities/:localityId
//Samples:
//http://localhost:2000/localities/{localityId}
app.get('/localities/:localityId', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");

    var id = require('mongodb').ObjectID(req.params.localityId);
    var query = { "_id": id };

    dbo.collection("Localities").find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

//POST /localities
//Samples:
//http://localhost:2000/localities
app.post('/localities', function (req, res) {
  DbTestContext.insertLocality(req.body.Locality);
  res.send('Se registró la localidad: ' + req.body.Locality);
});

app.listen(2000);
console.log('Running on port 2000...');