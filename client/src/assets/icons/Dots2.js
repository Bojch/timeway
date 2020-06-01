import React from 'react';

const Dots2 = ({ width = '100%', height = '100%', viewBox = '0 0 512 512', className = '', style = {} }) => (
    <svg
        width={width}
        height={height}
        style={style}
        viewBox={viewBox}
        className={`icon icon-dots2 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <circle cx="256" cy="256" r="64" />
        <circle cx="256" cy="448" r="64" />
        <circle cx="256" cy="64" r="64" />
    </svg>
);

export default Dots2;
