import React from 'react';
import { CircleStyle } from './Circle.module.scss';

const Circle = (props) => {
    const styles = [CircleStyle, ]
    
    return (
        <div className = { styles.join(' ') }>
        </div>
    );
};

export default Circle;