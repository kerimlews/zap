import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuthenticated, makeSelectUser } from 'containers/App/selectors';
import List from 'components/List';
import AnswerForm from './components/answer-form';
import {
    changeLikeAnswer,
    changeLikeQuestion,
    fetchAllQuestions,
    fetchAllAnswers
} from './actions';
import {
    makeSelectAllQuestions,
    makeSelectAllAnswers
} from './selectors';

class Questions extends React.Component {
    static propTypes = {
        allAnswers: PropTypes.object.isRequired,
        allQuestions: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        fetchAllQuestions: PropTypes.func.isRequired,
        fetchAllAnswers: PropTypes.func.isRequired,
        changeLikeAnswer: PropTypes.func.isRequired,
        changeLikeQuestion: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    componentWillMount() {
        this.props.fetchAllQuestions();
        this.props.fetchAllAnswers();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    { this.props.isAuthenticated &&
                        <AnswerForm
                            questions={this.props.allQuestions.questions}
                            isAuthenticated={this.props.isAuthenticated}
                            userId={this.props.user.id}
                        />
                    }
                </div>
                <div className="row justify-content-center">
                    <List
                        id="questions"
                        label="All questions"
                        userId={this.props.user.id}
                        model={this.props.allQuestions.questions}
                        isAuthenticated={this.props.isAuthenticated}
                        handleLikeChange={this.props.changeLikeQuestion}
                        isLoading={this.props.allQuestions.isLoading}
                        errorMessage={this.props.allQuestions.errorMessage}
                        showLiker
                    />
                    <List
                        id="answers"
                        label="All answers"
                        model={this.props.allAnswers.answers}
                        userId={this.props.user.id}
                        isAuthenticated={this.props.isAuthenticated}
                        handleLikeChange={this.props.changeLikeAnswer}
                        isLoading={this.props.allAnswers.isLoading}
                        errorMessage={this.props.allAnswers.errorMessage}
                        showLiker
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    isAuthenticated: makeSelectAuthenticated(),
    allQuestions: makeSelectAllQuestions(),
    allAnswers: makeSelectAllAnswers()
});

const mapDispatchToProps = (dispatch) => ({
    changeLikeQuestion: (userId, questionId, like) => dispatch(changeLikeQuestion(userId, questionId, like)),
    changeLikeAnswer: (userId, answerId, like) => dispatch(changeLikeAnswer(userId, answerId, like)),
    fetchAllQuestions: () => dispatch(fetchAllQuestions()),
    fetchAllAnswers: () => dispatch(fetchAllAnswers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
