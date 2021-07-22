import React from 'react'; 
import { useCallback, useState } from 'react';

import Header from '../edit-alarm/Header';
import Time from '../edit-alarm/Time';
import Days from '../edit-alarm/Days';
import Label from '../edit-alarm/Label';
import Sound from '../edit-alarm/Sound';
import Snooze from '../edit-alarm/Snooze';

import {GetTime} from '../HomePage';

function LocalStorage({onClick}) {
    const currentTime = GetTime()
    const currentHour = (currentTime.slice(0, 2) == 0 ? 12 : (currentTime.slice(0, 2) > 12 ? currentTime.slice(0, 2) - 12 : currentTime.slice(0, 2)))
    const currentMinute = currentTime.slice(3, 5)
    const currentCheck = currentTime.slice(0, 2) > 11 ? true : false
    const [timeData, setTime] = useState({time: {hour: currentHour, minute: currentMinute, check: currentCheck}})
    const onTimeChange = useCallback(t => setTime({time: t}), [])

    const [daysData, setDays] = useState({data: {days: [], check: false}})
    const onDaysChange = useCallback(d => setDays({data: d}), [])

    const [labelData, setLabel] = useState({input: {label: 'Alarm'}})
    const onLabelChange = useCallback(l => setLabel({input: l}), [])

    const [soundData, setSound] = useState({sounds: {soundId: 1000003}})
    const onSoundChange = useCallback(sc => setSound({sounds: sc}), [])

    const [snoozeData, setSnooze] = useState({snooze: {check: true, minute: 5, sound: 1000003}})
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

    const days = () => {
        var daysList = []
        for (var i in daysData.data.days) {
            daysList.push(daysData.data.days[i])
        }
        return daysList
    }

    const snooze = () => {
        if (snoozeData.snooze.check===false) {
            return "off"
        } else {return "on"}
    }

    
    const submitNewAlarm = () => {
        const id = Math.floor(Math.random() * (100000 - 1001) + 1);
        const value = {
            id: id, 
            type: 'alarm',
            time: time(), 
            repeat: days(), 
            label: labelData.input.label, 
            sound: soundData.sounds.soundId, 
            snooze: snooze(),
            snoozeTime: snoozeData.snooze.minute,
            snoozeSound: snoozeData.snooze.sound, 
            power: 'on'
        }
        localStorage.setItem(id, JSON.stringify(value))
    }

    const createBtnClicked = (onClick) => {
        submitNewAlarm()
        onClick('Homepage')
    }

    return(
        <form>
            <Header headerName="New Alarm" btnName="Create" back={() => onClick('Homepage')} clicked={() => createBtnClicked(onClick)}/>
            <Time hour={timeData.time.hour} minute={timeData.time.minute} check={timeData.time.check} onChange={onTimeChange} />
            <Days days={daysData.data.days} check={daysData.data.check} onChange={onDaysChange} /> 
            <Label label={labelData.input.label} onChange={onLabelChange}/>
            <Sound soundId={soundData.sounds.soundId} onChange={onSoundChange} />
            <Snooze check={snoozeData.snooze.check} minute={snoozeData.snooze.minute} sound={snoozeData.snooze.sound} onChange={onSnoozeChange}/> 
        </form>
    )
}

export default LocalStorage;