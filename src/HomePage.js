import React, { useState } from 'react';
//import RingtonePopup from "./RingtonePopup.js";
import SoundPopup from "./SoundPopup.js";
import NewAlarm from "./NewAlarm.js";

//need to map
//e.preventDefault not to reload 

// ** NOT FINISHED GETTIME
function GetTime() {
  //should get current device time
  return(
    <div>
      07:00am
    </div>
  )
}

function HomePage() {
  const date = new Date();
  const AM = "am";
  const PM = "pm";
  // ** change alarms to local storage --> collecting info from local storage 
  const [alarms, setAlarms] = useState([
    {id: 1, nm: 'hey', time: "10:00pm", power: "off", days: []}, 
    {id: 2, nm: 'there', time: "11:00am", power: "off", days: ["Mon", "Wed"]},
    {id: 3, nm: 'webd', time: "11:30am", power: "on", days: ["Thu"]}
  ]);

  function UploadAlarm() {
    // ** collect all the alarms in local storage (for loop, check if type === alarm)
    // copy Form.js creatSongList function 
  }
  
  //sets alarm array to what has been inputed into it
  //should code check for all alarm info being present

  // ** not necessary SETALARMARRAY 
  function SetAlarmArray(arr) {
    setAlarms(arr);
    AlarmSort();
  }

  function DisplayAlarms() {
    // for alarms.map, all the k.name will have to change (id, label, power, repeat, snooze, snoozeSound, snoozeTime, sound, time, type)
    return(
      <div>
        {alarms.map((k) => ( //k is an alarms object
          <div>
            <div id="alarmName">Alarm Name: {k.nm}</div>
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
    var days = alarms[ind].days;
    var display = '';
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
      for(let i = 0; i < days.length; i++) {
        display += days[i];
        if (i !== days.length -1) {
          display += "  "
        }
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
   
    let alrm = alarms[ind];  //set variable to refer to alarm in use

    //set pow to be opposite of alarm power
    var pow = alrm.power;
    if (pow === "on") {
      pow = "off";
    } else {
      pow = "on"
    }

    alrm.power = pow;
    // ** add a change for localstorage as well --> take inspiration from Form.js (doing a lot of similar things)
    setAlarms(
      [...alarms.slice(0, ind), alrm, ...alarms.slice(ind+1)]
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
  
  // ** NOT FINISHED CLICKADDALARM()
  function ClickAddAlarm() {
    // ** switch screens to AddAlarm.js 
  }

  function Header() {
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
      {/* <SoundPopup /> */}
      </div>
    );
  }

  function addAlarm(alarm) {
    setAlarms([alarm, ...alarms]);
  }

  return (
    <div>
      <Header />
      <Body />
      {/* <Times /> */}
    </div>
  );
}

//getItem setItem local storage
//jSON stringify jSON.parse()
export default HomePage;