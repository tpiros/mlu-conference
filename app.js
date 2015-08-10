'use strict';

var express = require('express');
var app = express();
var router = express.Router();

app.set('port', 3000);
app.use('/public', express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/', router);
app.engine('html', require('ejs').renderFile);

var index = function(req, res) {
  res.render('index.html');
};

router.route('/').get(index);



app.listen(app.get('port'));
console.log('Magic happens on port ' + app.get('port'));
