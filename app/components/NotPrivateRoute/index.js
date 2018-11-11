import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotPrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const render = (params) => {
        if (!isAuthenticated) return <Component {...params} />;
        return <Redirect to={{ pathname: '/profile', state: { from: params.location } }} />;
    };
    return <Route {...rest} render={render} />;
};

NotPrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default NotPrivateRoute;
