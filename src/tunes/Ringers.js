import React from 'react'

function Ringers() {
    const ringers = [
        {id: 1000001, type: 'defaultRingers', songName: 'Dogs Barking'},
        {id: 1000002, type: 'defaultRingers', songName: 'Creepyman Walking'},
        {id: 1000003, type: 'defaultRingers', songName: 'Birds Screaming'},
        {id: 1000004, type: 'defaultRingers', songName: 'Dying Children'},
        {id: 1000005, type: 'defaultRingers', songName: 'Elephant Stampede'},
        {id: 1000006, type: 'defaultRingers', songName: 'Ripping Pants'},
        {id: 1000007, type: 'defaultRingers', songName: 'Nuts Crushed'},
        {id: 1000008, type: 'defaultRingers', songName: 'Agony in a Bottle'},
        {id: 1000009, type: 'defaultRingers', songName: 'Toenails Being Clipped'},
        {id: 1000010, type: 'defaultRingers', songName: 'ASMR Nail Tapping'}
    ]

    const setRingers = () => {
        for (var i in ringers) {
            localStorage.setItem(ringers[i]['id'], JSON.stringify(ringers[i]))
        }
    }

    setRingers()

    return(
        <div>
            <h3>Ringtones</h3>
            {ringers.map((ringer) => (
                <div>
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