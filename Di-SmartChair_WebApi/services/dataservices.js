var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var recordSchema = {};
var recordModel;
var userSchema = {};
var userModel;

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
                    userId: schema.Types.ObjectId,
                    duration: Number,
                    date: Date,
                    postureCount : Number,
                });
                userSchema = schema({
                    email : String,
                    username: String,
                    password : String,
                    token:String,
                });
                var connection = mongoose.connection;
                recordModel = connection.model("records", recordSchema);
                userModel = connection.model("users", userSchema);
            }else{
                console.log(err);
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addAccount: function(em, un, pw, callback){

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
    findIfExisting: function(em, pword, callback){
        userModel.findOne({email : em, password : pword}, callback)
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
    getUserRecords: function(uid, callback){
        //get your data (sort by date asc)
        recordModel.find({userId : ObjectId(uid)}, callback).sort({date : 1});
    },
    getOthersRecord: function(uid, callback){
        //find other's data to compare (sort by user -> date)
        recordModel.find({userId : {$ne : ObjectId(uid)}}, callback).sort({userId : 1, date : 1});
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        userModel.findOne({token:token},callback);
    }
};

module.exports = database;