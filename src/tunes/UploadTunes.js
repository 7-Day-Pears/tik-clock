import React from 'react';
import { useState } from 'react/cjs/react.development';
import PopupUpload from './PopupUpload';

function UploadTunes() {
    const [popUp, setPopup] = useState(false)

    const openPopup = (e) => {
        setPopup(!popUp)
        e.preventDefault()
    }

    return(
        <form className="upload-header">
            <text>Upload</text>
            <button className="upload-btn" onClick={(e) => openPopup(e)}>add new song</button>
            <PopupUpload trigger={popUp} showPopup={openPopup}></PopupUpload>
        </form>
    )
}

export default UploadTunes;