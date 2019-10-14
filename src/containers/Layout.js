import React, { Component } from 'react';
import { MainContainer }from './Layout.module.scss';
import Metronome from '../components/Metronome/Metronome';

class Layout extends Component {
    render() {
        return (
            <div className={MainContainer}>
                <h1>metronote<span style={{color: '#d1fb42'}}>.</span> </h1>
                <Metronome />
            </div>
        );
    }
}

export default Layout;