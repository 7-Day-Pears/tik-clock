import React from "react";
import TunesHeader from "./tunes/TunesHeader"; 
import UploadTunes from './tunes/UploadTunes';
import Form from './tunes/Form';
import Header from './tunes/Header';


function Tunes() {
  return (
    <form className="edit-alarm">
        <TunesHeader />
        <UploadTunes /> 
        <Header /> 
        <Form />
    </form>
  );
}

export default Tunes;