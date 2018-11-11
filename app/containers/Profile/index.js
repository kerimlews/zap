import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { makeSelectUser } from 'containers/App/selectors';
import { savePassword, clearState } from './actions';
import { makeSelectProfile } from './selectors';

class Profile extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        savePassword: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        clearState: PropTypes.func.isRequired
    }

    state = {
        candidatePassword: '',
        password: '',
        passwordMessage: 'Paswords does not match',
        showPassword: false,
        isDisabled: true
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    inputPassword = (input) => {
        this.password = input;
    }
    inputRepeatPassword = (input) => {
        this.repeatPassword = input;
    }

    comparePassword = () => {
        if (this.password.value !== this.repeatPassword.value)
            this.setState({ isDisabled: true });
        else this.setState({ isDisabled: false, showPassword: false });
    }

    handleRepeatPasswordChange = (event) => {
        this.setState({ repeatPassword: event.target.value, showPassword: true });
        this.comparePassword();
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value, showPassword: true });
        this.comparePassword();
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <form className="border">
                    <div className="p-4">
                        { !isEmpty(this.props.profile.message) && <div className="alert alert-success" role="alert">
                            {this.props.profile.message}
                        </div> }
                        <div className="form-group">
                            <label htmlFor="username">Username: </label>
                            <span id="username"> {this.props.user.username}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <span id="email"> {this.props.user.email}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="Password"
                                placeholder="Password"
                                ref={this.inputPassword}
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">Repeat password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="repeatPassword"
                                placeholder="Repeat password"
                                ref={this.inputRepeatPassword}
                                onChange={this.handleRepeatPasswordChange}
                            />
                            { this.state.showPassword &&
                                <span className="text-danger">{this.state.passwordMessage}</span> }
                        </div>
                        <Button
                            type="primary"
                            value="Save"
                            isLoading={this.state.isDisabled}
                            onClick={() => this.props.savePassword(this.props.user.id, this.state.password)}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    profile: makeSelectProfile()
});

const mapDispatchToProps = (dispatch) => ({
    savePassword: (id, password) => dispatch(savePassword(id, password)),
    clearState: () => dispatch(clearState())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
