var userId=0;
$(document).ready(function(){
 var urlParams = new URLSearchParams(window.location.search);
 userId = urlParams.get('id');
 $('.blue').append("<a href='/chair?id="+userId+"'> CHAIR</a>")
 $('.blue').append("<a href='/data?id="+userId+"'> DATA</a>")
 $('.blue').append("<a href='/features?id="+userId+"'> FEATURES</a>")
 $('.blue').append("<a href='/feedback?id="+userId+"'> FEEDBACK</a>")

 $('.databutton').wrap("<a href='/data?id="+userId+"'></a>");
 $('.sittingbutton').wrap("<a href='/features?id="+userId+"'></a>");
 $('.feedbackbutton').wrap("<a href='/feedback?id="+userId+"'></a>");
 $('.logoutbutton').wrap("<a href='/logout?id="+userId+"'></a>");
});