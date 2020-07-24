var bodyParser = require('body-parser');
var db = require('./services/dataservices.js');
var crypto = require('crypto');

db.connect();

var routes = function(){
    var router = require('express').Router();

    router.use(function(req,res,next){
        //if it is api request, then check for valid token
        if(req.url.includes("/api")) {
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
    router.post('/login', function(req,res){
        var data = req.body;
        console.log(data);
        db.findIfExisting(data.username, data.password, function(err, account){
            if(err){
                res.status(401).send("Login unseuccessful. Please try again later")
            }else{
                if(account == null){
                    res.status(401).send("Login unsucsesful. PLease try again later");
                }else{
                    var strToHash = account.username + Date.now();
                    var token = crypto.createHash('md5').update(strToHash).digest('hex');
                    var uid = account._id;
                    db.updateToken(account._id, token, function(err, user){
                       res.status(200).json({'message' : 'Login successful', 'token' : token}); 
                    });
                    res.redirect('/api/features');
                }
            }
        });
    });
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });

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
        db.getRecords(function(err, data){
            if(err){
                res.status(500).send("Unable to get records at this moment");
            }else{
                res.status(200).send(data);
            }
        });
    });
    //working
    router.get('/api/settings/:uid', function(req,res){
        var id = req.params.uid;
        db.getSettings(id, function(err, settings){
            if(err){
                res.status(500).send("Unable to find user settings at this moment");
            }else{
                res.status(200).send(settings);
            }
        })
    });
    //working
    router.get('/api/setting/:uid/:sid', function(req, res){
        var uid = req.params.uid;
        var sid = req.params.sid;
        db.getSetting(sid, uid, function(err, setting){
            if(err){
                res.status(500).send("Unable to get this setting at this moment");
            }else{
                res.status(200).send(setting);
            }
        })
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
    });

    router.get("/logout", function (req, res) {
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided");
        } else {
            db.checkToken(token, function (err, user) {
                if (err || user == null) {
                    res.status(401).send("Invalid token provided");
                } else {
                    db.updateToken(user._id, "", function (err, user) {
                        res.status(200).send("Logout successfully")
                    });
                }
            })
        }

    });

    //backend POST API
    //working, need to include bcrypt and passport to be more secure
    
    //working, need to include bcrypt and passport to be more secure
    router.post('/registration', function(req,res){
        
        db.addAccount(req.body.email, req.body.username, req.body.password, function(err, account){
            if(account){
                res.redirect('/');
            }else{
                res.status(500).send("unable to add user now");
            }
        });
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
    //working but need to change depending
    router.post('/api/setting', function(req, res){
        db.addSetting(req.body.userId, req.body.status, req.body.strength, function(err, setting){
            if(err){
                res.status(500).send("unable to add setting now");
            }else{
                res.status(200).send(setting);
            }
        });
    });

    //backend PUT API
    //working
    router.put('/api/setting/:uid', function(req, res){
        var uid = req.params.uid;
        var settingData = req.body;

        db.updateSetting(uid, settingData.strength, settingData.status, function(err, setting){
            if(err){
                res.status(500).send("unable to update setting now");
            }else{
                res.status(200).send(setting);
            }
        })
    });

    //backend DELETE API
    //working
    router.delete('/api/setting/:sid', function(req,res){
        var sid = req.params.sid;

        db.deleteSetting(sid, function(err, setting){
            if (err) {
                res.status(500).send("Unable to delete this setting");
            } else {
                res.status(200).send(setting);
                
            }
        })
    });

    return router;
};

module.exports = routes();