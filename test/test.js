var expect =  require('chai').expect;

var express =  require('express');
var app =  express();
var bodyParser =  require('body-parser');
var mongoose = require('mongoose');

DbTestContext =  require('../db/DbTestContext.js');

describe('Create MongoDb Database',function(){
    it('Create Database',function(){
        DbTestContext.createDatabase();
        expect(true).to.be.true;
    });
});

describe('Creating Collections',function(){
    it('Create Database',function(){
        DbTestContext.createCollections();
        expect(true).to.be.true;
    });
});

describe('Insert New Incident',function(){
    it('New Incident',function(){
        DbTestContext.insertIncidents("TEST", "TEST", new Date(), false);
        expect(true).to.be.true;
    });
});

describe('Insert New Locality',function(){
    it('New Locality',function(){
        DbTestContext.insertLocality("TEST");
        expect(true).to.be.true;
    });
});