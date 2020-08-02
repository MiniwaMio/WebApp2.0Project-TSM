var userId = 0;
var urlParams = new URLSearchParams(window.location.search);
userId = urlParams.get('id');
var count = 0;
var idlecount = 0;
var startListenVar;

$(document).ready(function () {

    $('.listenbutton').click(function () {
        //When stop listening
        if ($(this).hasClass('listening')) {
            $(this).html('Start Listening').toggleClass('listening');
            stopListening();
            postRecord();
        }
        else {
            //When Listening
            $(this).html('Stop Listening').toggleClass('listening');
            var startListenVar = setInterval(startListen, 1000);
        }

        //Need to clear intervals
    });

});

function postRecord() {
    var recordDetails = {
        userId: userId,
        duration: count,
        date: new Date(),
        postureCount: 123,
    };

    $.ajax({
        url: "/api/record",
        method: "post",
        data: recordDetails,
    }).done(
        function (data) {

        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    )

}

function startListen() {
    $.ajax({
        url: "http://192.168.1.145/arduino/posture/13",
        method: "get",
        dataType: "text",
    }).done(
        function (data) {
            //Sample Data : 000breakSitting Duration: 0breakPosture Count: 0
            var dataConverted = data.replace(/\D/g, '');
            var sensors = dataConverted.slice(0, 3); //gets 000
            //var durationsubstring = data.substring(26);
            //var duration = durationsubstring.slice(0,1)

            if (sensors == "000") {
                $('.notice h1').text("User is not sitting");
            }
            else if (sensors == "100") {
                $('.notice h1').text("User is Slouching");
            }
            else if (sensors == "110") {
                $('.notice h1').text("User is Slouching(Shoulder)");
            }
            else if (sensors == "101" || sensors == "111") {
                $('.notice h1').text("User is Sitting Straight");
            }
            console.log(startListenVar);

        }
    )

}

function stopListening() {
    clearInterval(startListenVar);
}