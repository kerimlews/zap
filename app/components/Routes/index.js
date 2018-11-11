import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from 'containers/Login';
import HomePage from 'containers/Homepage';
import PropTypes from 'prop-types';
import Registration from 'containers/Registration';
import MyQuestions from 'containers/MyQuestions';
import Questions from 'containers/Questions';
import Profile from 'containers/Profile';
import PrivateRoute from 'components/PrivateRoute';
import NotPrivateRoute from 'components/NotPrivateRoute';

const Routes = ({ isAuthenticated }) => (
    <Switch>
        <NotPrivateRoute path="/login" component={Login} isAuthenticated={isAuthenticated} />
        <PrivateRoute path="/myquestions" component={MyQuestions} isAuthenticated={isAuthenticated} />
        <NotPrivateRoute path="/registration" component={Registration} isAuthenticated={isAuthenticated} />
        <Route path="/questions" component={Questions} />
        <PrivateRoute path="/profile" component={Profile} isAuthenticated={isAuthenticated} />
        <Route path="/" component={HomePage} />
    </Switch>
);

Routes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default Routes;
