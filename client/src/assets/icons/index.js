import React from 'react';

import Time from './Time';
import Time2 from './Time2';
import Plus from './Plus';
import Change from './Change';
import Project from './Project';
import Project2 from './Project2';
import Dots from './Dots';
import Dots2 from './Dots2';
import FourDots from './FourDots';
import List from './List';
import Close from './Close';

const icon = (props) => {
    switch (props.name) {
        case 'Time':
            return <Time {...props} />;
        case 'Time2':
            return <Time2 {...props} />;
        case 'Plus':
            return <Plus {...props} />;
        case 'Change':
            return <Change {...props} />;
        case 'Project':
            return <Project {...props} />;
        case 'Project2':
            return <Project2 {...props} />;
        case 'Dots':
            return <Dots {...props} />;
        case 'Dots2':
            return <Dots2 {...props} />;
        case 'FourDots':
            return <FourDots {...props} />;
        case 'List':
            return <List {...props} />;
        case 'Close':
            return <Close {...props} />;
        default:
            return <div />;
    }
};

export default icon;
