var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

var campgrounds = [
    {name: 'salmon creek',image:'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'},
    {name: 'bear canyon', image:'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'},
    {name: 'badlands', image:'https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg'}
];
        
app.get('/',function(req,res){
    res.render('landing');
});

app.get('/campgrounds',function(req,res){

        
    res.render('campgrounds',{campgrounds:campgrounds});
});

app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req,res){
   res.render('new.ejs');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('serves up');
});