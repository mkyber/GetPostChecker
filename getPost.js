//Marie Kyber
//CS-290
//GET-POST Assignment
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8069);


app.get('/',function(req,res){
  var qParams = [];
  for (var item in req.query){
    qParams.push({'name':item,'value':req.query[item]})
  }
  var context = {};
  context.dataList = qParams;
  context.callType = "GET";
  res.render('get-post', context);
});

app.post('/', function(req,res){
  var pParams = [];
  for (var item in req.body){
    pParams.push({'name':item,'value':req.body[item]})
  }

  var qParams = [];
  for (var item in req.query){
    qParams.push({'name':item,'value':req.query[item]})
  }

  console.log(req.body);
  console.log(req.query);

  var context = {};
  context.dataListb = pParams;
  context.dataList = qParams;
  context.callType ="POST";
  res.render('get-post', context);
});


app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
