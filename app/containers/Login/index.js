import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isInstanceValid } from 'validation/validator';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import { isEmpty } from 'lodash';
import { ruleSet } from './models';
import { login, resetState } from './actions';
import { makeLoginSelect } from './selectors';

class Login extends React.Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        errorMessage: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        resetState: PropTypes.func.isRequired
    }

    state = {
        username: '',
        password: '',
        isSubmitAttempted: false
    }

    componentWillMount() {
        this.props.resetState();
    }
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    login = () => {
        event.preventDefault();

        if (isInstanceValid(this.state, ruleSet))
            this.props.login(this.state);
        else this.setState({ isSubmitAttempted: true });
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <form className="border">
                    <div className="p-4">
                        { !isEmpty(this.props.errorMessage) &&
                            <div className="alert alert-danger" role="alert">
                                { this.props.errorMessage }
                            </div> }
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
                            id="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            showValidationMessage={this.state.isSubmitAttempted}
                            rules={ruleSet.password}
                        />
                        <Button
                            onClick={this.login}
                            isLoading={this.props.isLoading}
                            type="submit"
                            className="primary"
                            value="Log in"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data)),
    resetState: () => dispatch(resetState())
});

export default connect(makeLoginSelect(), mapDispatchToProps)(Login);
