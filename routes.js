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

var _noPaginationSearch = function(searchQuery) {
  return db.documents.query(
    qb.where(
      qb.collection('character'),
      qb.parsedFrom(searchQuery)
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
    if (error.code === 'ECONNREFUSED') {
      res.json({error: 'MarkLogic is offline'});
    }
  });
};

var showOneCharacter = function(req, res) {
  var uri = '/character/' + req.params.uri;
  db.documents.read(uri).result().then(function(response) {
    res.json(response);
  }).catch(function(error) {
    console.log(error);
    if (error.code === 'ECONNREFUSED') {
      res.json({error: 'MarkLogic is offline'});
    }
  });
};

var showCharacterImage = function(req, res) {
  var uri = req.params.uri;
  res.writeHead(200, { 'Content-type': 'image/png' });
  var data = [];
  var buffer = [];
  db.documents.read('/image/' + uri).stream('chunked').on('data', function(chunk) {
    data.push(chunk);
  }).on('error', function(error) {
    console.log(error);
    if (error.code === 'ECONNREFUSED') {
      res.json({error: 'MarkLogic is offline'});
    }
  }).on('end', function() {
    buffer = Buffer.concat(data);
    res.end(buffer);
  });
};

var search = function(req, res) {
  var searchQuery = req.params.searchQuery;
  _noPaginationSearch(searchQuery).then(function(response) {
    var total = response[0].total;
    return total;
  }).then(function(total) {
    db.documents.query(
      qb.where(
        qb.collection('character'),
        qb.parsedFrom(searchQuery)
      )
      .slice(1, total)
      .withOptions({ debug: true })
    ).result().then(function(response) {
      var data = {};
      var scores = [];
      var documents = [];
      scores = response[0].results;
      documents = response.slice(1, response.length);
      data = {
        scores: scores,
        documents: documents
      }
      res.json(data);
    }).catch(function(error) {
      console.log(error);
      if (error.code === 'ECONNREFUSED') {
        res.json({error: 'MarkLogic is offline'});
      }
    });
  });
};

module.exports = {
  index: index,
  showAllCharacters: showAllCharacters,
  showOneCharacter: showOneCharacter,
  showCharacterImage: showCharacterImage,
  search: search
};
