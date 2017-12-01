timer();
// tomorrow();
// sevenDays();

//SET CHALLENGE DATE INPUT MIN ATTRIBUTE
function tomorrow(){
    var tomorrow = new Date();
    var numberOfDaysToAdd = 1;
    tomorrow.setDate(tomorrow.getDate() + numberOfDaysToAdd); 
    
    var dd = tomorrow.getDate();
    var mm = tomorrow.getMonth() + 1;
    var yyyy = tomorrow.getFullYear();

    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    
    var formattedTomorrow = yyyy+'-'+mm+'-'+dd;

    document.getElementById("challengeDate").setAttribute("min", formattedTomorrow);
}

//SET CHALLENGE DATE INPUT MAX ATTRIBUTE
function sevenDays(){
    var sevenDays = new Date();
    var numberOfDays = 7;
    sevenDays.setDate(sevenDays.getDate() + numberOfDays); 
    
    var dd = sevenDays.getDate();
    var mm = sevenDays.getMonth() + 1;
    var yyyy = sevenDays.getFullYear();

    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    
    var formattedSevenDays = yyyy+'-'+mm+'-'+dd;

    document.getElementById("challengeDate").setAttribute("max", formattedSevenDays);
}

//COUNTDOWN TIMER

function timer() {
    var currentTime = Date.now();
    var endTime = new Date(2017, 11, 25).getTime();

    var remainingTime = endTime - currentTime;

    var sec  = Math.floor (remainingTime / 1000);
    var min  = Math.floor (sec / 60);
    var hour = Math.floor (min / 60);  
    var day = Math.floor (hour / 24);

    sec %= 60;
    min %= 60;
    hour %= 24;

    document.querySelector(".day").textContent = "Days: " + day;
    document.querySelector(".hour").textContent = "Hours: " + hour;
    document.querySelector(".min").textContent = "Min: " + min;
    document.querySelector(".sec").textContent = "Sec:" + sec;
    
    setTimeout(timer, 1000);
}
                     
//CHALLENGES API REQUEST
var data;
var xhr = new XMLHttpRequest();
xhr.open ("GET", "http://localhost:3000/api/challenges");
xhr.onload = function() {
    data = JSON.parse(xhr.responseText);
    console.log(data[0].date);
};
xhr.send();