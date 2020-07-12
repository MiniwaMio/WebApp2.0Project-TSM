//receive all fields
var userId = 0;
$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url: "/data/"+userId,
        method:"get"
    }).done(
        function(data){
            $('#userid').text(data.userId);
            $('#username').text(data.name);
            $('#data').text(data.dataId);
            $('#duration').text(data.duration);
            $('#date').text(data.date);
            $('#posturecount').text(data.posturecount);
        }
    );

    //username
//sitting duration
//posture data
//battery life
//chair name
//what you can do to improve posture
});
