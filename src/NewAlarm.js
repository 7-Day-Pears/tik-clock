import React from 'react';
import LocalStorage from "./add-new-alarm/LocalStorage";

function NewAlarm() {
    return (
      <form className="Alarm-app">
        <LocalStorage />
      </form>
    );
  }
  
  export default NewAlarm;