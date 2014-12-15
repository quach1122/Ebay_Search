var express = require('express');
var router = express.Router();

var movies = require('../data').movies;

//console.log(movies);
var index_movies={};
for(var i= 0, len=movies.length;i<len;i++){
  var movieName = movies[i].Title;
  console.log(movieName);
  if(!(movieName in index_movies)){
    index_movies[movieName] = i;
  }
}
console.log(index_movies);
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/movies/:title',function(req,res){
  console.log(req.params.title);
  if(req.params.title in index_movies){
    res.status(200).json({movies: movies[index_movies[req.params.title]]});
  }
  else{
    res.json({error: 'info not found'});
  }
});
var reviews = [];
router.post('/movies/reviews',function(req,res){
  console.log("success post");
  //console.log('movieRevReq' + JSON.stringify(req.body));
  console.log('movieRevRes' + req.body);
  reviews.push(req.body);
  res.body=reviews;
  res.status(201).json(res.body);
});

module.exports = router;
