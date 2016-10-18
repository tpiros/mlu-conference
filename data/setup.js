'use strict';
var fs = require('fs');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var marklogic = require('marklogic');
var host = 'localhost';
var port = 8000;
var user = 'admin';
var password = 'admin';
var db = marklogic.createDatabaseClient({host: host, port: port, user: user, password: password});
var qb = marklogic.queryBuilder;

var runRequest = function(port, endpoint, method, data) {
  var host = 'localhost';
  var baseURL = 'http://' + host + ':' + port;
  return request({
    url: baseURL + endpoint,
    method: method,
    auth: {
      user: user,
      password: password,
      sendImmediately: false
    },
    headers: {
      'Content-type': 'application/json'
    },
    json: data
  });
};

var indexConfig = JSON.parse(fs.readFileSync('index-config.json', 'utf-8'));

runRequest(8002, '/manage/v2/databases/Documents/properties', 'PUT', indexConfig)
.then(function(response) {
  if (response[0].statusCode === 204) {
    console.log(response[0].statusCode + ' - Indexes have been created.');
  } else {
    console.log(response[0].statusMessage);
  }
})
.then(function() {
  var jsonDocs = fs.readdirSync('json');
  var binaryDocs = fs.readdirSync('image');

  jsonDocs.forEach(function(jsonDoc) {
    db.documents.write({
      uri: '/character/' + jsonDoc,
      collections: ['character'],
      contentType: 'application/json',
      content: fs.readFileSync('json/' + jsonDoc)
    }).result().then(function(response) {
      console.log(response.documents[0].uri + ' inserted');
    });
  });

  binaryDocs.forEach(function(binaryDoc) {
    var ws = db.documents.createWriteStream({
      uri: '/image/' + binaryDoc,
      collections: ['image'],
      contentType: 'image/png',
    });
    fs.createReadStream('image/' + binaryDoc).pipe(ws);
    ws.result().then(function(response) {
      console.log(response.documents[0].uri + ' inserted');
    });
  });
})
.catch(function(error) {
  console.log(error);
});

//Delete App Server
// var deleteMe = function() {
//   return request({
//     url: 'http://52.18.51.96:8002/v1/rest-apis/5030-mlu-conference?include=content&include=modules',
//     method: 'DELETE',
//     auth: {
//       user: 'tpiros',
//       password: 'r0m4',
//       sendImmediately: false
//     }
//   });
// };
//
// deleteMe().then(function(response) {
//   console.log(response[0].statusMessage);
// });
