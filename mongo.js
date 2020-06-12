var Int32 = require('mongoose-int32');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MySongsDB', {useNewUrlParser : true});
//connection
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', function(){

});

//schemas
var song = new mongoose.Schema({
    title: String,
    album: String,
    duration: String,
    artist: String,
    releaseDate: String
});

var artist = new mongoose.Schema({
    name: String,
    debut: Int32,
    profilePic: String
});

//models
var songs = mongoose.connection.model('songs', song);
var artists = mongoose.connection.model('artists', artist);

//Querying

//D
 var searchAllSongs = songs.find({});
 searchAllSongs.exec(function(err,songs){
     if(err) return console.err(err);
     console.log(songs);
 });

//E
 var searchSongsById = songs.findById('5ed45a4cf69ab6740e11e3fe');
 searchSongsById.exec(function(err,songs){
     if(err) return console.err(err);
     console.log(songs);
 });

//F
 var addNewAtrist = new artists({
     name: 'Bruno Mars',
     debut: 2004,
     profilePic: 'brunomars.jpg'
 });

 addNewAtrist.save(function(err,artists){
     if(err) return console.error(err);
     console.log("New Artist added successfully");
 });

//G
 artists.findOne({name: 'Bruno Mars'}, function(err, artists){
     if(err) return console.error(err);
     artists.debut = 2001;
     artists.save();
     console.log("Debut updated");
 });

//H
artists.find({}, function(err, artists){
    console.log(artists);
});
artists.findByIdAndDelete('5ed9a4672302b64f74eda025', function(err,artists){
    if(err) return console.error(err);
    console.log("Artist deleted successfully");
});
