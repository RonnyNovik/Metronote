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

    // Choose the desired circle according to the beat
    const circleElement = this.CircleContainer.current.children[this.state.count];

    // Add the Pulse class to invoke a pulse animation
    circleElement.classList.add(Pulse);

    // Remove the animation right after to trigger the pulse animation in reverse
    setTimeout(() => {
      circleElement.classList.remove(Pulse);
    }, 200);

    // If it is the first beat, play its designated sound. else, play the regular beat
    if (this.state.count === 0) {
      this.audioRef2.current.play();
    } else {
      this.audioRef.current.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));

  }

  playHandler = () => {
    // Create an array of all the Circle elements
    const CircleContainer = Object.values(this.CircleContainer.current.children);

    // Animate a fade-out on each circle on play
    CircleContainer.forEach(element => {
      element.classList.add(PlayFade)
    });

    // Start a timer with the current BPM
    this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);

    this.setState({
      count: 0,
      playing: true
      // Play a click "immediately" (after setState finishes)
    }, this.playClick);

  }

  pauseHandler = () => {

    // Create an array of all the Circle elements
    const CircleContainer = Object.values(this.CircleContainer.current.children);

    // Animate a fade-out on each circle on play
    CircleContainer.forEach(element => {
      element.classList.remove(PlayFade)
    });

    // Stop the timer
    clearInterval(this.timer);
    this.setState({
      playing: false
    });
  }

  togglePlay = () => {

    // Invoke play or pause according to state
    if (this.state.playing) {
      this.pauseHandler();
    } else {
      this.playHandler();
    }
  }

  decreaseBPM = () => {
    const { minbpm, bpm } = this.state;
    //Pause the beat to reset the beat timer
    this.pauseHandler();
    // If the new bpm is above 0, decrement by 1. else, set to 0
    if (bpm > minbpm) {
      this.setState({ bpm: bpm - 1 }, this.playHandler);
    } else {
      this.setState({ bpm: minbpm }, this.playHandler);
    }
  }

  increaseBPM = () => {
    const { maxbpm, bpm } = this.state;
    //Pause the beat to reset the beat timer
    this.pauseHandler();
    // If the new bpm is below 260, increment by 1. else, set to 260
    if (bpm < maxbpm) {
      this.setState({ bpm: bpm + 1 }, this.playHandler);

    } else {
      this.setState({ bpm: maxbpm }, this.playHandler);
    }
  }
  onChangeBPM = (e) => {

    // On input change, get the value of the input and parse it into integer and assign it to newBpm
    const newBpm = e.target.value !== '' ? parseInt(e.target.value) : '';

    //Pause the beat to reset the beat timer
    this.pauseHandler();

    // If newBpm is a number or a blank input, set the state according to the new value
    if (!isNaN(newBpm) || newBpm === '') {

      if (newBpm > this.state.maxbpm) {
        // If newBpm is above 260, change it to 260 and notify the user. else, set the state of bpm as usual.
        alert('Maximum BPM allowed is 260')
        this.setState({ bpm: this.state.maxbpm }, this.playHandler);

      } else {
        this.setState({ bpm: newBpm }, this.playHandler);
      }
    }

  }

  render() {
    //Create 4 circles
    const Circles = [1, 2, 3, 4].map((i) =>
      <Circle key={i} number={i} />
    );
    return (
      <div className={MetronomeContainer}>

        <div ref={this.CircleContainer} className={CircleContainer}>
          {Circles}
        </div>

        <div className={BpmDisplayContainer}>
          <input onChange={this.onChangeBPM} type='text' value={this.state.bpm} />
          <span>bpm</span>
        </div>

        <BpmControls
          isPlaying={this.state.playing}
          increaseBPM={this.increaseBPM}
          decreaseBPM={this.decreaseBPM}
          togglePlay={this.togglePlay} />

        <audio ref={this.audioRef} src='sound.wav' />
        <audio ref={this.audioRef2} src='sound2.wav' />

      </div>

    );
  }
}

export default Metronome;