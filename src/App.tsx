import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Main from './components/Main/Main';

interface AppProps {}

function App({}: AppProps): ReactElement {
    return (
        <div className="App">
            <Router>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={Main} />
            </Router>
        </div>
    );
}

export default App;
