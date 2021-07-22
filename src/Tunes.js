import React from "react";
import TunesHeader from "./tunes/TunesHeader"; 
import UploadTunes from './tunes/UploadTunes';
import Form from './tunes/Form';
import Header from './tunes/Header';
import Ringers from "./tunes/Ringers";


function Tunes() {
  // const defaultSong = 
  return (
    <form className="edit-alarm">
        <TunesHeader />
        <UploadTunes /> 
        <Ringers />
        <Header /> 
        <Form />
    </form>
  );
}

export default Tunes;