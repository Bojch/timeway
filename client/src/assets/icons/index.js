import React from 'react';

import Time from './Time';
import Plus from './Plus';
import Change from './Change';

const icon = (props) => {
    switch (props.name) {
        case 'Time':
            return <Time {...props} />;
        case 'Plus':
            return <Plus {...props} />;
        case 'Change':
            return <Change {...props} />;
        default:
            return <div />;
    }
};

export default icon;
