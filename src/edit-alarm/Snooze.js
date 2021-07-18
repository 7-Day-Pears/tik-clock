import React, { useState, useEffect, useCallback } from 'react'; 
import SoundUpload from '../edit-alarm/SoundUpload';

function Snooze({check, minute, sound, onChange}) {
    const [isClicked, setClicked] = useState(false);
    const [checked, setCheck] = useState(check);
    const [minInput, minGap] = useState(minute);

    const [snoozeSound, setSnoozeSound] = useState({sounds: {songId: sound}})
    const onSnoozeChange = useCallback(s => setSnoozeSound({sounds: s}), [])

    const [officialSnoozeSound, setOfficialSound] = useState(sound)

    useEffect(() => onChange({check: checked, minute: minInput, sound: officialSnoozeSound}), [checked, minInput, officialSnoozeSound, onChange])

    useEffect(() => {updateOfficial()}, [snoozeSound])


    const btnName = JSON.parse(localStorage[snoozeSound.sounds.songId])['songName']

    const checkMin = (e) => {
        if (isNaN(e.target.value)) {
            console.log('not a number')
        } else {
            if (e.target.value > 30 || e.target.value < 0 & e.target.value !== "") {
                console.log('too long of a snooze')
            } else {
                minGap(e.target.value)
            }
        }
    }

    const whenClicked = (e) => {
        setClicked(!isClicked)
        updateOfficial()
        e.preventDefault()
    }

    const updateOfficial = () => {
        setOfficialSound(snoozeSound.sounds.songId)
    }

    const SnoozeSwitch = () => {
        return(
            <form className="SnoozeON">
                <label className="time-gap">
                    <text>Time Gap</text>
                    <input 
                        type="text" 
                        value={minInput} 
                        name='hour' 
                        className='Time-gap-hr'
                        onChange={(e) => checkMin(e)}
                    />
                </label>
                <br />
                <label className="snooze-sound">
                    <text>Sound</text>
                    <button 
                        className="snooze-sound-btn" 
                        onClick={(e) => whenClicked(e)}
                    >{btnName}</button>
                    <SoundUpload 
                        songId={snoozeSound.sounds.songId}
                        onChange={onSnoozeChange}
                        trigger={isClicked}
                        ClosePopup={(e) => whenClicked(e)}
                    />
                </label>
            </form>
        )
    }

    const checkChange = () => {
        setCheck(!checked)
        if (checked === true) {
            minGap('')
        } else {
            if (checked === false && minInput === '') {
                minGap(5)
            }
        }
    }

    return (
        <form className="Snooze">
            <text>Snooze</text>
            <input type="checkbox" onChange={checkChange}/>
            <span className="snooze-on">ON</span>
            <span className="snooze-off">OFF</span>
            {checked ? (SnoozeSwitch()) : ('')}
        </form>
    )
}

export default Snooze