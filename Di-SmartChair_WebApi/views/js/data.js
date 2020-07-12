//receive all fields
var userId = 0;
$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url: "/api/data/"+userId,
        method:"get"
    }).done(
        function(data){
            if(data.length==0){
                $('$dataoutput').html("<h1>There is no data</h1>")
            }
            else{
                data.forEach(function(record) {
                    $('#dataoutput').append("<li>Duration: "+record.duration+"</br>Posture Count: "+record.postureCount+"</br> Date: "+record.date+"</br>"+"</li>");
                });
            }
            
            
            console.log(data);
        }
    ).fail(
        function(err){
            console.log(err.responseText);
        }
    );

    //username
//sitting duration
//posture data
//battery life
//chair name
//what you can do to improve posture
});
