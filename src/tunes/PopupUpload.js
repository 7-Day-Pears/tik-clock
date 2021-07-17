import React from 'react';
import { useState } from 'react/cjs/react.development';
import './PopupUpload.css';

function PopupUpload (props) {
    const [input, setInput] = useState('');

    const updateValue = (e) => {
        setInput(e.target.value)
    }

    // error - doesn't print anything 
    const getFileName = (e) => {
        var name = e.target.value
        return String(name)
    }

    // error - doesn't play or work 
    const playSound = (e) => {
        var name = getFileName(e)
        console.log(0, name)
        if (name !== 'undefined') {
            console.log(1, name)
            var audioTune = new Audio(name)
            console.log(2, audioTune)
        }
        audioTune.play()
        e.preventDefault()
    }
    // this function uploads the song --> ask the user to choose a file (only audio)
    // returns the value (most likely the url of the song in the person's computer)

    const submitSong = () => {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        const value = {id: id, type: 'uploadedSong', songName: input, preName: input, readOnly: true, editValue: 'edit', showPopup: false}
        localStorage.setItem(id, JSON.stringify(value))
        // database will also add in the song with (id, url) 
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <h3 className='title'>Add New Song</h3>
                <input type="file" className="file-btn" id='f' onChange={(e) => getFileName(e)} />
                <button onClick={(e) => playSound(e)}>Play Sound</button>
                <input 
                    type="text"
                    className="newsong-name"
                    value={input}
                    onChange={(e) => updateValue(e)}
                />
                <button 
                    className="submit-song" 
                    onClick={() => submitSong()}
                >submit</button>
                <button
                    className="delete-button"
                    onClick={(e) => props.showPopup(e)}
                >x</button>

                { props.children }
            </div>
        </div>

    ) : "";
}

export default PopupUpload;