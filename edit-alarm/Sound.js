import React, { useCallback, useState, useEffect } from 'react'; 
import SoundUpload from './SoundUpload';

function Sound({soundId, onChange}) {
    const [soundChoice, setSound] = useState(false)

    const [currentSoundId, setId] = useState({songs: {songId: soundId}})
    const onIdChange = useCallback(c => setId({songs: c}), [])

    const [AlarmSoundId, setSoundId] = useState(soundId)
    useEffect(() => onChange({soundId: AlarmSoundId}), [AlarmSoundId, onChange])

    useEffect(() => {updateOfficialSong()}, [currentSoundId])

    const btnName = JSON.parse(localStorage[currentSoundId.songs.songId])['songName']

    const btnClick = (e) => {
        setSound(!soundChoice)
        updateOfficialSong()
        e.preventDefault()
    }

    const updateOfficialSong = () => {
        setSoundId(currentSoundId.songs.songId)
    }

    return(
        <form className="alarm-sound">
            <label className="sound">
                <text>Sound</text> 
                <button className="sound-btn" onClick={(e) => btnClick(e)}>{btnName}</button> 
                <SoundUpload 
                    trigger={soundChoice} 
                    ClosePopup={(e) => btnClick(e)} 
                    songId={currentSoundId.songs.songId} 
                    onChange={onIdChange}
                />
            </label>
        </form>
    )
}

export default Sound 
