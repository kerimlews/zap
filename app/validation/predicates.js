import { isEmpty } from 'lodash';

export function beNotEmpty(value) {
    return !isEmpty(value);
}

export function beLongerThan(param) {
    return (value) => value != null && value.length > param;
}

export function beValidEmail(email) {
    if (isEmpty(email)) return true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
