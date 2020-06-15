const express= require('express');
const app = express();
const port = 3000;

var routes = require('./routes.js');
app.use('/',routes);

var calculator = require("./calculator.js");
app.listen(port, function(){
    console.log('Server started on port ' + port);
});


 