import React from 'react';
import Button from '../Button/Button';
import { ControlsContainer } from './BpmControls.module.scss';
import { faMinusCircle , faPlusCircle, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';

const BpmContols = ( props ) => {
    return (
        <>
        <div className={ ControlsContainer }>
            <Button onClick={ props.decreaseBPM } size='4x' icon={ faMinusCircle } class='minus-button' />
            <Button onClick={ props.increaseBPM } size='4x' icon={ faPlusCircle } class='plus-button'  />
            <Button onClick={ props.togglePlay } size='4x' icon={ props.isPlaying ? faPauseCircle : faPlayCircle } />
        </div>
        </>
    );
};

export default BpmContols;