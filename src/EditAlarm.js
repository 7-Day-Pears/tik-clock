import React, { useCallback, useState} from "react";

import Header from "./edit-alarm/Header";
import Time from "./edit-alarm/Time";
import Days from "./edit-alarm/Days";
import Label from "./edit-alarm/Label";
import Sound from "./edit-alarm/Sound";
import Snooze from "./edit-alarm/Snooze";

function EditAlarm({onClick}) {
  //get alarmId out of local storage
  var alarmId;
  for(var i in localStorage){
    if(localStorage.hasOwnProperty(i)){
      if(JSON.parse(localStorage[i])['type'] === "edit") {
        alarmId = JSON.parse(localStorage[i])['id'];
        alarmId = JSON.parse(alarmId);
      }
    }
  }
  console.log(alarmId);

  const alarm = JSON.parse(localStorage[alarmId])

  const getTimeData = () => {
    let t = alarm['time']
    var check = null 
    var hour = parseInt(t.substring(0, 2))
    var minute = parseInt(t.substring(3, 5))

    if (hour > 12) {
      let h = parseInt(t.substring(0, 2))
      check = true 
      hour = (h === 12 ? h: h-12)
    } else {check=false}
    return [check, hour, minute]
  }
  const values = getTimeData()

  const getSnoozeData = () => {
    var check = false 
    if (alarm['snooze'] === 'on') {
      check = true}
    return check 
  }
  const snoozeCheck = getSnoozeData()

  const [timeData, setTime] = useState({time: {hour: values[1], minute: values[2], check: values[0]}})
  const onTimeChange = useCallback(t => setTime({time: t}), [])

  const [daysData, setDays] = useState({data: {days: alarm['repeat'], check: (alarm['repeat'].length > 0 ? true: false)}})
  const onDaysChange = useCallback(d => setDays({data: d}), [])

  const [labelData, setLabel] = useState({input: {label: alarm['label']}})
  const onLabelChange = useCallback(l => setLabel({input: l}), [])

  const [soundData, setSound] = useState({sounds: {soundId: alarm['sound']}})
  const onSoundChange = useCallback(sc => setSound({sounds: sc}), [])

  const [snoozeData, setSnooze] = useState({snooze: {check: snoozeCheck, minute: parseInt(alarm['snoozeTime']), sound: alarm['snoozeSound']}})
  const onSnoozeChange = useCallback(s => setSnooze({snooze: s}), [])

  const time = () => {
    var hr = timeData.time.hour 
    var minute = timeData.time.minute 
    var pm = timeData.time.check 

    if (pm === true) {
        var newHr = (parseInt(hr) === 12 ? hr : parseInt(hr) + 12) 
        return(newHr + ":" + (minute.length === 1 ? '0' + minute : minute))
    } else {
        return((parseInt(hr) === 12 ? 0: hr) + ":" + (minute.length === 1 ? '0' + minute : minute))
    }
  }

  const saveEdits = () => {
    alarm['label'] = labelData.input.label
    alarm['time'] = time()
    alarm['sound'] = soundData.sounds.soundId
    alarm['repeat'] = daysData.data.days

    localStorage.setItem(alarmId.alarmId, JSON.stringify(alarm))
  }


  return (
    <form className="edit-alarm">
      <Header headerName='Edit Alarm' btnName='Save' back={() => onClick('Homepage')} clicked={saveEdits} />
      <Time hour={timeData.time.hour} minute={timeData.time.minute} check={timeData.time.check} onChange={onTimeChange} />
      <Days days={daysData.data.days} check={daysData.data.check} onChange={onDaysChange} />
      <Label label={labelData.input.label} onChange={onLabelChange} />
      <Sound soundId={soundData.sounds.soundId} onChange={onSoundChange}/>
      <Snooze check={snoozeData.snooze.check} minute={snoozeData.snooze.minute} sound={snoozeData.snooze.sound} onChange={onSnoozeChange} />
    </form>
  );
}

export default EditAlarm;
