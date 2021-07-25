import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import './PopupUpload.css';

function PopupUpload (props) {
    const [input, setInput] = useState('');

    const [fileName, setFileName] = useState('')
    const [url, setURL] = useState('')

    const audio = useMemo(() => new Audio(url), [url])
    const [playing, setPlaying] = useState(false)

    useEffect(() => {updateInput()}, [fileName])

    const updateValue = (e) => {
        setInput(e.target.value)
    }

    const updateInput = () => {
        var id = fileName.indexOf('.')
        setInput(fileName.slice(0, id))
    }

    const updatePlaying = (isPlaying) => {
        setPlaying(!isPlaying)
    }

    const getFileName = (e) => {
        try {
            setFileName(e.target.files[0].name)
            var url = URL.createObjectURL(e.target.files[0])
            setURL(url)
        } catch(e) {
            console.error(e)
            setFileName('')
        }
    }

    const UpdateClick = (e=-1) => {
        let isPlaying = playing

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }

        updatePlaying(isPlaying)
        if (e !== -1) {e.preventDefault()}
    }

    const submitSong = () => {
        UpdateClick()
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        const value = {id: id, type: 'uploadedSong', songName: input, preName: input, readOnly: true, editValue: 'edit', showPopup: false, URL: url}
        localStorage.setItem(id, JSON.stringify(value))
    }

    const cancelSong = (e) => {
        UpdateClick(e)
        props.showPopup(e)
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <h3 className='title'>Add New Song</h3>
                <input type="file" className="file-btn" accept="audio/*" onChange={(e) => getFileName(e)} />
                <button onClick={(e) => UpdateClick(e)}>{playing ? 'Pause' : 'Play'}</button>
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
                    onClick={(e) => cancelSong(e)}
                >x</button>

                { props.children }
            </div>
        </div>

    ) : "";
}

export default PopupUpload;