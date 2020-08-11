var userId = 0;
var urlParams = new URLSearchParams(window.location.search);
userId = urlParams.get('id');
var count;
var postureCount;


function to_start() {

    switch (document.getElementById('btn').value) {
        case 'Stop':
            postRecord();
            window.clearInterval(tm); // stop the timer 
            document.getElementById('btn').value = 'Start';
            $('#btn').html('Start Listening');
            break;
        case 'Start':
            tm = window.setInterval('listen()', 1000);
            document.getElementById('btn').value = 'Stop';
            $('#btn').html('Stop Listening');
            break;
    }
}

function postRecord() {
    var recordDetails = {
        userId: userId,
        duration: count,
        date: new Date(),
        postureCount: postureCount,
    };

    $.ajax({
        url: "/api/record?token=" + sessionStorage.authToken,
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

function listen() {
    $.ajax({
        url: "http://192.168.1.145/arduino/posture/13",
        method: "get",
        dataType: "text",
    }).done(
        function (data) {
            //Sample Data : 000breakSitting Duration: 0breakPosture Count: 0
            var dataConverted = data.replace(/\D/g, '');
            var sensorsubstring = data.substring(19)
            var sensors = sensorsubstring.slice(0, 3); //gets 000

            //get the detection every 30 secs
            var secSensorSubstring = sensorsubstring.substring(27);
            var secSensor = secSensorSubstring.slice(0,3)

            var countsubstring = secSensorSubstring.substring(19);
            count = countsubstring.slice(1);

            postureCount =countsubstring.substring(22);  

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

        }
    ).fail(
        function () {
            $('.notice h1').text("Chair is not connected!")
        }
    )

}