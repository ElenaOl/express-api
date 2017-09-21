var express = require('express');
var request = require('request');
//call main express function to careate our express var called app
var app = express();
//dirname is full route for where my directory
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
//default route
app.get('/', function(req, res) {
  //res.sendFile("./index.html");
  res.render('index');
});

var recievedData = "";

app.get('/search/:foo', function(req, res) {
  var url = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&';
  var q = req.params.foo;
  var fullUrl = url + 'q=' + q;
  request({
    url: fullUrl
//   }, function(error, res, body) {
//     if(!error && response.statusCode === 200){
//       console.log(body);
//       var dataObj = JSON.parse(body);
//       res.send(dataObj);
//     }
    
//   });
// });

}, function(error, response, body) {
    var dataObj = JSON.parse(body);
    var ejs = require('ejs');
    var ejsStr = '<% data.forEach(function(d){ %> <img src="<%= d.images.original.url %>"></li><% }); %>';
    var html = ejs.render(ejsStr, {data: dataObj.data});
    res.send(html);
  });
});





app.listen(3000);

