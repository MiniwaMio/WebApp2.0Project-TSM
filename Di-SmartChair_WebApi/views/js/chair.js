var userId=0;
$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url:"/api/chair/"+userId,
        method:"get"
    }).done(
        function(data){
            $("#welcome").text("Welcome Back "+data.username);
        }
    ).fail(
      function(err){
          console.log(err.responseText);
      }  
    );
});