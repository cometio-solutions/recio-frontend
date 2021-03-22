import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

interface AppProps {}

function App({}: AppProps): ReactElement {
    return (
        <div className="App">
            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
            </Router>
        </div>
    );
}

export default App;
