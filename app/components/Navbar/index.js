import React from 'react';
import PropTypes from 'prop-types';
import NavList from './nav-list';

const Navbar = ({ isAuthenticated }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
        <NavList isAuthenticated={isAuthenticated} />
    </nav>
);

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default Navbar;
