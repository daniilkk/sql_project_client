import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { Main } from './pages/Main';
import { Special } from './pages/Special';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/special">
                    <Special />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
