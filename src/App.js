import React from 'react';
import Metronome from './components/Metronome/Metronome';
import './App.scss';

function App() {
  return (
    <div className="App">
     <h1 style={{margin: '0 0 0 2.5vw'}}>metronote<span style={{color: '#d1fb42'}}>.</span> </h1>
     <Metronome />
    </div>
  );
}

export default App;
