import React, { useMemo } from 'react'
import { useState } from 'react/cjs/react.development'
import { playPause } from './PopupUpload'

function Ringers() {
    const ringers = [
        {id: 1000001, type: 'defaultRingers', songName: 'Dogs Barking', URL: ''},
        {id: 1000002, type: 'defaultRingers', songName: 'Creepyman Walking', URL: ''},
        {id: 1000003, type: 'defaultRingers', songName: 'Birds Screaming', URL: ''},
        {id: 1000004, type: 'defaultRingers', songName: 'Dying Children', URL: ''},
        {id: 1000005, type: 'defaultRingers', songName: 'Elephant Stampede', URL: ''},
        {id: 1000006, type: 'defaultRingers', songName: 'Ripping Pants', URL: ''},
        {id: 1000007, type: 'defaultRingers', songName: 'Nuts Crushed', URL: ''},
        {id: 1000008, type: 'defaultRingers', songName: 'Agony in a Bottle', URL: ''},
        {id: 1000009, type: 'defaultRingers', songName: 'Toenails Being Clipped', URL: ''},
        {id: 1000010, type: 'defaultRingers', songName: 'ASMR Nail Tapping', URL: ''}
    ]
    const [playing, setPlaying] = useState(false)

    const setRingers = () => {
        for (var i in ringers) {
            localStorage.setItem(ringers[i]['id'], JSON.stringify(ringers[i]))
        }
    }

    const UpdateClick = (id, e) => {
        const url = useState(JSON.parse(localStorage[id])['URL'])
        const audio = useMemo(() => new Audio(url), [url])
        
        if (url !== '') {
            playPause(playing, audio)
            setPlaying(!playing)
        }

        e.preventDefault()
    }

    setRingers()

    return(
        <div>
            <h3>Ringtones</h3>
            {ringers.map((ringer) => (
                <div>
                    <button onClick={(e) => UpdateClick(ringer.id, e)}>
                        {'>'}</button>
                    <input 
                        type='text' 
                        value={ringer['songName']}
                        readOnly
                    /> 
                    <br />
                </div>
            ))}
        </div>
    )
}

export default Ringers