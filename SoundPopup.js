import React  from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function uploadMusic() {
    //returns array of music available for ringtone after reading from file, is used for "tones" array
}

function SoundPopup() {
    const tones = ["apple.mp3", "banana.mp3", "carrotcake.mp3", "operahauntman.mp3", "squidwardclarinet.mp3", "surprise.mp3", "none"];
    //object: name, id, ?filepath? 
    var choose = 0;
    var choice = "none";

    //if choose == buttonIndex, then indicate clicked
    function DisplayChoices() {
        //choose your own is going to be -1
        
        var buttonName = [];
        for (var i = 0; i < tones.length; i++) {
            buttonName.push(i);
        }
        return (
            <div>
            <button OnClick={OwnChoice} id="ownSong" type="radio">
                Choose your own song
            </button>

            {tones.map((n) => (
                <button OnClick={HandleChoice(n)} id={buttonName[n]} type="radio">
                {tones[n]}
                </button>
            ))
            }
            </div>
        )
    }

    function HandleChoice(id) {
        choose = id;
        for (var i = 0; i < tones.length; i++) {
            if (i == choose) {
                document.getElementById(choose).style.backgroundColor="red";
            } else {
                document.getElementById(choose).style.backgroundColor="gray";
            }
        }
    }

    function OwnChoice() {
        return(
            <p>You've chosen to pick your own song.</p>
        )
    }
    
    
    return (
        <Popup trigger={<button>Trigger</button>} position="right center">
            <div>
            <DisplayChoices />
            </div>
        </Popup>
    );
}

export default SoundPopup;