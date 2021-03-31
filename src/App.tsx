import React, { ReactElement, useContext } from 'react';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Register from './components/Register/Register';

interface AppProps {}

function App({}: AppProps): ReactElement {
    return (
        <div className="App">
            <Router>
                {sessionStorage.getItem('token') === null && (
                    <Redirect to={{ pathname: '/login' }} />
                )}
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Main} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
