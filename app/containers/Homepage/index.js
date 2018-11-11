import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuthenticated } from 'containers/App/selectors';
import List from 'components/List';
import GroupList from 'components/GroupList';
import {
    changeLike,
    fetchLatestQuestions,
    fetchQuestionsWithMostLikes,
    fetchUsersWithMostAnswers,
    clearLatestQuestions
} from './actions';
import {
    makeSelectLatestQuestions,
    makeSelectLikesQuestions,
    makeSelectMostUserAnswer
} from './selectors';

class HomePage extends React.Component {
    static propTypes = {
        latestQuestions: PropTypes.object.isRequired,
        likesQuestions: PropTypes.object.isRequired,
        mostAnswerUsers: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        fetchLatestQuestions: PropTypes.func.isRequired,
        fetchQuestionsWithMostLikes: PropTypes.func.isRequired,
        fetchUsersWithMostAnswers: PropTypes.func.isRequired,
        clearLatestQuestions: PropTypes.func.isRequired,
        changeLike: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.fetchLatestQuestions(0);
        this.props.fetchQuestionsWithMostLikes();
        this.props.fetchUsersWithMostAnswers();
    }

    componentWillUnmount() {
        this.props.clearLatestQuestions();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <List
                        id="questions"
                        label="Latest questions"
                        errorMessage={this.props.latestQuestions.errorMessage}
                        isLoading={this.props.latestQuestions.isLoading}
                        model={this.props.latestQuestions.questions}
                        isAuthenticated={this.props.isAuthenticated}
                        handleLikeChange={this.props.changeLike}
                        handleLoadMore={this.props.fetchLatestQuestions}
                        isLoadMore
                    />
                    <GroupList
                        label="Questions with most likes"
                        typeCount="Likes"
                        model={this.props.likesQuestions.questions}
                        errorMessage={this.props.latestQuestions.errorMessage}
                        isLoading={this.props.latestQuestions.isLoading}
                    />
                    <GroupList
                        label="Users with most answers"
                        typeCount="Answers"
                        model={this.props.mostAnswerUsers.users}
                        errorMessage={this.props.latestQuestions.errorMessage}
                        isLoading={this.props.latestQuestions.isLoading}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isAuthenticated: makeSelectAuthenticated(),
    latestQuestions: makeSelectLatestQuestions(),
    likesQuestions: makeSelectLikesQuestions(),
    mostAnswerUsers: makeSelectMostUserAnswer()
});

const mapDispatchToProps = (dispatch) => ({
    changeLike: (userId, questionId, like) => dispatch(changeLike(userId, questionId, like)),
    fetchLatestQuestions: (loadcount) => dispatch(fetchLatestQuestions(loadcount)),
    fetchQuestionsWithMostLikes: () => dispatch(fetchQuestionsWithMostLikes()),
    fetchUsersWithMostAnswers: () => dispatch(fetchUsersWithMostAnswers()),
    clearLatestQuestions: () => dispatch(clearLatestQuestions())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
