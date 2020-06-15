$(document).ready(function () {
    $.ajax({
        url: "/events",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(event) {
                    var article = $("<article>");
                    article.append("<h2><a href='/edit?id="+event._id+"'>"+event.name + "</h2>");
                    var divElement = $("<div>");
                    divElement.append(event.description+"<br>");
                    divElement.append("Start: " + event.start.date + " " + event.start.time + "<br>");
                    divElement.append("End: " + event.end.date + " " + event.end.time + "<br>");
                    article.append(divElement);
                    $(".events").append(article);
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

    $(".addEvent").click(function () {
        $(".addNewEvent").show();
    })
})