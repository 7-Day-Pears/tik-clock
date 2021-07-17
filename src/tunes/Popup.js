import React from 'react';
import './Popup.css';

function Popup(props) {
    return(props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <h3 className='title'>Delete {props.songName}</h3>
                <text className='text'>Are you sure that you want to delete this song?</text>
                <button className='deleteBtn'
                    onClick={(e) => props.setCancel(props.id, false, 1, e)}
                >Yes, delete this song</button>
                <button className='cancelBtn'
                    onClick={(e) => props.setCancel(props.id, false, 0, e)}
                >Cancel</button>

                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup