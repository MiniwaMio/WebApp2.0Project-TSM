var userId=0;
$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $(".logoutbutton").click(function(e){
        //prevents the browser from navigating to "#", as defined by the <a href> tag
        e.preventDefault();
        
        $.ajax({
            url: "/logout?token="+sessionStorage.authToken,
            method:"get"
        })
        .done(function(data){
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userId");
            //go to homepage
            window.location.href="/";
        })
        .fail(function(err){
            console.log(err.responseText);
        })
    })

    $.ajax({
        url:"/api/chair/"+userId + "?token=" + sessionStorage.authToken,
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