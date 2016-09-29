var mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment')

var data = [
  {
    name: 'Clouds Rest',
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
    description: 'blah blah blah'
  },
  {
    name: 'Mountains Nap',
    image: 'https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg',
    description: 'blah blah blah'
  },
  {
    name: 'Forest Siesta',
    image: 'https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg',
    description: 'blah blah blah'
  }
]

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log('removed campgrounds!');
    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err)
        } else {
          console.log('added a campground')
          //create a comment
          Comment.create(
            {
              text: 'Such nature!'
              author: 'Myself'
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('created new comment');
              }
            });
        }
      })
    })
  });
}

module.exports = seedDB;
