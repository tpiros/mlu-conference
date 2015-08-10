'use strict';
var fs = require('fs');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var marklogic = require('marklogic');
var db = marklogic.createDatabaseClient({host: '52.18.51.96', port: 5030, user: 'tpiros', password: 'r0m4'});
var qb = marklogic.queryBuilder;

var runRequest = function(port, endpoint, method, data) {
  var username = 'tpiros';
  var password = 'r0m4'
  var hostname = '52.18.51.96';
  var baseURL = 'http://' + hostname + ':' + port;
  return request({
    url: baseURL + endpoint,
    method: method,
    auth: {
      user: username,
      password: password,
      sendImmediately: false
    },
    headers: {
      'Content-type': 'application/json'
    },
    json: data
  });
};

var RESTConfig = JSON.parse(fs.readFileSync('rest-api.json', 'utf-8'));
var indexConfig = JSON.parse(fs.readFileSync('index-config.json', 'utf-8'));

runRequest(8002, '/v1/rest-apis', 'POST', RESTConfig)
.then(function(response) {
  if (response[0].statusCode === 201) {
    console.log(response[0].statusCode + ' - App Server ' + RESTConfig['rest-api'].name + ' has been created.');
    return runRequest(8002, '/manage/v2/databases/' + RESTConfig['rest-api'].database + '/properties', 'PUT', indexConfig);
  } else {
    console.log(response[0].statusMessage);
  }
})
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
