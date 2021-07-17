import React, { useEffect, useState } from 'react'

function SoundUpload({songId, onChange, trigger, ClosePopup}) {
    const [selectedSongId, setId] = useState(songId);
    const [savedSongId, setSavedId] = useState(songId);

    useEffect(() => onChange({songId: savedSongId}), [savedSongId, onChange])

    // function called get saved songs that get all the songs and prints it out in the return 
    const getSavedSongs = () => {
        var arrayOfValues = [];
        for(var i in localStorage){
            if(localStorage.hasOwnProperty(i) && JSON.parse(localStorage[i])['type'] === 'uploadedSong'){
                arrayOfValues.push(JSON.parse(localStorage[i]));
            }
        }
        return arrayOfValues
    }

    const onSelect = ({target: {selectedOptions: [option]}}) => {
        setId(parseInt(option.getAttribute('id')))
    }

    // prints out all the sounds in a listbox 
    const printSounds = () => {
        var sounds = getSavedSongs()
        var length = sounds.length

        return(
            <select className="sound-names" 
                size={String(length)} 
                onChange={onSelect}>

                {sounds.map((sound) => (
                    <option 
                        value={sound['songName']} 
                        id={sound['id']} 
                        selected={sound['id'] === savedSongId ? ('selected') : (null)}
                    >{sound['songName']}</option>
                ))}
            </select>
        )
    }

    // function for 'cancel' button --> return nothing for soundId
    const cancelBtn = (e) => {
        setSavedId(savedSongId) 
        ClosePopup(e)
    }

    const saveBtn = (e) => {
        setSavedId(selectedSongId)
        ClosePopup(e)
    }

    return(trigger) ? (
        <form>
            <h3 className="title">Saved Songs</h3>
            {printSounds()}
            <br />
            <button className="save-btn" onClick={(e) => saveBtn(e)}>Save</button>
            <button className="cancel-btn" onClick={(e) => cancelBtn(e)}>Cancel</button>
        </form>
    ) : ""
}

export default SoundUpload