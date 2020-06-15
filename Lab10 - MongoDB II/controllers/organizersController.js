var organizers = [
]
var organizersController = {
    getOrganizers: function() {
        return organizers;
    },
    addOrganizer: function(newOrganizer) {
        organizers.push(newOrganizer);
    }
};

module.exports=organizersController;