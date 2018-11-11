import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const GroupList = (props) => (
    <div className="col-md-4">
        {
            !isEmpty(props.errorMessage) &&
            <div className="alert alert-danger" role="alert">
                {props.errorMessage}
            </div>
        }
        <label>{props.label} :</label>
        {
            props.isLoading ?
                <span>Loading</span>
                :
                props.model.map((m) => (
                    <div key={m.id} className="card text-black bg-light mb-3">
                        <div className="card-header">{m.title}</div>
                        <div className="list-group">
                            <h3 className="list-group-item d-flex justify-content-between align-items-center">
                                {props.typeCount}
                                <span className="badge badge-primary badge-pill">
                                    {m.count}
                                </span>
                            </h3>
                        </div>
                    </div>
                ))
        }
    </div>
);

GroupList.propTypes = {
    label: PropTypes.string.isRequired,
    model: PropTypes.array.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    typeCount: PropTypes.string.isRequired

};

export default GroupList;
