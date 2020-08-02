var userId=0;
var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');
var count = 0;
var idlecount = 0;

$(document).ready(function () {

    $('.listenbutton').click(function(){
        if($(this).hasClass('listening')){
            postRecord();
            $(this).html('Start Listening').toggleClass('listening');
        }
        else{
            $(this).html('Stop Listening').toggleClass('listening');
            checkSensors();
            Test();
            TestButton();
        }

        //Need to clear intervals
    });
    
});

function checkSensors() {
    setInterval(
        function () {
            $.ajax({
                url: "http://192.168.1.145/arduino/posture/13",
                method: "get",
                dataType: "text",
            }).done(
                function (data) {
                    //Sample Data : 000breakSitting Duration: 0breakPosture Count: 0
                    var dataConverted = data.replace(/\D/g, '');
                    var sensors = dataConverted.slice(0,3); //gets 000
                    //var durationsubstring = data.substring(26);
                    //var duration = durationsubstring.slice(0,1)

                    if(sensors == "000"){
                        $('.notice h1').text("User is not sitting");
                    }
                    else if(sensors=="100"){
                        $('.notice h1').text("User is Slouching");
                    }
                    else if(sensors=="110"){
                        $('.notice h1').text("User is Slouching(Shoulder)");
                    }
                    else if(sensors == "101" || sensors=="111"){
                        $('.notice h1').text("User is Sitting Straight");
                    }

                }
            )
        }, 500
    );
}

function Test() {
    setInterval(
        function () {
            $.ajax({
                url: "http://192.168.1.145/arduino/analog/0",
                method: "get",
                dataType: "text",
            }).done(
                function (data) {

                    $('.strength').text(data);
                    var data2 = data.replace(/\D/g, '');
                    var data2 = data2.substring(1);
                    $('.strength').text("CURRENT STRENGTH "+data2);
                }
            )
        }, 1000
    );
}

function TestButton() {
    setInterval(
        function () {
            $.ajax({
                url: "http://192.168.1.145/arduino/digital/4",
                method: "get",
                dataType: "text",
            }).done(
                function (data) {
                    $('.test2 h1').text(data);
                    var data2 = data.replace(/\D/g, '');
                    var data2 = data2.substring(1);
                    if (data2 == "1") {
                        $('.test2 h2').text("Activated");
                        idlecount = 0;
                        count++;
                        $('.test2 h3').text(count.toString());
                    }
                    else {
                        $('.test2 h2').text("Not Activated");
                        idlecount++;
                        if (idlecount >= 300) {
                            idlecount = 0;
                            $('.test2 h3').text("Chair has Gone Idle");
                        }
                        else {
                            $('.test2 h3').text(idlecount.toString());
                        }
                    }

                }
            )
        }, 1000
    );
}

function postRecord(){
    var recordDetails = {
        userId: userId,
        duration: count,
        date: new Date(),
        postureCount: 123,
    };
    
    $.ajax({
        url:"/api/record",
        method: "post",
        data: recordDetails,
    }).done(
        function(data){

        }
    ).fail(
        function(err){
            console.log(err.responseText);
        }
    )
    
}