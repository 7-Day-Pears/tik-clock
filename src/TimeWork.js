import React from 'react';


function TimeWork(alarmsId) {
  var alarm = null;

  function GetAlarmTime(id) {
    
    for(var i in localStorage){
      if(localStorage.hasOwnProperty(i)){
          if(JSON.parse(localStorage[i])['type'] === "alarm") {
              if (JSON.parse(localStorage)['id'] === id) {
                alarm = JSON.parse(localStorage[i]);
              }
          }
      }
    }
    
  }

function Times() {
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1; //month starts from 0
    var day = mydate.getDate();
    var displayDate = year + '/' + month + '/' + day;
    var hours = mydate.getHours();
    var minutes = mydate.getMinutes();

    

    //is alarm time the same 

    return(
      <p>{displayDate}</p>
    )
}

return (
  <Times />
);
}

export default TimeWork;