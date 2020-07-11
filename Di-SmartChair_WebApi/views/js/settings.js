var userId = 0;
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    $.ajax({
        url: "/settings/" + userId,
        method: "get"
    }).done(
        function (data) {
            data.forEach(function (settings) {
                $("#settingList").append("<li> Setting id: " + settings._id + "     Status:" + settings.status + "      Strength" + settings.strength + "</li>");
            });
        }
    );
});