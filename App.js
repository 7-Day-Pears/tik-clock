import React from 'react';
import EditAlarm from "./EditAlarm";
import Tunes from "./Tunes";
import NewAlarm from "./NewAlarm";

import HomePage from './HomePage';

function App() {
  return (
    <div className="Alarm-app">
      <HomePage /> 
      {/* <NewAlarm /> */}
      {/* <Tunes /> */}
      {/* <EditAlarm alarmId={87647} /> */}
    </div>
  );
}

export default App;
