var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    Campground    = require('./models/campground'),
    Comment       = require('./models/comment'),
    seedDB        = require('./seeds'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
    User          = require('./models/user');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'mellon',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//DEFAULT
app.get('/', function(req, res){
  res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds',function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index',{campgrounds:allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description:description};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err,newlyCreated){
        if(err) {
            console.log(err);
        } else {
            //Redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function(req,res){
   res.render('campgrounds/new.ejs');
});

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //Render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

//COMMENTS
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground});
    }
  });
});

app.post('/campgrounds/:id/comments', function(req, res){
    Campground.findById(req.params.id, function(err, campground){
      if (err){
        console.log(err);
        res.redirect('/campgrounds');
      } else {
        Comment.create(req.body.comment, function(err, comment){
          if(err){
            console.log(err);
          } else {
            campground.comments.push(comment);
            campground.save();
            res.redirect('/campgrounds/' + campground._id);
          }
        });
      }
    });
});

//===========
//AUTH ROUTES
//==========

//show register form
app.get('/register', function(req, res){
  res.render('register');
});

//handle sign up logic
app.post('/register', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/campgrounds');
    });
  });
});

//show login form
app.get('/login', function(req, res){
  res.render('login');
});

//login logic -> app.post('/login', middleware, callback);
app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), function(req, res){
});

//logout route
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, function(){
    console.log("serve's up");
});
