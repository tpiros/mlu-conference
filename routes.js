'use strict';

var marklogic = require('marklogic');
var dbConnection = require('./settings').connection;
var db = marklogic.createDatabaseClient(dbConnection);
var qb = marklogic.queryBuilder;

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
    })
  }).catch(function(error) {
    console.log(error);
  });
};

var showOneCharacter = function(req, res) {
  var uri = '/character/' + req.params.uri;
  db.documents.read(uri).result().then(function(response) {
    res.json(response);
  }).catch(function(error) {
    console.log(error);
  });
};

var showCharacterImage = function(req, res) {
  var uri = req.params.uri;
  res.writeHead(200, { 'Content-type': 'image/png' });
  var data = [];
  db.documents.read('/image/' + uri).stream('chunked').on('data', function(chunk) {
    data.push(chunk);
  }).on('error', function(error) {
    console.log(error);
  }).on('end', function() {
    var buffer = new Buffer(data.length).fill(0);
    buffer = Buffer.concat(data);
    res.end(buffer);
  });
};

var search = function(req, res) {
  var searchQuery = req.params.searchQuery;
  db.documents.query(
    qb.where(
      qb.collection('character'),
      qb.parsedFrom(searchQuery)
    )
  ).result().then(function(response) {
    console.log(response);
    res.json(response);
  }).catch(function(error) {
    console.log(error);
  });
};

module.exports = {
  index: index,
  showAllCharacters: showAllCharacters,
  showOneCharacter: showOneCharacter,
  showCharacterImage: showCharacterImage,
  search: search
};
