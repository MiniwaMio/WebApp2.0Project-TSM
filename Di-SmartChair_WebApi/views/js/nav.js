var userId=0;
$(document).ready(function(){
 userId = sessionStorage.userId;
 $('.blue').append("<a href='/api/chair/id="+userId+"&token="+ sessionStorage.authToken +"'> CHAIR</a>")
 $('.blue').append("<a href='/api/data/id="+userId+"&token="+ sessionStorage.authToken +"'> DATA</a>")
 $('.blue').append("<a href='/api/features/id="+userId+"&token="+ sessionStorage.authToken +"'> FEATURES</a>")
 $('.blue').append("<a href='/api/feedback/id="+userId+"&token="+ sessionStorage.authToken +"'> FEEDBACK</a>")

 $('.databutton').wrap("<a href='/api/data/id="+userId+"&token="+ sessionStorage.authToken +"'></a>");
 $('.sittingbutton').wrap("<a href='/api/features/id="+userId+"&token="+ sessionStorage.authToken +"'></a>");
 $('.feedbackbutton').wrap("<a href='/api/feedback/id="+userId+"&token="+ sessionStorage.authToken +"'></a>");
 $('.logoutbutton').wrap("<a href='/api/logout/id="+userId+"&token="+ sessionStorage.authToken +"'></a>");
});