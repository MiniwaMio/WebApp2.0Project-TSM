//post the fields to check for login

$(document).ready(function(){
    var token = sessionStorage.authToken;
});
//validate
function login() {
    var credentials = {
        username: $('#username').val(),
        password: $('#password').val()
        
    }
    $.ajax({
        url:'/login',
        method:'post',
        data:credentials
    })
    .done(function(data){
        console.log(data);
        $('.statusMessage').text(data.message);
  //stores the token returned from the server, if successful login
        sessionStorage.authToken=data.token; 
        sessionStorage.setItem('userId', data.uid);
    })
    .fail(function(err){
        $('.statusMessage').text(err.responseText);
    })

    return false;
}
