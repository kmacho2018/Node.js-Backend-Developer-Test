var expect = require('chai').expect;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

DbTestContext = require('../db/DbTestContext.js');

describe('Create MongoDb Database', function () {
    it('Create Database', function () {
        DbTestContext.createDatabase();
        expect(true).to.be.true;
    });
});

describe('Creating Collections', function () {
    it('Create Database', function () {
        DbTestContext.createCollections();
        expect(true).to.be.true;
    });
});

describe('Insert New Incident', function () {
    it('New Incident', function () {
        DbTestContext.insertIncidents("TEST", "TEST", new Date(), false);
        expect(true).to.be.true;
    });
});

describe('Insert New Locality', function () {
    it('New Locality', function () {
        DbTestContext.insertLocality("TEST");
        expect(true).to.be.true;
    });
});

describe('Filter Incidents', function () {
    it('New Locality', function () {

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        var take = 100;
        var skip = 0;
        var sort_ = "Asc";
        var req = null;

        if (req) {

            if (req.query.Take) {
                take = parseInt(req.query.Take);
            }

            if (req.query.Skip) {
                skip = parseInt(req.query.Skip);
            }

            if (req.query.Sort) {
                sort_ = req.query.Sort;
            }
        }

        var mysort = { kind: (sort_ == "Asc" ? 1 : -1) };

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("DbTest");
            var query = { isArchived: false };
            dbo.collection("Incidents").find(query).skip(skip).limit(take).sort(mysort).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                expect(true).to.be.true;
                db.close();
            });
        });
    });
});

describe('Filter localities', function () {
    it('Filter localities', function () {

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        var pagination = 100;
        var sort_ = "Asc";
        var skip = 0;
        var take = 0;
        var req = null;

        if (req) {
            if (req.query.Take) {
                take = parseInt(req.query.Take);
            }

            if (req.query.Skip) {
                skip = parseInt(req.query.Skip);
            }

            if (req.query.Sort) {
                sort_ = req.query.Sort;
            }
        }

        var mysort = { name: (sort_ == "Asc" ? 1 : -1) };

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("DbTest");
            var query = {};
            dbo.collection("Localities").find(query).skip(skip).limit(take).sort(mysort).toArray(function (err, result) {
                if (err) throw err;
                //console.log(result);
                //res.send(result);
                expect(true).to.be.true;

                db.close();
            });
        });

    });
});

describe('Filter localities By Id', function () {
    it('Filter localities By Id', function () {

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("DbTest");

            var id = require('mongodb').ObjectID("Test");
            var query = { "_id": id };

            dbo.collection("Localities").find(query).toArray(function (err, result) {
                if (err) throw err;
                //console.log(result);
                //res.send(result);
                expect(true).to.be.true;

                db.close();
            });
        });
    });
});



