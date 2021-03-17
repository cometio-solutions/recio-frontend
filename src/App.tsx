import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import {
    BrowserRouter as Router, Route,
  } from 'react-router-dom';
import Register from './components/Register/Register';
  
interface AppProps {}

function App({}: AppProps) {
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
