import React from 'react';

const FourDots = ({ width = '100%', height = '100%', viewBox = '0 0 256 512', className = '', style = {} }) => (
    <svg
        width={width}
        height={height}
        style={style}
        viewBox={viewBox}
        className={`icon icon-fourdots ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <circle cx="128" cy="64" r="40" />
        <circle cx="128" cy="192" r="40" />
        <circle cx="128" cy="320" r="40" />
        <circle cx="128" cy="448" r="40" />
    </svg>
);

export default FourDots;
