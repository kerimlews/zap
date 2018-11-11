import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { isInstanceValid } from 'validation/validator';
import { saveQuestion } from '../actions';
import { ruleSet } from '../models';

class QuestionForm extends Component {
    static propTypes = {
        saveQuestion: PropTypes.func.isRequired,
        userId: PropTypes.number.isRequired
    }

    state = {
        question: '',
        isSubmitAttempted: false,
        userId: this.props.userId
    }

    handleChangeQuestion = (event) => {
        this.setState({ question: event.target.value });
    }

    saveQuestion = () => {
        this.setState({ isSubmitAttempted: true });
        if (isInstanceValid(this.state, ruleSet))
            this.props.saveQuestion(this.state);
    }

    handleSelectChange = (event) => {
        this.setState({ questionId: event.target.value });
    }

    render() {
        return (
            <div className="form-group d-flex justify-content-center align-items-center border">
                <TextInput
                    id="question"
                    type="text"
                    label="Question"
                    value={this.state.question}
                    onChange={this.handleChangeQuestion}
                    rules={ruleSet.question}
                    showValidationMessage={this.state.isSubmitAttempted}
                />
                <div className="ml-2">
                    <Button
                        type="primary"
                        value="Add question"
                        onClick={this.saveQuestion}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveQuestion: (data) => dispatch(saveQuestion(data))
});

export default connect(null, mapDispatchToProps)(QuestionForm);

