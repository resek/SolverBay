var challengeDate = document.querySelectorAll(".challengeDate");
var spanDay = document.querySelectorAll(".day");
var textDay = document.querySelectorAll(".textDay");
var spanHour = document.querySelectorAll(".hour");
var spanMin = document.querySelectorAll(".min");
var spanSec = document.querySelectorAll(".sec");
var challengeDateInput = document.getElementById("challengeDateInput");


//COUNTDOWN TIMER
var dateString;
var dateStringArr = [];

for (var i = 0; i < challengeDate.length; i++) {
    dateString = challengeDate[i].textContent;
    dateStringArr.push(dateString);
}

for (var i = 0; i < challengeDate.length; i++) {
    (function(i) {

        var timer = setInterval(function() {
            var currentTime = Date.now();
            var endTime = new Date(dateStringArr[i]).getTime();
            var remainingTime = endTime - currentTime;            
        
            var sec  = Math.floor (remainingTime / 1000);
            var min  = Math.floor (sec / 60);
            var hour = Math.floor (min / 60);  
            var day = Math.floor (hour / 24);
        
            sec %= 60;
            min %= 60;
            hour %= 24;
        
            if(hour<10){
                hour='0'+hour
            } 
            if(min<10){
                min='0'+min
            }
            if(sec<10){
                sec='0'+sec
            }
            if (remainingTime < 86400000) {
                spanDay[i].style.display = "none";
                textDay[i].style.display = "none";
                spanHour[i].textContent = hour;
                spanMin[i].textContent = min;
                spanSec[i].textContent = sec;  
            } else {
                spanDay[i].textContent = day;
                spanHour[i].textContent = hour;
                spanMin[i].textContent = min;
                spanSec[i].textContent = sec;
            }

            if(remainingTime <= 0) {
                spanHour[i].textContent = "00";
                spanMin[i].textContent = "00";
                spanSec[i].textContent = "00";
                clearInterval(timer);                                
            }
        });    
    })(i);
}  

//SET CHALLENGE DATE INPUT MIN ATTRIBUTE
tomorrow();
function tomorrow(){
    if (challengeDateInput != null) {
        var tomorrow = new Date();
        var numberOfDaysToAdd = 2;
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
    
        challengeDateInput.setAttribute("min", formattedTomorrow);
    }    
}

//SET CHALLENGE DATE INPUT MAX ATTRIBUTE
sevenDays();
function sevenDays(){
    if (challengeDateInput != null) {
        var sevenDays = new Date();
        var numberOfDays = 8;
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
    
        challengeDateInput.setAttribute("max", formattedSevenDays);
    }    
}

