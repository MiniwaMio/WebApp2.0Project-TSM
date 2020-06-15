var bodyParser = require('body-parser');
var eventsController = require('./controllers/eventsController.js');
var testing1 = "1";


var routes = function () {
    var router = require('express').Router();
    
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get('/', function(req, res) {
        res.sendFile(__dirname+"/views/index.html");
    });
    router.get('/organizer', function(req, res) {
        res.sendFile(__dirname+"/views/organizer.html");
    });
    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    router.get('/events',function(req,res){
        res.send(eventsController.getEvents());
    });
    router.post('/events', function(req, res) {
        var data = req.body;
        
        var event = {
            name: data.name,
            description: data.description,
            start: {
                date: data.startDate,
                time: data.startTime
            },
            end: {
                date: data.endDate,
                time: data.endTime
            }
        };
        
        eventsController.addEvent(event);     
        res.redirect('back');
    });
    router.get('/organizers',function(req,res){
        res.send(organizersController.getOrganizers());
    });
    router.post('/organizers', function(req, res) {
        var data = req.body;
        
        var organizer = 
        name: data.name;
        username: data.username;
        
        
        eventsController.addEvent(event);     
        res.redirect('back');
    });




    return router;
};
module.exports = routes();