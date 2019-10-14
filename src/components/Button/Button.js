import React from 'react';
import styles from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
    const contentToggle = props.icon ? <FontAwesomeIcon icon={ props.icon } size = {props.size}/> : props.text;
    return (
        <>
           <button onClick={props.onClick} className={styles[props.class]}>{ contentToggle }</button> 
        </>
    );
};

export default Button;