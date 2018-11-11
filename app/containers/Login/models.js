import { must } from 'validation/rule-builder';
import { beNotEmpty } from 'validation/predicates';

export const ruleSet = {
    username: must(beNotEmpty).withMessage('Username is required'),
    password: must(beNotEmpty)
        .withMessage('Password is required')
};
