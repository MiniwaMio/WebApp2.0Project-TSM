//receive all fields
var userId = 0;
$(document).ready(function(){
    userId = sessionStorage.getItem("userId");
    
    $.ajax({
        url: "/api/data/"+userId+ "?token=" + sessionStorage.authToken,
        method:"get"
    }).done(
        function(data){
            if(data.length==0){
                $('#dataoutput').html("<h1>There is no data</h1>")
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

    //sets data to canvas
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor:'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
    });

    //username
//sitting duration
//posture data
//battery life
//chair name
//what you can do to improve posture
});
