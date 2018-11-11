import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Navbar from 'components/Navbar';
import Routes from 'components/Routes';
import { checkToken, checkTokenFail } from './actions';
import { makeSelectAuthenticated, makeSelectUrlParams, makeSelectInitialized } from './selectors';
import { validateToken } from './models';

class App extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        checkToken: PropTypes.func.isRequired,
        checkTokenFail: PropTypes.func.isRequired,
        isInitialized: PropTypes.bool.isRequired
    }

    componentWillMount() {
        this.validateToken();
    }

    componentWillReceiveProps() {
        this.validateToken();
    }

    validateToken = () => {
        const token = localStorage.getItem('token');
        if (validateToken(token))
            this.props.checkToken(token);
        else this.props.checkTokenFail();
    }

    render() {
        return (
            <main>
                <Navbar isAuthenticated={this.props.isAuthenticated} />
                {
                    this.props.isInitialized ?
                        <Routes isAuthenticated={this.props.isAuthenticated} />
                        :
                        <span>Loading....</span>
                }
            </main>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    params: makeSelectUrlParams(),
    isAuthenticated: makeSelectAuthenticated(),
    isInitialized: makeSelectInitialized()
});

const mapDispatchToActions = (dispatch) => ({
    checkToken: (token) => dispatch(checkToken(token)),
    checkTokenFail: () => dispatch(checkTokenFail())
});

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(App));
