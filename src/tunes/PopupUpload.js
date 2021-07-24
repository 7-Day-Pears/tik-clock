import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import './PopupUpload.css';

function PopupUpload (props) {
    const [input, setInput] = useState('');

    const [fileName, setFileName] = useState('')
    const [url, setURL] = useState('')

    const updateValue = (e) => {
        setInput(e.target.value)
    }

    const getFileName = (e) => {
        setFileName(e.target.files[0].name)
        var url = URL.createObjectURL(e.target.files[0])
        // console.log(url)
        setURL(url)
    }

    const UseAudio = (url) => {
        let audio = new Audio(url)
        const [playing, setPlaying] = useState(false);
        
        const toggle = () => {
            setPlaying(!playing)
        };

        useEffect(() => {
            playing ? audio.play() : audio.pause()
        }, [playing])
    }

    const playing = (e) => {
        var str = url
        // var toggle = UseAudio(str)
        UseAudio(str)

        // console.log(str)
        // const audio = new Audio("<" + str + ">")
        // audio.play()
        e.preventDefault()
    }

    // const [playing, toggle] = UseAudio(fileName);
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
                <input type="file" className="file-btn" accept="audio/*" onChange={(e) => getFileName(e)} />
                <button onClick={(e) => playing(e)}>{'play'}</button>
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