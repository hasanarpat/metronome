let bpm =90;

const notes = ['a', 'b', 'c', 'd', 'e', 'f','g']

let metronomeInterval;
let metronomePlaying = false;
let currentSoundState = 'letter';

const updateBpmText = (_bpm)=>{

    document.getElementById('bpm').innerHTML=_bpm;
}
const updateBpmSlider = (_bpm)=>{
    document.getElementById("bpm-slider").value=`${_bpm}`
}
const updateBpm =(_bpm)=>{
    
    clearInterval(metronomeInterval)
    bpm=_bpm
    console.log(_bpm)
    updateBpmText(_bpm)
    updateBpmSlider(_bpm)
    if(metronomePlaying){
        playMetronome()
    }
    
}

const stopMetronome =()=>{
    metronomePlaying= false;
    document.getElementById("start").style.display='block';
    document.getElementById("stop").style.display='none';
    clearInterval(metronomeInterval)
}
const playMetronome = ()=>{
    metronomePlaying= true;
    document.getElementById("start").style.display='none';
    document.getElementById("stop").style.display='block';

    metronomeInterval = setInterval(function() {
        
        if(currentSoundState === 'letter'){
            const randomNoteString =notes[[Math.floor(Math.random()*notes.length)]];
            console.log(randomNoteString)
            const randomNoteSound = new Audio(`./sounds/note/${randomNoteString}.wav`);
            randomNoteSound.play();
            currentSoundState='click';
            document.getElementById("currentNode").innerHTML = randomNoteString.toUpperCase();
        }
        else{     
            const click = new Audio('./sounds/metronome-click.wav');
            click.play();
            currentSoundState='letter';
        }
    },Math.round(60000 / bpm))
}

document.addEventListener('DOMContentLoaded',()=>{
    updateBpmText(bpm)
    updateBpmSlider(bpm)
    
    document.getElementById("start").addEventListener("click", playMetronome)
    document.getElementById("bpm-minus").addEventListener("click",()=> updateBpm(bpm - 1))
    document.getElementById("bpm-plus").addEventListener("click",()=>updateBpm(bpm + 1))
    
    document.getElementById("bpm-slider").addEventListener("input",(evt)=>updateBpm(evt.target.valueAsNumber))

    document.getElementById("stop").addEventListener("click",()=>stopMetronome())

});