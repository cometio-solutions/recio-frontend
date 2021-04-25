import React, { ReactElement, useContext } from 'react';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import Login from './components/Login/Login';
import Main from './components/Main/Main';
import RecruitmentDetails from './components/RecruitmentDetails/RecruitmentDetails';
import RecruitmentList from './components/RecruitmentList/RecruitmentList';
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
                    <Route
                        path="/recruitment/:id"
                        render={({ match }) => (
                            <RecruitmentDetails id={+match.params.id} />
                        )}
                        exact
                    />
                    <Route
                        path="/recruitment"
                        component={RecruitmentList}
                        exact
                    />
                    <Route path="/" component={Main} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
