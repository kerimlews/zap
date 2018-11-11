import React from 'react';
import PropTypes from 'prop-types';
import { validateProp } from 'validation/validator';
import { isEmpty, isFunction } from 'lodash';
import classNames from 'classnames';

export default class TextInput extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.string,
        rules: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        showValidationMessage: PropTypes.bool
    }

    static defaultProps = {
        placeholder: '',
        label: '',
        rules: {},
        showValidationMessage: false,
        value: ''
    }

    state = {
        isModified: this.props.showValidationMessage
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showValidationMessage)
            this.setState({ isModified: true });
    }

    handleChange = (event) => {
        this.setState({ isModified: true });
        if (isFunction(this.props.onChange))
            this.props.onChange(event);
    }

    render() {
        const { id, label, value, placeholder, type, rules } = this.props;
        const { isModified } = this.state;
        const message = isModified && !isEmpty(rules)
            ? validateProp(value, rules)
            : null;
        const isValid = isEmpty(message);
        const inputClass = classNames('form-control', {
            'is-invalid': !isValid
        });

        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    value={value}
                    type={type}
                    className={inputClass}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                />
                {!isValid && <div className="invalid-feedback">{message}</div>}
            </div>
        );
    }
}
