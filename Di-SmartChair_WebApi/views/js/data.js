//receive all fields
var userId = 0;
$(document).ready(function () {
    userId = sessionStorage.getItem("userId");


    //Get the data and put in the graph
    $.ajax({
        url: "/api/data/" + userId + "?token=" + sessionStorage.authToken,
        method: "get"
    }).done(
        function (data) {
            if (data.length == 0) {
                $('.data').hide();
            }
            else {

                
                //Daily Pie Chart
                new Chart(document.getElementById("myDoughnutChart"), {
                    type: 'doughnut',
                    data: {
                        labels: ["Straight", "Slouching"],
                        datasets: [
                            {
                                label: "Sitting Posture(Latest)",
                                backgroundColor: ["#3e95cd", "#8e5ea2"],
                                data: [data[data.length - 1].duration - data[data.length - 1].postureCount, data[data.length - 1].postureCount]
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Latest Posture'
                        }
                    }
                });

                if (data.length >= 7) {
                    //Weekly Bar Chart
                    var ctx = document.getElementById('myChart');
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: [data[data.length - 1].date.slice(0, 10), data[data.length - 2].date.slice(0, 10), data[data.length - 3].date.slice(0, 10), data[data.length - 4].date.slice(0, 10), data[data.length - 5].date.slice(0, 10), data[data.length - 6].date.slice(0, 10), data[data.length - 7].date.slice(0, 10)],
                            datasets: [{
                                label: 'Sitting Duration(Min)',
                                data: [(data[data.length - 1].duration) / 60, (data[data.length - 2].duration) / 60, (data[data.length - 3].duration) / 60, (data[data.length - 4].duration) / 60, (data[data.length - 5].duration) / 60, (data[data.length - 6].duration) / 60, (data[data.length - 7].duration) / 60],
                                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Weekly Sitting Duration'
                            }
                        }
                    });

                    //Weekly Pie Chart
                    var oneWeekSittingDuration = data[data.length - 1].duration + data[data.length - 2].duration + data[data.length - 3].duration + data[data.length - 4].duration + data[data.length - 5].duration + data[data.length - 6].duration + data[data.length - 7].duration;
                    var oneWeekPostureCount = data[data.length - 1].postureCount + data[data.length - 2].postureCount + data[data.length - 3].postureCount + data[data.length - 4].postureCount + data[data.length - 5].postureCount + data[data.length - 6].postureCount + data[data.length - 7].postureCount;
                    new Chart(document.getElementById("myWeeklyDoughnutChart"), {
                        type: 'doughnut',
                        data: {
                            labels: ["Straight", "Slouching"],
                            datasets: [
                                {
                                    label: "Sitting Posture(Last 7 Entries)",
                                    backgroundColor: ["#3e95cd", "#8e5ea2"],
                                    data: [oneWeekSittingDuration - oneWeekPostureCount, oneWeekPostureCount]
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Last 7 Entries'
                            }
                        }
                    });
                }
                else {
                    $('weekly').html('Not Enough Data For Weekly Report')
                }



                //Monthly Pie Chart
                if (data.length >= 30) {
                    var MonthlySittingDuration = data[data.length - 1].duration + data[data.length - 2].duration + data[data.length - 3].duration + data[data.length - 4].duration + data[data.length - 5].duration + data[data.length - 6].duration + data[data.length - 7].duration + data[data.length - 8].duration + data[data.length - 9].duration + data[data.length - 10].duration + data[data.length - 11].duration + data[data.length - 12].duration + data[data.length - 13].duration + data[data.length - 14].duration + data[data.length - 15].duration + data[data.length - 16].duration + data[data.length - 17].duration + data[data.length - 18].duration + data[data.length - 19].duration + data[data.length - 20].duration + data[data.length - 21].duration + data[data.length - 22].duration + data[data.length - 23].duration + data[data.length - 24].duration + data[data.length - 25].duration + data[data.length - 26].duration + data[data.length - 27].duration + data[data.length - 28].duration + data[data.length - 29].duration + data[data.length - 30].duration;
                    var MonthlyPostureCount = data[data.length - 1].postureCount + data[data.length - 2].postureCount + data[data.length - 3].postureCount + data[data.length - 4].postureCount + data[data.length - 5].postureCount + data[data.length - 6].postureCount + data[data.length - 7].postureCount + data[data.length - 8].postureCount + data[data.length - 9].postureCount + data[data.length - 10].postureCount + data[data.length - 11].postureCount + data[data.length - 12].postureCount + data[data.length - 13].postureCount + data[data.length - 14].postureCount + data[data.length - 15].postureCount + data[data.length - 16].postureCount + data[data.length - 17].postureCount + data[data.length - 18].postureCount + data[data.length - 19].postureCount + data[data.length - 20].postureCount + data[data.length - 21].postureCount + data[data.length - 22].postureCount + data[data.length - 23].postureCount + data[data.length - 24].postureCount + data[data.length - 25].postureCount + data[data.length - 26].postureCount + data[data.length - 27].postureCount + data[data.length - 28].postureCount + data[data.length - 29].postureCount + data[data.length - 30].postureCount;
                    new Chart(document.getElementById("myMonthlyDoughnutChart"), {
                        type: 'doughnut',
                        data: {
                            labels: ["Straight", "Slouching"],
                            datasets: [
                                {
                                    label: "Sitting Posture(Latest)",
                                    backgroundColor: ["#3e95cd", "#8e5ea2"],
                                    data: [MonthlySittingDuration - MonthlyPostureCount, MonthlyPostureCount]
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Latest Posture'
                            }
                        }
                    });
                } else {
                    $('.myMonthlyDoughnutChart').hide();
                    $('.monthly').html('<h1>Not Enough Data For Monthly</h1>')
                }

            }
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    //username
    //sitting duration
    //posture data
    //battery life
    //chair name
    //what you can do to improve posture
});
