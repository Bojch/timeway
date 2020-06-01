import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { AppliedRoute } from './router';

import TimeRecord from '../pages/timeRecord';
import Projects from '../pages/projects';

export default () => (
    <main className="col-12 col-xl-10 col-md-9">
        <Switch>
            <AppliedRoute exact path="/record" component={TimeRecord} />
            <AppliedRoute exact path="/projects" component={Projects} />

            {/* Finally, catch all unmatched routes */}
            <Redirect to="/record" />
        </Switch>
    </main>
);
