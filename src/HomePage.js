import React, { useState } from 'react';
//import RingtonePopup from "./RingtonePopup.js";
import SoundPopup from "./SoundPopup.js";
import NewAlarm from "./NewAlarm.js";
import TimeWork from './TimeWork'
import Time from './edit-alarm/Time.js';
import Header from './edit-alarm/Header.js';

//need to map
//e.preventDefault not to reload 

/* 
** add edit alarm --> when you click on the alarm info, leads to edit alarm 
maybe have an edit alarm button that makes the alarms edit-able 
when clicking on the edit alarm, there should be a delete button 
add an option called sound --> the sound for the alarm (ex: Radar )
*/

// ** NOT FINISHED GETTIME
function GetTime() {
  var currentData = new Date()
  var currentHour = currentData.getHours()
  var currentMinute = currentData.getMinutes()
  //should get current device time
  return(currentHour + ":" + currentMinute)
}

function HomePage({onClick}) {
  const date = new Date();
  const AM = "am";
  const PM = "pm";

  function UploadAlarm() {
    var arrayOfValues = [];
    for(var i in localStorage){
        if(localStorage.hasOwnProperty(i)){
            if(JSON.parse(localStorage[i])['type'] === "alarm") {
                arrayOfValues.push(JSON.parse(localStorage[i]));
            }
        }
    }
    return (
        arrayOfValues
    )
    // ** collect all the alarms in local storage (for loop, check if type === alarm)
    // copy Form.js creatSongList function 
  }

  const [alarms, setAlarms] = useState(UploadAlarm())
  
  //sets alarm array to what has been inputed into it
  //should code check for all alarm info being present

  // ** not necessary SETALARMARRAY 
  // function SetAlarmArray(arr) {
  //   setAlarms(arr);
  //   AlarmSort();
  // }

  function DisplayAlarms() {
    // for alarms.map, all the k.name will have to change (id, label, power, repeat, snooze, snoozeSound, snoozeTime, sound, time, type)
    return(
      <div>
        {alarms.map((k) => ( //k is an alarms object
          <div>
            <div id="alarmName">Alarm Name: {k.label}</div>
            <div id="alarmTime">Time: {k.time}</div>
            <div id="alarmDays">{DaysDisplay(k.id)}</div>
            <button id="alarmPower"
              key={k.id}
              onClick={(e) => PowerClick(k.id, e)}
            > 
              {k.power}
            </button>
          </div>
         ))
        }
      </div>
    );
  }

  //displays days for which alarm rings
  function DaysDisplay(id) {
    var ind = alarms.findIndex((i) => i.id === id);
    var days = alarms[ind].repeat;
    var display = '';
    var days_lst = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var curTime; //obtain current time -> how much to update, when -> hopefully not consuming

    //if alarm set to ring once, then displays today/tomorrow depending on current time
    if (days.length === 0) {
      curTime = GetTime();
      if (CompareAlarms(curTime, alarms[ind].time) === curTime) {
        display = "Today"
      } else {
        display = "Tomorrow"
      }
    } 
    //if set to ring repeatedly, then displays days of ringing
    else {
      for(var i in days) {
        let n = parseInt(days[i])
        display += days_lst[n-1] + " ";
      }
    }

    return(
      <div>
      Rings: {display}
      </div>
    );
  }
  
  function PowerClick(id, e) {
    AlarmSort(); // ** check where to call ALARMSORT
    var ind = alarms.findIndex((i) => i.id === id);
    let s = JSON.parse(localStorage.getItem(id))

    if (s['power'] === "on") {
      s['power'] = "off";
    } else {
      s['power'] = "on"
    }

    localStorage.setItem(id, JSON.stringify(s))

    setAlarms(
      [...alarms.slice(0, ind), s, ...alarms.slice(ind+1)]
    )
    e.preventDefault();
  }

  //sorts alarms based on time, selection sort
  function AlarmSort() {
    var small;
    var compare;
    var ind = -1;
    var temp;
    for (let i = 0; i < alarms.length -1; i++) { 
      small = alarms[i].time; 
      for (let j = i+1; j < alarms.length; j++) { 
        compare = CompareAlarms(small, alarms[j].time);
        if (small !== compare) { 
          small = compare;
          ind = j;
        }
      }

      if (small !== alarms[i].time) {
        temp = alarms[ind];
        alarms[ind] = alarms[i];
        alarms[i] = temp;
      }
    }
  }

  //compares two alarms which are am-pm version clock, returns the smaller of the two. might recode to 24-hour.
  function CompareAlarms(alm1, alm2) {
    let small = null;
    if (alm1.toString().substring(5) !== alm2.toString().substring(5)) {
      if (alm1.toString().substring(5) === PM) {
        small = alm2;
      } else {
        small = alm1;
      }
    } else {
      if (alm1.toString().substring(0,2) > alm2.toString().substring(0,2)) {
        small = alm2;
      } else if (alm2.toString().substring(0,2) > alm1.toString().substring(0,2)) {
        small = alm1;
      } else {
        if (alm1.toString().substring(3,5) > alm2.toString().substring(3,5)) {
          small = alm2;
        } else if (alm2.toString().substring(3,5) >= alm1.toString().substring(3,5)) {
          small = alm1;
        }
      }
    }
    console.log(small);
    return small;
  }

  function Header({ClickAddAlarm}) {
    return(
      <div id="header-allAlarms">
        <h1>Alarm</h1>
        <button onClick={ClickAddAlarm}>Add Alarm</button> 
        <p>{date.time}</p>
      </div>
    );
  }

  function Body() {
    return(
      <div>
      <DisplayAlarms />
      </div>
    );
  }

  // ** not sure if this is necessary 
  // function addAlarm(alarm) {
  //   setAlarms([alarm, ...alarms]);
  // }

  // ** make sure that Times works 
  return (
    <div>
      <Header ClickAddAlarm={() => onClick('New Alarm')} />
      <Body />
      <TimeWork />
    </div>
  );
}

//getItem setItem local storage
//jSON stringify jSON.parse()
export default HomePage;
export {GetTime};