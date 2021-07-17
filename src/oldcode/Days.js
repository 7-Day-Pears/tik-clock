import React, { useState, useEffect } from 'react'

function Days({days, onChange}) {
    // all the days are clicked as default
    const [btnLists, setList] = useState([
        { id: 1, dayName: "Monday", isClicked: true }, 
        { id: 2, dayName: "Tuesday", isClicked: true }, 
        { id: 3, dayName: "Wednesday", isClicked: true }, 
        { id: 4, dayName: "Thursday", isClicked: true }, 
        { id: 5, dayName: "Friday", isClicked: true }, 
        { id: 6, dayName: "Saturday", isClicked: true }, 
        { id: 7, dayName: "Sunday", isClicked: true }
    ]);
    // ** cannot make the repeat days show on btnList

    const [checked, setCheck] = useState(false);
    const [daysChecked, setDaysCheck] = useState(days)

    useEffect(() => onChange({days: daysChecked}), [daysChecked, onChange])
    useEffect(() => {saveDays()}, [checked])

    // updates the value of isClicked
    const updateClick = (id, whenIsClicked, e) => {
        // index is which array the btn id is in 
        const index = btnLists.findIndex(x => x.id === id); 
        let b = btnLists[index] 
        // replaces the value of isClicked 
        b['isClicked'] = !whenIsClicked 

        // updates 'btnLists' with the new value of isClicked 
        setList([
            ...btnLists.slice(0, index), 
            b, 
            ...btnLists.slice(index+1)
        ]);
        saveDays()
        e.preventDefault()
    }

    const saveDays = () => {
        var days = []
        if (checked===true) {
            for (var i in btnLists) {
                let s = btnLists[i]
                if (s['isClicked'] === true) {
                    days.push(s['id'])
                }
            }
        } else {
            days = []
        }
        setDaysCheck(days)
    }

    const repeatClicked = () => {
        setCheck(!checked)
    }

    // creates the buttons + calls updateClick
    const DayButtons = () => {
        return(
            <form>
                {btnLists.map((btn) => (
                    <button
                        key={btn.id}
                        onClick={(e) => updateClick(btn.id, btn.isClicked, e)}
                        style={{ backgroundColor: btn.isClicked ? ('yellow') : ('')}}
                    >
                        {btn.dayName}
                    </button>
                ))}
            </form>
        )
    }

    // main return statement --> checking if the check box is checked (if it is, calls DayButtons)
    return (
        <form className="repeat-days">
            <input type="checkbox"
                onClick={repeatClicked}
            />
            <span className="repeat">Repeat</span>
                {checked ? (DayButtons()) : ("")}
        </form>
    )
}

export default Days