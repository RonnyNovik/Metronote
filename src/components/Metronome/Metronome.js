import React, { Component } from 'react';
import Circle from './Circle/Circle';
import { MetronomeContainer, CircleContainer, BpmDisplayContainer, Pulse, PlayFade } from './Metronome.module.scss';
import BpmControls from '../BpmControls/BpmContols';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.audioRef2 = React.createRef();
    this.CircleContainer = React.createRef();
  }

  state = {
    playing: false,
    count: 0,
    minbpm: 0,
    maxbpm: 260,
    bpm: 120,
    beatsPerMeasure: 4
  }
      
 
  playClick = () => {
    const circleElement = this.CircleContainer.current.children[this.state.count] ;
  
    // -> removing the class
    circleElement.classList.add( Pulse );
   
    
    // -> and re-adding the class
    setTimeout( () => {
      circleElement.classList.remove( Pulse );
    }, 200)
   
    if(this.state.count === 0){
      this.audioRef2.current.play();
    }else{
      this.audioRef.current.play();
    }
    // Keep track of which beat we're on

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
    
  }

  playHandler = () => { 
    // Start a timer with the current BPM
    const CircleContainer = Object.values(this.CircleContainer.current.children);
    CircleContainer.forEach(element => {
       element.classList.add( PlayFade )
    });
    this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
    this.setState({
      count: 0,
      playing: true
      // Play a click "immediately" (after setState finishes)
    }, this.playClick);
  }

  pauseHandler = () => {
      // Stop the timer
      clearInterval(this.timer);
      const CircleContainer = Object.values(this.CircleContainer.current.children);
      CircleContainer.forEach(element => {
         element.classList.remove( PlayFade )
      });
      this.setState({
        playing: false
      });  
  }

  togglePlay = () => {
    if(this.state.playing) {
      this.pauseHandler();
    }else {
      this.playHandler();
    }
  }

  decreaseBPM = () => {
    const { minbpm, bpm } = this.state;
    this.pauseHandler();
    if(bpm > minbpm) {
      this.setState({bpm: bpm -1 });
    } 
    else {
      this.setState({bpm: minbpm });
    }
    
  }

  increaseBPM = () => {
    const { maxbpm, bpm } = this.state;
    this.pauseHandler();
    if(bpm < maxbpm) {
      this.setState({bpm: bpm  + 1 });
    } 
    else {
      this.setState({bpm: maxbpm });
    }


  }
  onChangeBPM = (e) => {
    const newBpm = parseInt(e.target.value);
    console.log(newBpm);
    
    if(!isNaN(newBpm)){
      if( newBpm > this.state.maxbpm){
        alert('Maximum BPM allowed is 260')
        this.setState({bpm: this.state.maxbpm});
      }else{
        this.setState({bpm: newBpm})
      }
    }
    
   
  }
      
    render() {
    
    const Circles = [1,2,3,4].map((i) =>
        <Circle key = {i} number = {i} />
        );
        return (
            <div className = { MetronomeContainer }>

             <div ref = {this.CircleContainer} className = { CircleContainer }>
              {Circles}
             </div>
             <div className={ BpmDisplayContainer }>
               <input onChange={this.onChangeBPM} type='text' value={this.state.bpm} />
               <span>bpm</span>
             </div>
             <BpmControls isPlaying = {this.state.playing} increaseBPM ={this.increaseBPM}  decreaseBPM  = { this.decreaseBPM} togglePlay = {this.togglePlay} />

             <audio ref={this.audioRef} src='sound.wav' autoPlay/> 
             <audio ref={this.audioRef2} src='sound2.wav' autoPlay/> 
            </div>

        );
    }
}

export default Metronome;