//post the fields to check for login
$(document).ready(function(){

    $("#submit").click(function(){
        var registerDetails = {
            username: $('#username').val(),
            password: $('#password').val(),
            email: $('#email').val(),
        };
        $.ajax({
    
            url: '/registration',
            method: 'post',
            data: registerDetails,
        }
        ).done(
            function(data){
                //console log input
                console.log(data);
                window.location.href="/";
            }
        ).fail(
            function(err){
                console.log(err.responseText);
            }
        );
    });
});
