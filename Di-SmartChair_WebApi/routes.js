var bodyParser = require('body-parser');
var db = require('./services/dataservices.js');
var crypto = require('crypto');
var validator = require('validator');

db.connect();

var routes = function(){
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    //validation
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
    });

    //Routes to request for pages and apis
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

    //login
    router.get('/', function(req, res){
        res.sendFile(__dirname + "/views/index.html");
    });

    //registration
    router.get('/registration', function(req,res){
        res.sendFile(__dirname + "/views/registration.html");
    });

    //data pages
    router.get('/api/data', function(req, res){
        res.sendFile(__dirname + "/views/data.html");
    });

    //pages that showcase the arduino features
    router.get('/api/features', function(req,res){
        res.sendFile(__dirname + "/views/features.html");
    });
    
    //feedback page
    router.get('/api/feedback', function(req,res){
        res.sendFile(__dirname + "/views/feedback.html");
    });

    //maybe removing later
    router.get('/api/chair', function(req,res){
        res.sendFile(__dirname + "/views/chair.html");
    });


    //backend GET API
    //get account details
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
    //get user's record according to their current uids (sort by user -> date)
    //working as intended 
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

    //get other user's data (sort by user -> date)
    router.get('/api/data/others/:uid', function (req, res){
        var id = req.params.uid;
        db.getOthersRecord(id, function(err, data){
            if(err){
                res.status(500).send("Unable to get others records at this moment");
            }else{
                res.status(200).send(data);
            }
        });
    });

    //working
    router.get('/api/chair/:uid',function(req,res){
        var uid = req.params.uid;
        db.getAccount(uid, function(err,name){
            if(err){
                res.status(500).send("Unable to get this name");
            }else{
                res.status(200).send(name);
            }
        });
    });

    router.get("/logout", function (req, res) {
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided");
        } else {
            db.checkToken(token, function (err, organizer) {
                if (err || organizer == null) {
                    res.status(401).send("Invalid token provided");
                } else {
                    db.updateToken(organizer._id, "", function (err, organizer) {
                        res.status(200).send("Logout successfully")
                    });
                }
            })
        }
    })

    

    //backend POST API
    //Post for login attempts
    router.post('/login', function(req,res){
        var data = req.body;
        db.findIfExisting(data.email, data.password, function (err, user) {
            if (err) {
                res.status(500).send("Login unsucessful. Please try again later");
            } else {
                if(data.email == "" || data.password == ""
                || data.email == undefined || data.password == undefined){
                    res.status(400).send("Please key in your credentials");
                }else{
                    if (user == null) {
                        res.status(401).send("Either username or password is incorrect, please try again.");
                    } else {
                        var strToHash = user.username + Date.now();
                        var token = crypto.createHash('md5').update(strToHash).digest('hex');
                        var uid = user._id;
                        db.updateToken(user._id, token, function (err, user) {
                            res.status(200).json({ 'message': 'Login successful.', 'token': token, 'userId' : uid });
                        });                    
                            
                    }
                }
            }
        })
    });
    //working
    //Post for registration attempt
    router.post('/registration', function(req,res){
        var signInData = req.body;
        if(signInData.email == "" || signInData.username == "" || signInData.password == ""
        || signInData.email == undefined || signInData.username == undefined || signInData.password == undefined){
            res.status(401).send("No blanks please");
        }else{
            //validation for all 3 fields
            var validationArr = [false, false, false];
            //check if any fields did not pass validation
            var validateAll = true;

            //validate all 3 fields
            console.log(signInData.email);
            if(validator.isEmail(signInData.email)){
                validationArr[0] = true;
            }
            if(validator.isLength(signInData.username, {min : 6, max : undefined})){
                validationArr[1] = true;
            }
            if(validator.isLength(signInData.password, {min : 6, max : undefined})){
                validationArr[2] = true;
            }
            
            //loop through validationArr to check if any fields did not pass
            for(var i=0; i<validationArr.length; i++){
                console.log(validationArr[i]);
                if(validationArr[i] == false){
                    validateAll = false;
                }
            }
            //if all validation is passed, attempt add account into db
            if(validateAll != false){
                //check if this email is existing
                db.findIfEmailExisting(signInData.email, function(err, account){
                    if(account){
                        console.log("Exists");
                        res.status(401).send("Account existed");
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
    //add data into database from arduino -> wifi -> ajax -> Node -> DB
    router.post('/api/record', function(req,res){
        var inData = req.body;

        if(inData.userId == "" || inData.duration == "" || inData.date == "" || inData.postureCount == ""
        || inData.userId == undefined || inData.duration == undefined || inData.date == undefined || inData.postureCount == undefined){
            res.status(500).send("Something went wrong with the chair, please send for repair");
        }else{
            db.addRecord(inData.userId, inData.duration, inData.date, inData.postureCount, function(err,record){
                if(err){
                    res.status(500).send("unable to record now");
                }else{
                    res.status(200).send("record added successfully");
                }
            });
        }
        
    });

    //post for adding feedback into database
    router.post('/api/feedback', function(req,res){
        var dataIn = req.body;
        if(dataIn.userId == "" || dataIn.date == "" || dataIn.comment == "" || dataIn.userId == undefined || dataIn.date == undefined || dataIn.comment == undefined){
            res.status(401).send("Ensure all fields are input correctly. Thank you");
        }else{
            db.addFeedback(dataIn.userId, dataIn.date, dataIn.comment, function(err, results){
                if(err){
                    res.status(500).send("unable to add feedback now");
                }else{
                    res.status(200).send("Thank you for your feedback!");
                }
            });
        }
        
    });

    return router;
};

module.exports = routes();