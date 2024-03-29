import React from 'react';
import EditAlarm from "./EditAlarm";
import Tunes from "./Tunes";
import NewAlarm from "./NewAlarm";

import HomePage from './HomePage';
import Ringers from './tunes/Ringers'
import { useState } from 'react/cjs/react.development';
import TimeWork from './TimeWork';

// ** in the whole app, add a few buttons to allow the user to move between different screens (tunes or alarm)

function App() {
  const [currentView, setCurrentView] = useState('Homepage')

  const toggle =(page) => {
    setCurrentView(page) 
    console.log(currentView)
  }

  function changeCurView() {
    if (currentView === "Homepage") {
      return(
      <HomePage onClick={(page) => toggle(page)}/>
      )
    }
    else if (currentView === "New Alarm") {
      return(
      <NewAlarm onClick={(page) => toggle(page)} />
      )
    } else if (currentView === "Edit Alarm") {
      return(
      <EditAlarm onClick={(page) => toggle(page)} />
      )
    }
  }

  return (
    <div className="Alarm-app">
      {changeCurView()}
      {/* <NewAlarm /> */}
      {/* <EditAlarm alarmId={87647} /> */}
      {/* <Tunes /> */}
    </div>
  );
}

export default App;
