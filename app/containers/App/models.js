import { isEmpty } from 'lodash';

export function validateToken(token) {
    if (isEmpty(token)) return false;
    return true;
}
