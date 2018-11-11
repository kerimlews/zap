import { must } from 'validation/rule-builder';
import { beNotEmpty } from 'validation/predicates';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const ruleSet = {
    username: must(beNotEmpty).withMessage('Username is required'),
    email: must(beNotEmpty).withMessage('Email is required')
        .and(validateEmail)
        .withMessage('Email is not valid')
};
