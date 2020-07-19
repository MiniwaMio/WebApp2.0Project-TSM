var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var recordSchema = {};
var recordModel;
var userSchema = {};
var userModel;
var settingSchema = {};
var settingModel;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var database = {
    connect: function(){
        mongoose.connect('mongodb://localhost:27017/DiSmartChairDB', function(err){
            if(err == null){
                console.log("Connected to Mongo DB");
                //Initialised Values
                recordSchema = schema({
                    userId: String,
                    duration: Number,
                    date: Date,
                    postureCount : Number,
                });
                userSchema = schema({
                    email : String,
                    username: String,
                    password : String,
                });
                settingSchema = schema({
                    userId: String,
                    status: String,
                    strength : Number,
                });
                var connection = mongoose.connection;
                recordModel = connection.model("Record", recordSchema);
                userModel = connection.model("User", userSchema);
                settingModel = connection.model("Setting", settingSchema);
            }else{
                console.log(err);
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addAccount: function(em, un,pw,callback){
        var newUser = new userModel({
            email : em,
            username : un,
            password : pw
        });
        newUser.save(callback);
    },
    getAccount: function(id, callback){
        userModel.findById(id, callback);
    },
    findIfExisting: function(uname, pword, callback){
        userModel.findOne({username : uname, password : pword}, callback)
    },
    addRecord: function(uid, dura,Tdate, postC, callback){
        var newRecord = new recordModel({
            userId : uid,
            duration : dura,
            date : Tdate,
            postureCount : postC,
        });
        newRecord.save(callback);
    },
    getRecords: function(callback){
        recordModel.find({}, callback);
    },
    addSetting: function(uid, st, str,callback){
        var newSetting = new settingModel({
            userid : uid,
            status : st,
            strength : str
        });
        newSetting.save(callback);
    },
    getSettings: function(uid, callback){
        settingModel.find({userId : uid}, callback);
    },
    getSetting: function(sid, uid, callback){
        settingModel.find({_id : ObjectId(sid) , userId : uid}, callback);
    },
    updateSetting: function(sid,str,stats, callback){
        settingModel.updateOne({_id : ObjectId(sid)}, {strength : str, status : stats}, callback);
    },
    deleteSetting: function(sid, callback){
        settingModel.deleteOne({_id : ObjectId(sid)}, callback)
    },

    getName: function(uid,callback){
        userModel
    }
};

module.exports = database;