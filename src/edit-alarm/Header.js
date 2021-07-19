import React from 'react';

function Header(props) {
    return(
        <form className="edit-header">
            <button className="back" onClick={props.back}>Back</button>
            <text className="header">{props.headerName}</text>
            <button className='save' onClick={props.clicked}>{props.btnName}</button>
        </form>
    )
}

export default Header