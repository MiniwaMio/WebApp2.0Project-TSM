console.log("Starting calculator app");

module.exports = {
    description : "This is my calculator",
    add : function(a,b) {
        return a+b;
    },
    multiply: function(a,b) {
        return a*b;
    },
    subtract: function(a,b) {
        return a-b;
    },
    divide: function(a,b) {
        return a/b;
    }
};