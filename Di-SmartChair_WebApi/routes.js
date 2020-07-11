var bodyParser = require('body-parser');
var db = require('./services/dataservices.js');

db.connect();

var routes = function(){
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
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

    router.get('/data', function(req, res){
        res.sendFile(__dirname + "/views/data.html");
    });

    router.get('/settings', function(req,res){
        res.sendFile(__dirname + "/views/settings.html");
    });

    router.get('/features', function(req,res){
        res.sendFile(__dirname + "/views/features.html");
    });
    
    router.get('/feedback', function(req,res){
        res.sendFile(__dirname + "/views/feedback.html");
    });

    router.get('/chair', function(req,res){
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

    //backend POST API
    router.post('/api/registration', function(req,res){
        db.addAccount(req.body.email, req.body.username, req.body.password, function(err, account){
            if(err){
                res.status(500).send("unable to add user now");
            }else{
                res.status(200).send(account);
            }
        });
    });
    
    router.post('/api/record', function(req,res){
        db.addRecord(req.body.userId, req.body.duration, req.body.date, req.body.postureCount, function(err,record){
            if(err){
                res.status(500).send("unable to record now");
            }else{
                res.status(200).send(record);
            }
        });
    });

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

    router.delete('/api/setting/:sid', function(req,res){
        var uid = req.params.uid;

        db.deleteSetting(uid, function(err, setting){
            if (err) {
                res.status(500).send("Unable to delete this setting");
            } else {
                res.status(200).send("setting");
                
            }
        })
    });

    return router;
};

module.exports = routes();