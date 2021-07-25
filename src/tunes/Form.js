import React from 'react';
import { useState, useMemo, useEffect } from 'react/cjs/react.development';
import Popup from './Popup';
import { playPause } from './PopupUpload'


function Form() {
    const creatSongList = () => {
        var arrayOfValues = [];
        for(var i in localStorage){
            if(localStorage.hasOwnProperty(i)){
                if(JSON.parse(localStorage[i])['type'] === "uploadedSong") {
                    arrayOfValues.push(JSON.parse(localStorage[i]));
                }
            }
        }
        return (
            arrayOfValues
        )
    }

    const [songList, setSongList] = useState(creatSongList());

    const [url, setURL] = useState('')
    const audio = useMemo(() => new Audio(url), [url])

    // changes the value of the 'edit button' depending on the mode (edit or save)
    const changeValue = (id, readOnly, preName, e) => {
        const index = songList.findIndex(x => x.id === id);
        let s = JSON.parse(localStorage.getItem(id))

        // changes the value of readOnly 
        s['readOnly'] = !readOnly

        // sets the value of editValue and songName to preName  
        if (s['editValue'] === 'edit') {
            s['editValue'] = 'save'
        } else {
            s['songName'] = preName
            s['editValue'] = 'edit'
        }

        // changes the value of local storage 
        localStorage.setItem(id, JSON.stringify(s))

        // changes the value of songList
        setSongList([
            ...songList.slice(0, index), 
            s, 
            ...songList.slice(index+1)
        ])

        e.preventDefault()
    }

    // updates the value of preName 
    const changeInputValue = (id, e) => {
        const index = songList.findIndex(x => x.id === id);
        // input value
        const tempValue = e.target.value;

        let s = JSON.parse(localStorage.getItem(id))
        s['preName'] = tempValue

        localStorage.setItem(id, JSON.stringify(s))

        setSongList([
            ...songList.slice(0, index), 
            s, 
            ...songList.slice(index+1)
        ])
    }

    // actually delete the song 
    const deleteSong = (id, e) => {
        const index = songList.findIndex(x => x.id === id);
        localStorage.removeItem(id)

        setSongList([
            ...songList.slice(0, index), 
            ...songList.slice(index+1)
        ])

        e.preventDefault()
    }

    // edits the value of showPopup and determines if 'yes, delete this song' button on the popup is clicked
    const togglePopup = (id, value, deleteValue=-1, e=-1) => {
        const index = songList.findIndex(x => x.id === id);
        let s = JSON.parse(localStorage.getItem(id))

        s['showPopup'] = value

        localStorage.setItem(id, JSON.stringify(s))

        setSongList([
            ...songList.slice(0, index), 
            s, 
            ...songList.slice(index+1)
        ])

        e.preventDefault()

        if (deleteValue === 1) {
            deleteSong(id, e)
        } 
    }

    const playPause = () => {

    }

    const PlayBackSong = (id, e) => {
        setURL(JSON.parse(localStorage[id])['URL'].slice(5, -1))

        const index = songList.findIndex(x => x.id === id);
        let s = JSON.parse(localStorage.getItem(id))
        let value = s['playing']

        s['playing'] = !value

        localStorage.setItem(id, JSON.stringify(s))

        setSongList([
            ...songList.slice(0, index), 
            s, 
            ...songList.slice(index+1)
        ])

        playPause(s['playing'], audio)

        e.preventDefault()

        console.log('test', s['URL'])
    }

    const printSongs = () => {
        return(
            <form className="saved-songs-list">
                {songList.map((song) => (
                    <div>
                        <button onClick={(e) => PlayBackSong(song.id, e)}>{song.playing ? '||' : '>'}</button>
                        <input type='text' 
                            className='song-name' 
                            value={song.readOnly ? (song.songName) : (song.preName)}
                            onChange={(e) => changeInputValue(song.id, e)}
                        />
                        <button  
                            onClick={(e) => changeValue(song.id, song.readOnly, song.preName, e)} 
                            className='edit-song'
                        >{song.editValue}</button>
                        
                        <button 
                            className="delete-song"
                            onClick={(e) => togglePopup(song.id, true, 0, e)}
                        >delete</button>

                        <Popup trigger={song.showPopup} setCancel={togglePopup} id={song.id} songName={song.songName}>
                            <p>{song.showPopup}</p>
                        </Popup>

                        <br />
                    </div>
                ))}
            </form>
        )
    }

    const form = () => {
        return(
            <text className="no-song-text">No saved songs</text>
        )
    }
    
    return(
        <form className='song-form'>
            {printSongs()}
            {songList.length === 0 ? form() : null}
        </form>
    )
}

export default Form