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

//DbTestContext.insertLocality("Azua");

//DbTestContext.getAllLocalities();

//DbTestContext.insertIncidents("ROBBERY","23TplPdS",new Date(),false);

//POST /incidents
app.post('/incidents', function (req, res) {
  DbTestContext.insertIncidents(req.body.kind, req.body.locationId, new Date(), (req.body.isArchived == null ? false : true));
  res.send('Incidente registrado con exito.');
});

//GET incidents
app.get('/incidents', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  var re = null;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");
    var query = { isArchived: false };
    dbo.collection("Incidents").find(query).toArray(function (err, result) {
      if (err) throw err;
      var jaja = {};
      console.log(result);
      res.send(result);

      db.close();
    });
  });
});


//POST /incidents/:incidentId/archive

app.post('/incidents/:incidentId/archive', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");
    var id = require('mongodb').ObjectID(req.params.incidentId);
    var query = { "_id": id };
    var newvalues = { $set: { isArchived: true }};
    dbo.collection("Incidents").updateOne(query, newvalues, function (err, result) {
      if (err) throw err;
      console.log("Incident #"+req.params.incidentId+" archived");
      res.send("Incident #"+req.params.incidentId+" archived");
      db.close();
    });

  });
  /*DbTestContext.insertIncidents(req.body.kind,req.body.locationId,new Date(),(req.body.isArchived == null ? false : true ));
  res.send('Incidente registrado con exito.');*/
});

//GET /localities
//GET /localities?Count=20&Sort=Asc|Desc
//Samples:
//http://localhost:3000/localities?Sort=Desc&Count=1
//http://localhost:3000/localities?Sort=Asc&Count=1
app.get('/localities', function (req, res) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  if(req.params.Count !=null){
    console.log('hay conteo');
  }
  console.log(req.params);
  var re = null;

  var pagination = 10;
  var sort_ = "Asc";

  if(req.query.Count!=null){
    pagination = parseInt(req.query.Count);
  }

  if(req.query.Sort!=null){
    sort_ = req.query.Sort ;
  }

  var mysort = { name: (sort_ == "Asc" ? 1 :  -1) };

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");
    var query = {};
    dbo.collection("Localities").find(query).sort(mysort).limit(pagination).toArray(function (err, result) {
      if (err) throw err;
      var jaja = {};
      console.log(result);
      res.send(result);

      db.close();
    });
  });

});

//GET /localities?Count=?
app.get('/localitiesWithPagination/:cnt', function (req, res) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  console.log(req.params);
  var re = null;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");
    var query = {};
    var mysort = { name: 1 };

    console.log(req.query.SortAsc);
    if(SortAsc)

    dbo.collection("Localities").find(query).limit(parseInt(req.params.cnt)).sort().toArray(function (err, result) {
      if (err) throw err;
      var jaja = {};
      console.log(result);
      res.send(result);

      db.close();
    });
  });

});

//GET /localities/:localityId
app.get('/localities/:localityId', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  var re = null;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbTest");

    var id = require('mongodb').ObjectID(req.params.localityId);
    var query = { "_id": id };

    dbo.collection("Localities").find(query).toArray(function (err, result) {
      if (err) throw err;
      var jaja = {};
      console.log(result);
      res.send(result);

      db.close();
    });
  });
});

//POST /localities
app.post('/localities', function (req, res) {

  DbTestContext.insertLocality(req.body.Locality);

  res.send('Se registró la localidad: ' + req.body.Locality);
});

app.listen(3000);
console.log('Running on port 3000...');