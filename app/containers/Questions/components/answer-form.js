import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { isInstanceValid } from 'validation/validator';
import { saveAnswer } from '../actions';
import { ruleSet } from '../models';

class AnswerForm extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        saveAnswer: PropTypes.func.isRequired,
        questions: PropTypes.array.isRequired,
        userId: PropTypes.number.isRequired
    }

    state = {
        answer: '',
        isSubmitAttempted: false,
        questionId: null,
        userId: this.props.userId
    }

    handleChangeAnswer = (event) => {
        this.setState({ answer: event.target.value });
    }

    saveAnswer = () => {
        this.setState({ isSubmitAttempted: true });
        if (isInstanceValid(this.state, ruleSet) && this.state.questionId)
            this.props.saveAnswer(this.state);
    }

    handleSelectChange = (event) => {
        this.setState({ questionId: event.target.value });
    }

    render() {
        if (!this.props.isAuthenticated)
            return null;
        return (
            <div className="form-group">
                <select onChange={(event) => this.handleSelectChange(event)} className="custom-select">
                    <option defaultValue>Select question</option>
                    {
                        this.props.questions.map((q) => (
                            <option key={q.id} value={q.id}>{q.title}</option>
                        ))
                    }
                </select>
                <TextInput
                    id="answer"
                    type="text"
                    label="Answer"
                    value={this.state.answer}
                    onChange={this.handleChangeAnswer}
                    rules={ruleSet.answer}
                    showValidationMessage={this.state.isSubmitAttempted}
                />
                <Button
                    type="primary"
                    value="Add answer"
                    onClick={this.saveAnswer}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveAnswer: (data) => dispatch(saveAnswer(data))
});

export default connect(null, mapDispatchToProps)(AnswerForm);

