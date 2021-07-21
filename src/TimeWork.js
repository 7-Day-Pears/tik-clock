import React from 'react';


function TimeWork(alarmsId) {
  var alarm = null;

  function GetAlarmTime(id) {
    for(var i in localStorage){
      if(localStorage.hasOwnProperty(i)){
          if(JSON.parse(localStorage[i])['type'] === "alarm") {
              if (JSON.parse(localStorage)['id'] === id) {
                alarm = JSON.parse(localStorage[i])['time'];
              }
          }
      }
    }
    
    return(alarm)
  }

function GetCurDate() {
  var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1; //month starts from 0
    var day = mydate.getDate();
    var displayDate = year + '/' + month + '/' + day;

    return(
      <p>{displayDate}</p>
    );
}

function GetCurTime() {
    var mydate = new Date();
    var hours = mydate.getHours();
    var minutes = mydate.getMinutes();
    /*if (hours.length == 1) {
      hours = "0" + hours;
    }
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }*/
    var displayTime = hours + ":" + minutes;

    return(displayTime)
}

function CompareAlarmTime() {
  var isEqual = true;
  var curTime = GetCurTime();
  var alarm = GetAlarmTime();
  var interval = 0;
  
  if (curTime.toString.substring(0,2) !== alarm.toString.substring(0,2)) {
    isEqual = false;
  } else if (curTime.toString.substring(3,5) !== alarm.toString.substring(3,5)) {
    isEqual = false;
  }

  if (isEqual) {
    console.log("ring");
  } else {
    if (Math.abs(parseInt(curTime.toString.substring(0,2)) - parseInt(curTime.toSubstring.substring(0,2))) >= 1) {
      interval = 120;
    } else if (Math.abs(parseInt(curTime.toString.substring(3,5)) - parseInt(curTime.toSubstring.substring(3,5))) > 10) {
      interval = 10;
    } else {
      interval = 1;
    }
  }

  return (interval);
}

function CallCompare(interval) {
  var on = true;
  var newInterval;
  do {
    newInterval = CompareAlarmTime();
    if (newInterval == 0) {
      on = false;
    }
    else if (newInterval * 1000 !== interval) {
      CallCompare(newInterval);
    }
    else {
    setTimeout(function(){
      CompareAlarmTime();
    }, interval);
  } 
  } while (on);
}

return (
  <div>
  <GetCurTime />
  <GetAlarmTime />
  </div>
);
}

export default TimeWork;