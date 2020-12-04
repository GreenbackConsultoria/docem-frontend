import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LogonAluno from './pages/LogonAluno';
import LogonIES from './pages/LogonIES';
import Profile from './pages/Profile';

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact component={LogonAluno} />
        <Route path="/ies" exact component={LogonIES} />
        <Route path="/ies/profile" exact component={Profile} />

      </Switch>
    </BrowserRouter>
  )
}
