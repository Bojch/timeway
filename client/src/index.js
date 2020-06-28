import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import NotificationCenterProvider from './components/mixstrap/NotificationCenter/NotificationCenterProvider';

import './assets/styles/main.scss';

ReactDOM.render(
    <BrowserRouter>
        <NotificationCenterProvider>
            <App />
        </NotificationCenterProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
