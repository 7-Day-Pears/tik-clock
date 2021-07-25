import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';

function Time({hour, minute, check, onChange}) {
    const [hrInput, setHr] = useState(hour)
    const [minInput, setMin] = useState(minute === 0 ? "00" : minute)
    const [checkInput, setCheck] = useState(check) 

    useEffect(() => onChange({hour: hrInput, minute: minInput, check: checkInput}), [hrInput, minInput, checkInput, onChange])

    const checkHr = (e) => {
        if (isNaN(e.target.value) & e.target.value !== "") {
            console.log('not a number')
        } else {
            if (e.target.value > 12 || e.target.value < 0 & e.target.value !== "") {
                console.log('not an hour available')
            } else {
                setHr(e.target.value)
            }
        }
    }

    const checkMin = (e) => {
        if (isNaN(e.target.value) & e.target.value !== "") {
            console.log('not a number')
        } else {
            if (e.target.value > 59 || e.target.value < 0) {
                console.log('not an minute available')
            } else {
                setMin(e.target.value)
            }
        }
    }

    return(
        <form className="Time-form">
            <input 
                type="text" 
                placeholder="00" 
                value={hrInput} 
                className='Time-input-hr'
                onChange={(e) => checkHr(e)}
            />
            <label className="space">
                <text>:</text>
            </label>
            <input 
                type="text" 
                placeholder="00" 
                value={minInput} 
                className='Time-input-min'
                onChange={(e) => checkMin(e)}
            />
            <label className="am-pm-switch">
                <input type="checkbox" onClick={() => setCheck(!checkInput)}
                />
                <span className="am">AM</span>
                <span className="pm">PM</span>
            </label>
        </form>
    )
}

export default Time 
