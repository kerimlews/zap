import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import List from 'components/List';
import { makeSelectAuthenticated, makeSelectUser } from 'containers/App/selectors';
import QuestionForm from './components/question-form';
import { fetchMyQuestions, changeLike, clearState } from './actions';
import { makeSelectMyQuestions } from './selectors';

class MyQuestions extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        myQuestions: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        fetchMyQuestions: PropTypes.func.isRequired,
        changeLike: PropTypes.func.isRequired,
        clearState: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentWillMount() {
        this.props.fetchMyQuestions(this.props.user.id, 0);
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    handleLoadMore = (loadcount) => {
        this.props.fetchMyQuestions(this.props.user.id, loadcount);
    }

    render() {
        return (
            <div>
                <QuestionForm
                    userId={this.props.user.id}
                />
                <div className="d-flex justify-content-center align-items-sm-center">
                    <List
                        id="my questions"
                        label="My questions"
                        userId={this.props.user.id}
                        isLoading={this.props.myQuestions.isLoading}
                        errorMessage={this.props.myQuestions.errorMessage}
                        model={this.props.myQuestions.questions}
                        isAuthenticated={this.props.isAuthenticated}
                        handleLikeChange={this.props.changeLike}
                        handleLoadMore={this.handleLoadMore}
                        isLoadMore
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isAuthenticated: makeSelectAuthenticated(),
    user: makeSelectUser(),
    myQuestions: makeSelectMyQuestions()
});

const mapDispatchToProps = (dispatch) => ({
    fetchMyQuestions: (id, loadcount) => dispatch(fetchMyQuestions(id, loadcount)),
    changeLike: (userId, questionId, like) => dispatch(changeLike(userId, questionId, like)),
    clearState: () => dispatch(clearState())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions);
