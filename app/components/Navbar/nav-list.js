import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

function removeToken(logout) {
    localStorage.removeItem('token');
    logout();
}

const NavList = ({ isAuthenticated, logout }) => (
    <ul className="navbar-nav">
        <li className="nav-item">
            <NavLink className="nav-link" to="/">
                Homepage
                <span className="sr-only">(current)</span>
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/questions">
                Questions
            </NavLink>
        </li>
        { isAuthenticated && <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
                Profile
            </NavLink>
        </li> }
        { isAuthenticated && <li className="nav-item">
            <NavLink className="nav-link" to="/myquestions">
                My questions
            </NavLink>
        </li> }
        { isAuthenticated && <li className="nav-item">
            <button onClick={() => removeToken(logout)} className="btn btn-outline-danger">
                Log out
            </button>
        </li> }
        { !isAuthenticated && <li className="nav-item">
            <NavLink className="btn btn-outline-success" to="/registration">
                Registrer
            </NavLink>
        </li> }
        { !isAuthenticated && <li className="nav-item">
            <NavLink className="btn btn-outline-primary" to="/login">
                Login
            </NavLink>
        </li> }
    </ul>
);

NavList.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

const mapDispatchToActions = (dispatch) => ({
    logout: () => dispatch(push('/login'))
});

export default connect(null, mapDispatchToActions)(NavList);
