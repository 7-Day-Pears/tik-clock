import React, { useState, useEffect } from 'react'

function Days({days, check, onChange}) {
    // all the days are clicked as default
    const [btnLists, setList] = useState((check === true?[
        { id: 0, dayName: "Monday", isClicked: (days.indexOf(0) > -1?true:false) }, 
        { id: 1, dayName: "Tuesday", isClicked: (days.indexOf(1) > -1?true:false) }, 
        { id: 2, dayName: "Wednesday", isClicked: (days.indexOf(2) > -1?true:false) }, 
        { id: 3, dayName: "Thursday", isClicked: (days.indexOf(3) > -1?true:false) }, 
        { id: 4, dayName: "Friday", isClicked: (days.indexOf(4) > -1?true:false) }, 
        { id: 5, dayName: "Saturday", isClicked: (days.indexOf(5) > -1?true:false) }, 
        { id: 6, dayName: "Sunday", isClicked: (days.indexOf(6) > -1?true:false) }
    ]:[
        { id: 0, dayName: "Monday", isClicked: true }, 
        { id: 1, dayName: "Tuesday", isClicked: true }, 
        { id: 2, dayName: "Wednesday", isClicked: true }, 
        { id: 3, dayName: "Thursday", isClicked: true }, 
        { id: 4, dayName: "Friday", isClicked: true }, 
        { id: 5, dayName: "Saturday", isClicked: true }, 
        { id: 6, dayName: "Sunday", isClicked: true }
    ]));

    // ** cannot make the repeat days show on btnList
    const [checked, setCheck] = useState(check);
    const [daysChecked, setDaysCheck] = useState(days)

    useEffect(() => onChange({days: daysChecked, check: checked}), [daysChecked, checked, onChange])
    useEffect(() => {saveDays()}, [checked])

    // updates the value of isClicked with day's button is clicked
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