import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, CardBody, Card } from 'reactstrap';
import Liker from 'components/Liker';
import { formatDate } from 'common/util';
import { isEmpty } from 'lodash';
import classnames from 'classnames';

class List extends React.Component {
    static propTypes = {
        model: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        handleLikeChange: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        errorMessage: PropTypes.string.isRequired,

        isLoadMore: PropTypes.bool,
        showLiker: PropTypes.bool,

        userId: PropTypes.number,
        handleLoadMore: PropTypes.func
    }

    static defaultProps = {
        showLiker: false,
        handleLoadMore: null,
        userId: null,
        isLoadMore: false
    }

    state = {
        isToggle: false,
        loadcount: 0
    }

    componentWillMount() {
        this.setState({ loadcount: this.state.loadcount + 2 });
    }


    getLike = (id, likemodel) => {
        if (likemodel != null) {
            if (likemodel.length > 0) {
                if (likemodel.some((l) => l.user_id === this.props.userId && l.key === id))
                    return likemodel.find((l) => l.user_id === this.props.userId && l.key === id).like;
            }
        }
        return null;
    }

    toggle = () => {
        this.setState({ isToggle: !this.state.isToggle });
    }

    submodelList = (model) => (
        <div className="list-group list-group-flush">
            {
                model.map((m) => (
                    <div key={m.id} className="list-group-item">
                        <span className="mr-3">{m.title}</span>
                        <div>
                            <span className="font-weight-bold">
                                Time : {formatDate(m.date)}
                            </span>
                            <span className="ml-4 badge badge-dark">{m.user}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );

    handleLoadMore = () => {
        this.setState({ loadcount: this.state.loadcount + 2 });
        this.props.handleLoadMore(this.state.loadcount);
    }

    submodelLikes = (model) => {
        const likeClass = classnames('ml-4 badge', {
            'badge-primary': model.like === 'Yes',
            'badge-danger': model.like === 'No'
        });
        return (
            <div className="list-group list-group-flush">
                {
                    model.map((m) => (
                        <div key={m.id} className="list-group-item">
                            <span className="list-group-item d-flex justify-content-between align-items-center">
                                {m.user}
                            </span>
                            <span className={likeClass}>{m.like}</span>
                        </div>
                    ))
                }
            </div>
        );
    };

    renderToggleButton = (model, name) => {
        if (model.length > 0)
            return (
                <div>
                    <button className="btn btn-outline-info" onClick={this.toggle}>See {name}</button>
                    <Collapse isOpen={this.state.isToggle}>
                        <Card>
                            <CardBody>
                                {name === 'answers' &&
                                        this.submodelList(model) }
                                {name === 'likes' &&
                                        this.submodelLikes(model) }
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            );
        return (<span className="badge badge-danger">No {name}</span>);
    };

    renderLoadMoreBtn = () => (
        this.props.isLoadMore &&
            <button
                onClick={this.handleLoadMore}
                className="btn btn-link"
            >
                Load more...
            </button>
    )

    renderCardModels = () => (
        this.props.model.length > 0 ?
            this.props.model.map((m) => {
                const like = this.getLike(m.id, m.likemodel);
                const check = this.props.isAuthenticated && this.props.showLiker;
                return (
                    <div key={m.id} className="card border-secondary mb-3">
                        <div className="card-body text-secondary">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title">{m.title}</h5>
                                <span className="badge badge-success">{m.user}</span>
                            </div>
                            <p className="card-text">
                                Date: <span className="className className-primary">
                                    {formatDate(m.date)}
                                </span>
                            </p>
                            { m.question && <p className="card-text">
                                <span className="className className-primary">
                                    {m.question}
                                </span>
                            </p> }
                            { check &&
                                <Liker
                                    like={like}
                                    userId={this.props.userId}
                                    id={m.id}
                                    handleLikeChange={this.props.handleLikeChange}
                                />
                            }
                            {(m.submodel &&
                                this.renderToggleButton(m.submodel, 'answers'))}
                            {(m.subliker &&
                                this.renderToggleButton(m.subliker, 'likes'))}
                        </div>
                    </div>);
            })
            :
            <span>No {this.props.id.toLowerCase()}</span>
    )

    renderErrorMessage = () => (
        !isEmpty(this.props.errorMessage) &&
            <div className="alert alert-danger" role="alert">
                {this.props.errorMessage}
            </div>
    )

    render() {
        return (
            <div className="col-md-4">
                {
                    this.renderErrorMessage()
                }
                <label>{this.props.label}: </label>
                {
                    this.props.isLoading ?
                        <i>Loading</i>
                        :
                        this.renderCardModels()
                }
                {
                    this.renderLoadMoreBtn()

                }
            </div>
        );
    }
}

export default List;
