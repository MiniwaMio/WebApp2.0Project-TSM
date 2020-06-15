var events = [
    {
        name:"Event 1",
        description:"This is event 1",
        start: 
        {
            date: "28-03-2020",
            time: "10:00"
        },
        end: {
            date: "28-03-2020",
            time: "12:00"
        }
    },
    {
        name:"Event 2",
        description:"This is event 2",
        start: 
        {
            date: "15-04-2020",
            time: "14:30"
        },
        end: {
            date: "15-04-2020",
            time: "18:00"
        }
    }
]

var eventsController = {
    getEvents: function() {
        return events;
    },
    addEvent: function(newEvent) {
        events.push(newEvent);
    }
};

module.exports=eventsController;
