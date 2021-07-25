import React from 'react';


function TimeWork(id) {
  var time = null;
  var days = [];
  const SEC = 1000;
  const MIN = 60 * SEC;
  const HOUR = 60 * MIN;
  var defaultInterval = 2*HOUR; //default time interval

  //main workings

  //get the info for the alarm that should ring
  for(var i in localStorage){
    if(localStorage.hasOwnProperty(i)){
      if(JSON.parse(localStorage[i])['type'] === "alarm") {
        if (JSON.parse(localStorage[i])['id'] === id) {
          time = JSON.parse(localStorage[i])['time'];
          days.push(JSON.parse(localStorage[i])['days']);
        }
      }
    }
  }
  

function getCurDate() {
  var mydate = new Date();

  //don't really need this stuff, unless want to display it
  var year = mydate.getFullYear();
  var month = mydate.getMonth() + 1; //month starts from 0
  var daydate = mydate.getDate();
  var displayDate = year + '/' + month + '/' + daydate;

  var day = mydate.getDay(); //need 

  return(day);
}

function getCurTime() {
    var mydate = new Date();
    var hours = mydate.getHours().toString();
    var minutes = mydate.getMinutes().toString();
    if (hours.length == 1) {
      hours = "0" + hours;
    }
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    var displayTime = hours + ":" + minutes;
    console.log(hours);
    return(displayTime)
}

//calculates the interval until the next day
function waitNextDay(cur) {
  var interval;

  //set interval to the difference between now and the next day
  interval = (24 - parseInt(cur.toString().substring(0,2))) * HOUR;
  interval += (59 - parseInt(cur.toString().substring(3,5))) * MIN;

  return(interval);
}
var hi = 0;
//compares current date and time with call date and time
function compareAlarm() {

  console.log("entered compareAlarm");
  console.log(hi);
  hi += 1;
  var isEqual = false;
  var today = false;
  var interval = 0;
  var hourDif, minDif;
  //get current date and time
  var curTime = getCurTime();
  var curDay = getCurDate();
  time = "00:43";

  //check if date is correct
  console.log(curTime.toString())
  if (days.length === 0) {
    today = true;
  } else {
    for(var i; i < days.length; i++) {
      if (days[i] == curDay) {
        today = true;
      }
    }
  }
  //set interval for if today==false
  if (!today) {
    //set interval to the difference between now and the next day
    //interval = waitNextDay(curTime);
    console.log(curTime.toString().substring(3,5));
  } 
  //day aligns, check if time also aligns
  else if (curTime.toString().substring(0,2) == time.toString().substring(0,2) && curTime.toString().substring(3,5) == time.toString().substring(3,5)) {
    isEqual = true;
  }
  console.log(isEqual);
  //ring or not
  if (isEqual) {
    console.log("ring");
  } else {
    hourDif = parseInt(time.toString().substring(0,2)) - parseInt(curTime.toString().substring(0,2));
    minDif = parseInt(time.toString().substring(3,5)) - parseInt(curTime.toString().substring(3,5));

    console.log(hourDif);
    console.log(minDif);

    if (hourDif > 1) { 
      interval = (hourDif - 1) * HOUR; //if more than 1 hour until alarm ring, don't check again until 1 hour left.
    } else if (hourDif < 0) {
      interval = waitNextDay(curTime); //if alarm ring has already passed then don't check until next day
      console.log(curTime);
    } else { //hour is correct
      if (minDif > 10) {
        interval = 10 * MIN;
      } else if (minDif < 0) {
        interval = waitNextDay(curTime);
        console.log(curTime);
      } else {
        interval = 1 * MIN;
      }
    }
  }
  console.log(interval);
  return (interval);
}
//at the moment alarm only ever rings once
function callCompareOld(interval) {
  var on = true;
  var newInterval;
  console.log("hi")
  compareAlarm();

  do {
    newInterval = compareAlarm();
    if (newInterval == 0) {
      on = false;
    }
    else {
    setTimeout(() => {
      callCompare();
    }, newInterval);
  } 
  } while (1==0);
  return("callCompare");
}

function callCompare() {
  var newInterval = defaultInterval;
  console.log("hi")
  newInterval = compareAlarm();
  if (newInterval == 0) {}
  else {
    setTimeout(() => {
      callCompare();
    }, newInterval);
  } 
  return("callCompare");
}

//callCompare(defaultInterval);
var hello = 5;
return (//<p>hello</p>
callCompare()
  // <div>
  //   {
  //   function() {
  //     if (localStorage.length != 0) 
  //     {callCompare(defaultInterval)}}
  //   }
  // </div>
);
}

export default TimeWork;