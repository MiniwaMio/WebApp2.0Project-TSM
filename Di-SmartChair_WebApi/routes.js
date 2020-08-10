var bodyParser = require('body-parser');
var db = require('./services/dataservices.js');
var crypto = require('crypto');
var validator = require('validator');
const e = require('express');

db.connect();

var routes = function(){
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.use(function(req,res,next){
        //if it is api request, then check for valid token
        if(req.url.includes("/api") && !req.url.includes("/css/") && !req.url.includes("/js/")) {
            //first time use req.query
            var token = req.query.token;
            if (token == undefined) {
                res.status(401).send("No tokens are provided");
            } else {
                db.checkToken(token, function (err, user) {
                    if (err || user == null) {
                        res.status(401).send("Invalid token provided");
                    } else {
                        //means proceed on with the request.
                        next();
                    }
                });
            }
        } else { //means any other url, no need to check for auth 
            //means proceed on with the request.
            next();
        }
    })

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    // router.get('/api/css/*', function(req, res)  {
    //     var cutUrl = req.originalUrl;
    //     cutUrl = cutUrl.replace('/api/', '');
    //     res.sendFile(__dirname+"/views/"+cutUrl);
    // });
    
    // router.get('/api/js/*', function(req, res)  {
    //     var cutUrl = req.originalUrl;
    //     cutUrl = cutUrl.replace('/api/', '');
    //     res.sendFile(__dirname+"/views/"+cutUrl);
    // });

    router.get('/', function(req, res){
        res.sendFile(__dirname + "/views/index.html");
    });

    router.get('/registration', function(req,res){
        res.sendFile(__dirname + "/views/registration.html");
    });

    router.get('/api/data', function(req, res){
        res.sendFile(__dirname + "/views/data.html");
    });

    router.get('/api/features', function(req,res){
        res.sendFile(__dirname + "/views/features.html");
    });
    
    router.get('/api/feedback', function(req,res){
        res.sendFile(__dirname + "/views/feedback.html");
    });

    router.get('/api/chair', function(req,res){
        res.sendFile(__dirname + "/views/chair.html");
    });


    //backend GET API
    //working
    router.get('/api/account/:uid', function (req, res){
        var id = req.params.uid;
        db.getAccount(id, function(err, account){
            if(err){
                res.status(500).send("Unable to find user at this moment");
            }else{
                res.status(200).send(account);
            }
        })
    });
    //working but need to add required check
    router.get('/api/data/:uid', function (req, res){
        var id = req.params.uid;
        db.getUserRecords(id, function(err, data){
            if(err){
                res.status(500).send("Unable to get records at this moment");
            }else{
                res.status(200).send(data);
            }
        });
    });

    router.get('/api/chair/:uid',function(req,res){
        var uid = req.params.uid;
        db.getAccount(uid, function(err,name){
            if(err){
                res.status(500).send("Unable to get this name");
            }else{
                res.status(200).send(name);
            }
        });
    })

    //backend POST API
    router.post('/login', function(req,res){
        var data = req.body;
        db.findIfExisting(data.email, data.password, function (err, user) {
            if (err) {
                res.status(401).send("Login unsucessful. Please try again later");
            } else {
                if (user == null) {
                    res.status(401).send("Login unsucessful. Please try again later");
                } else {
                    var strToHash = user.username + Date.now();
                    var token = crypto.createHash('md5').update(strToHash).digest('hex');
                    var uid = user._id;
                    db.updateToken(user._id, token, function (err, user) {
                        res.status(200).json({ 'message': 'Login successful.', 'token': token, 'userId' : uid });
                    });                    
                        
                }
            }
        })
    })
    //working, need to include bcrypt and passport to be more secure
    router.post('/registration', function(req,res){
        var signInData = req.body;
        if(signInData.email == "" || signInData.username == "" || signInData.password == ""){
            res.status(500).send("No blanks please");
        }else{
            var validationArr = [false, false, false];
            var validateAll = true;
            if(validator.isEmail(signInData.email)){
                validationArr[0] = true;
            }
            if(validator.isLength(signInData.username, {min : 6, max : undefined})){
                validationArr[1] = true;
            }
            if(validator.isLength(signInData.password, {min : 6, max : undefined})){
                validationArr[2] = true;
            }
            
            for(var i=0; i<validationArr.length; i++){
                console.log(validationArr[i]);
                if(validationArr[i] == false){
                    validateAll = false;
                }
            }
            
            if(validateAll != false){
                db.findIfExisting(signInData.email, signInData.password, function(err, account){
                    if(account){
                        console.log("Exists");
                        res.status(500).send("Account existed");
                    }else{
                        console.log("Doesn't Exists");
                        db.addAccount(req.body.email, req.body.username, req.body.password, function(err, account){
                            if(account){
                                res.status(200).send(account);
                            }else{
                                res.status(500).send("unable to add user now");
                            }
                        });
                    }
                });

            }else{
                res.status(500).send("Please key in according to requirements");
            }
        }

    });
    //working but need to change depending
    router.post('/api/record', function(req,res){
        db.addRecord(req.body.userId, req.body.duration, req.body.date, req.body.postureCount, function(err,record){
            if(err){
                res.status(500).send("unable to record now");
            }else{
                res.status(200).send(record);
            }
        });
    });

    return router;
};

module.exports = routes();