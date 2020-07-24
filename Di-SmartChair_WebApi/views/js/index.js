//post the fields to check for login
$(document).ready(function(){

    $("#submit").click(function(){
        var loginDetails = {
            username: $('#username').val(),
            password: $('#password').val(),
        };
        $.ajax({
    
            url: '/login',
            method: 'post',
            data: loginDetails,
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
