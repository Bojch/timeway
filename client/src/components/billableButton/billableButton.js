import React, { useState, useEffect } from 'react';

const buttonStyle = {
    cursor: 'pointer',
};

const BillableButton = ({ isBillable, handleButtonClick }) => {
    const [change, setChange] = useState(false);

    function onClick() {
        if (!handleButtonClick) return;

        const changed = !change;
        setChange(changed);
        handleButtonClick(changed);
    }

    useEffect(() => {
        setChange(isBillable);
    }, [isBillable]);

    return (
        <span className={`billable-button ${change ? 'billable' : ''}`} onClick={onClick} style={buttonStyle}>
            $
        </span>
    );
};

export default BillableButton;
