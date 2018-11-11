import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Liker extends React.Component {
    static propTypes = {
        handleLikeChange: PropTypes.func.isRequired,
        like: PropTypes.string,
        userId: PropTypes.number,
        id: PropTypes.number
    }

    static defaultProps = {
        userId: null,
        id: null,
        like: null
    }

    userId = this.props.userId;
    id = this.props.id;

    toggleLike = () => {
        if (this.props.like === 'Yes')
            this.props.handleLikeChange(this.userId, this.id, null);
        else this.props.handleLikeChange(this.userId, this.id, 'Yes');
    }

    toggleUnLike = () => {
        if (this.props.like === 'No')
            this.props.handleLikeChange(this.userId, this.id, null);
        else this.props.handleLikeChange(this.userId, this.id, 'No');
    }

    render() {
        const likeclass = classnames('btn', { 'btn-primary': this.props.like === 'Yes' });
        const unlikeclass = classnames('btn', { 'btn-danger': this.props.like === 'No' });
        return (
            <div className="bg-light">
                <button onClick={this.toggleLike} className={likeclass}><i className="fa fa-thumbs-up" ></i></button>
                <button onClick={this.toggleUnLike} className={unlikeclass}><i className="fa fa-thumbs-down"></i></button>
            </div>
        );
    }
}

export default Liker;

