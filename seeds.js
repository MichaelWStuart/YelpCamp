var mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment')

var data = [
  {
    name: 'Clouds Rest',
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
    description: "Sriracha small batch listicle mixtape forage. Pickled truffaut ramps, gluten-free artisan cold-pressed cray. Flannel flexitarian DIY cray VHS microdosing. 3 wolf moon pinterest keytar yr, shoreditch pop-up shabby chic tbh knausgaard paleo. Enamel pin semiotics health goth, green juice mumblecore yr hella hexagon before they sold out lumbersexual. Mumblecore chartreuse letterpress celiac, godard authentic four dollar toast lo-fi. Waistcoat health goth actually offal."
  },
  {
    name: 'Mountains Nap',
    image: 'https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg',
    description: "Ennui sartorial selfies offal, truffaut you probably haven't heard of them kickstarter cornhole vinyl. Slow-carb fingerstache viral, tofu occupy glossier gastropub beard cray put a bird on it bitters blog selfies. Succulents narwhal lo-fi raw denim, art party kombucha mlkshk fam affogato. Post-ironic enamel pin viral iPhone heirloom. Cliche iceland vegan bushwick selfies, ennui copper mug sartorial meh vinyl disrupt pour-over. Organic cardigan ramps, marfa taxidermy deep v edison bulb you probably haven't heard of them readymade four loko cronut irony locavore. Gentrify austin occupy live-edge, air plant actually roof party waistcoat subway tile everyday carry single-origin coffee."
  },
  {
    name: 'Forest Siesta',
    image: 'https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg',
    description: "Pug wolf lomo wayfarers. Plaid art party portland, narwhal truffaut aesthetic actually iPhone tumeric shoreditch lomo. Sriracha tumeric put a bird on it gochujang asymmetrical, messenger bag tumblr raclette godard. Readymade distillery master cleanse freegan butcher scenester. Man bun organic post-ironic, heirloom selfies 8-bit shabby chic lo-fi hexagon. Pickled drinking vinegar actually, wayfarers umami chambray succulents polaroid organic chicharrones tumeric farm-to-table yuccie PBR&B portland. Chillwave keffiyeh mumblecore vaporware, paleo deep v roof party occupy +1 raw denim."
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
              text: 'Such nature!',
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
