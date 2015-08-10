'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var marklogic = require('marklogic');
var dbConnection = require('./settings').connection;
var db = marklogic.createDatabaseClient(dbConnection);
var qb = marklogic.queryBuilder;

app.set('port', 3000);
app.use('/public', express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/', router);

var index = function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
};

var _noPagination = function() {
  return db.documents.query(
    qb.where(
      qb.collection('character')
    ).slice(0)
  ).result();
};

var showAllCharacters = function(req, res) {
  //get total number of documents
  _noPagination().then(function(response) {
    var total = response[0].total;
    return total;
  }).then(function(total) {
    db.documents.query(
      qb.where(
        qb.collection('character')
      ).slice(1, total)
    ).result().then(function(response) {
      res.json(response);
    });
  });
};

router.route('/').get(index);

router.route('/api/characters').get(showAllCharacters);

app.listen(app.get('port'));
console.log('Magic happens on port ' + app.get('port'));
