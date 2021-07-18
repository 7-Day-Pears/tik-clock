import React, {useState}  from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

function uploadMusic() {
    //returns array of music available for ringtone after reading from file, is used for "tones" array
}

function SoundPopup() {
    const [tones, setTones] = useState([{name:"apple.mp3", id:34, isClicked: true}, {name:"banana.mp3", id: 5, isClicked:false}, 
    {name:"carrotcake.mp3", id:6, isClicked:false}, {name:"operahauntman.mp3", id: 90, isClicked:false}, 
    {name:"squidwardclarinet.mp3", id: 46, isClicked:false}, {name: "surprise.mp3", id: 87, isClicked:false}]);
    //object: name, id, ?filepath? 
    const [choice, setChoice] = useState("none");

    //if choose == buttonIndex, then indicate clicked
    function DisplayChoices() {
        //choose your own is going to be -1
        
        var buttonName = [];
        for (var i = 0; i < tones.length; i++) {
            buttonName.push(i);
        }
        return (
            <form>
            <input onChange={(e) => HandleChoice(-1, e)} type="radio" name="songChoice" value="ownSong" />
            <label for="ownSong">Choose your own song</label>

            {tones.map((n) => (
                <span>
                    {console.log(n)}
                <input onChange={(e) => HandleChoice(n, e)} type="radio" name="songChoice" id={n.name} value={n.name} />
                <label for={n.name}> {n.name}
                </label>
                </span>
            ))
            }
            </form>
        )
    }

    function HandleChoice (num, e) {
        /*var tone;
        var temp = [];
        for (var i = 0; i < tones.length; i++) {
            tone = tones[i];
            if (i == num) {
                tone.isClicked = true;
            } else {
                tone.isClicked = false;
            }
            temp.push(tone);
        }
        setTones(temp);
        e.preventDefault();
        */
       console.log(num);
       if (num < -1) {
            setChoice(num.name);
       } else {
           setChoice("own song");
       }
       e.preventDefault();
    }

    function OwnChoice() {
        return(
            <p>You've chosen to pick your own song.</p>
        )
    }
    
    function ShowChoice() {
        return(
        <p>{choice}</p>
        );
    }

    return (
        // <Popup trigger={<button>Choose Sound</button>} position="right center">
        //     <div>
        //     <DisplayChoices />
        //     <ShowChoice />
        //     </div>
        // </Popup>
        null
    );
}

export default SoundPopup;