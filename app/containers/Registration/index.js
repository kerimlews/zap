import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { isInstanceValid } from 'validation/validator';
import { isEmpty } from 'lodash';
import { ruleSet } from './models';
import { saveUser, resetState } from './actions';
import { makeSelectRegistration } from './selectors';

class Registration extends React.Component {
    static propTypes = {
        saveUser: PropTypes.func.isRequired,
        errorMessage: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        resetState: PropTypes.func.isRequired
    }

    state = {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        passwordMessage: '',
        isSubmitAttempted: false,
        isDisabled: true
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    unmap = () => ({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
    });

    inputPassword = (input) => {
        this.password = input;
    }
    inputRepeatPassword = (input) => {
        this.repeatPassword = input;
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value, passwordMessage: 'Password does not match' });
        this.comparePassword();
    }
    handleRepeatPasswordChange = (event) => {
        this.setState({ repeatPassword: event.target.value, passwordMessage: 'Password does not match' });
        this.comparePassword();
    }

    comparePassword = () => {
        if (this.password.value !== this.repeatPassword.value)
            this.setState({ isDisabled: true });
        else this.setState({ isDisabled: false });
    }

    saveUser = () => {
        if (isInstanceValid(this.state, ruleSet) && !this.state.isDisabled)
            this.props.saveUser(this.unmap());
        else this.setState({ isSubmitAttempted: true });
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <form className="border">
                    {
                        !isEmpty(this.props.errorMessage) &&
                        <div className="alert alert-danger" role="alert">
                            { this.props.errorMessage }
                        </div>
                    }
                    <div className="p-4">
                        <TextInput
                            id="username"
                            type="text"
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            showValidationMessage={this.state.isSubmitAttempted}
                            rules={ruleSet.username}
                        />
                        <TextInput
                            id="email"
                            type="text"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            showValidationMessage={this.state.isSubmitAttempted}
                            rules={ruleSet.email}
                        />
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
                            { this.state.isSubmitAttempted &&
                                <span className="text-danger">Password is required</span> }
                            { this.state.isDisabled &&
                                <span className="text-danger">{this.state.passwordMessage}</span> }
                        </div>
                        <Button
                            isLoading={this.state.isDisabled && this.props.isLoading}
                            onClick={this.saveUser}
                            type="primary"
                            value="Sign in"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveUser: (user) => dispatch(saveUser(user)),
    resetState: () => dispatch(resetState())
});

export default connect(makeSelectRegistration(), mapDispatchToProps)(Registration);
