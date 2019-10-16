import React from 'react';
import styles from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ( props ) => {

    //
    return (
        <>
           <button onClick={ props.onClick } className={ styles[props.class] }><FontAwesomeIcon icon={ props.icon } size = { props.size }/></button> 
        </>
    );
};

export default Button;