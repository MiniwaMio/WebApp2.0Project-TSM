$(document).ready(function(){
    checkButt();
    checkLowerBack();
    checkUpperBack();
});

function checkButt(){
    setInterval(
        function(){
            $.ajax({
                url:"http://192.168.1.195/arduino/digital/5",
                method:"get",
                dataType:"text",
            }).done(
                function(data){
                    if(data == "1"){
                        console.log(data);
                        //use DOM to show that butt is on
                        //call another ajax to update value in database
                    }
                    else if(data=="0"){
                        console.log(data);
                        //use DOM to show that the butt is off
                        //call another ajax to update value in database
                    }
                }
            )
        },500
    );
}

function checkLowerBack(){
    setInterval(
        function(){
            $.ajax({
                //need change the last digit to the digital port
                url:"http://192.168.1.195/arduino/digital/5",
                method:"get",
                dataType:"text",
            }).done(
                function(data){
                    if(data == "1"){
                        console.log(data);
                        //use DOM to show that lower back is on
                        //call another ajax to update value in database
                    }
                    else if(data=="0"){
                        console.log(data);
                        //use DOM to show that the lower back is off
                        //call another ajax to update value in database
                    }
                }
            )
        },500
    );
}

function checkUpperBack(){
    setInterval(
        function(){
            $.ajax({
                //need change the port to the input of upper back
                url:"http://192.168.1.195/arduino/digital/5",
                method:"get",
                dataType:"text",
            }).done(
                function(data){
                    if(data == "1"){
                        console.log(data);
                        //use DOM to show that upper back is on
                        //call another ajax to update value in database
                    }
                    else if(data=="0"){
                        console.log(data);
                        //use DOM to show that the upperback is off
                        //call another ajax to update value in database
                    }
                }
            )
        },500
    );
}