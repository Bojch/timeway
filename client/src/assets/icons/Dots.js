import React from 'react';

const Dots = ({ width = '100%', height = '100%', viewBox = '0 0 490 490', className = '', style = {} }) => (
    <svg
        width={width}
        height={height}
        style={style}
        viewBox={viewBox}
        className={`icon icon-dots ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path d="M245 185.5c-32.8 0-59.5 26.7-59.5 59.5s26.7 59.5 59.5 59.5 59.5-26.7 59.5-59.5-26.7-59.5-59.5-59.5zm35 59.5c0 19.3-15.7 35-35 35s-35-15.7-35-35 15.7-35 35-35 35 15.7 35 35zM185.5 430.5c0 32.8 26.7 59.5 59.5 59.5s59.5-26.7 59.5-59.5S277.8 371 245 371s-59.5 26.7-59.5 59.5zm94.5 0c0 19.3-15.7 35-35 35s-35-15.7-35-35 15.7-35 35-35 35 15.7 35 35zM185.5 59.5c0 32.8 26.7 59.5 59.5 59.5s59.5-26.7 59.5-59.5S277.8 0 245 0s-59.5 26.7-59.5 59.5zm94.5 0c0 19.3-15.7 35-35 35s-35-15.7-35-35 15.7-35 35-35 35 15.7 35 35z" />
    </svg>
);

export default Dots;
