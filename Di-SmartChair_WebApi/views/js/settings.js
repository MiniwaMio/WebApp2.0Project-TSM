var userId = 0;
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url: "api/settings/" + userId,
        method: "get"
    }).done(
        function (data) {
            data.forEach(function (settings) {
                $("#settingList").append("<a href='/api/setting/" + userId + "/" + settings._id + "'><li> Setting id: " + settings._id + "     Status:" + settings.status + "      Strength" + settings.strength + "</li>");
            });
        }
    );
});

function test() {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    //JSON object that keeps setting fields

    $.ajax({
        url: "/api/setting/" + userId,
        method: 'put',
        //
    }).done(
        function(data){
            alert("Setting has been updated")
        }
    ).fail(
        function(err){
            console.log(err.responseText);
        }
    );
    return false;
}

function Delete(){
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax(
        {
            url:'/api/setting/', //need to add setting id
            method:'delete'
        }
    ).done(
        function(data){
            alert("Setting Deleted");
            window.location.href="/settings/"+userId
        }
    ).fail(
        function(err){
            console.log(err.responseText);
        }
    )
}

