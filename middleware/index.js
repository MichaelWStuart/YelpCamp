var Campground = require('../models/campground');
var Comment = require('../models/comment')
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  //is user logged in?
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash('error', 'Campground not found');
        res.redirect('back');
      } else {
        //does user own campground?
        //instead of === use .equals(), because foundCampground.id is a mongoose object, not a string
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', 'You don\'t have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You must be logged in to do that');
    res.redirect('back');
  };
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
  //is user logged in?
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect('back');
      } else {
        //does user own comment?
        //instead of === use .equals(), because foundComment.id is a mongoose object, not a string
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', 'You don\'t have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  };
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You must be logged in to do that');
  res.redirect('/login');
}

module.exports = middlewareObj;
