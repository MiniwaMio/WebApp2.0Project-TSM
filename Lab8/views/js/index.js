$(document).ready(function () {
    $.ajax({
        url: "/events", //where i want to go - "http://whatip/events"
        method: "get" 
    })
    .done(
        function (data) { //when the server succeeded get the data
            data.forEach(function(event) {
                var article = $("<article>");
                article.append("<h2>" + event.name + "</h2>");
                var divElement = $("<div>");
                divElement.append(event.description+"<br>");
                divElement.append("Start: " + event.start.date + " " + event.start.time + "<br>");
                divElement.append("End: " + event.end.date + " " + event.end.time);
                article.append(divElement);
                $(".events").append(article);
});

        }
    )
    .fail(
        function (err) { //Server didn't respond
            console.log(err.responseText);
        }
    )
    $(".addEvent").click(function () {
        $(".addNewEvent").show();
    })

})
