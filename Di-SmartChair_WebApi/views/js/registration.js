//post the fields to check for login
$(document).ready(function(){

    $("#submit").click(function(){
        var registerDetails = {
            username: $('#username').val(),
            password: $('#password').val(),
            email: $('email').val(),
        };
        $.ajax({
    
            url: '/register',
            method: 'post',
            data: registerDetails,
        }
        ).done(
            function(data){
                //console log input
                console.log(data);
            }
        ).fail(
            function(err){
                console.log(err.responseText);
            }
        );
    });
});
