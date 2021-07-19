import React from 'react';


function Times() {
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1; //month starts from 0
    var day = mydate.getDate();
    var displayDate = year + '/' + month + '/' + day;
    // console.log('date', displayDate)
    //var now = moment();
    return(
      <p>{displayDate}</p>
    )
}

export default Times;