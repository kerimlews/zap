import { must } from 'validation/rule-builder';
import { beNotEmpty } from 'validation/predicates';

export function mapQuestions(questions) {
    return questions.map((q) => ({
        id: q.id,
        title: q.question,
        date: q.createdAt,
        user: q.user.username,
        submodel: q.answers.map((a) => ({
            id: a.id,
            title: a.answer,
            date: a.createdAt,
            user: a.user.username
        })) || [],
        likemodel: q.user_questions.map((l) => ({
            user_id: l.user_id,
            key: l.question_id,
            like: l.isLike,
            user: l.user.username
        })) || []
    }));
}

export function mapAnswers(answers) {
    return answers.map((a) => ({
        id: a.id,
        title: a.answer,
        date: a.createdAt,
        user: a.user.username,
        question: a.question.question,
        likemodel: a.user_answers.map((l) => ({
            user_id: l.user_id,
            key: l.answer_id,
            like: l.isLike,
            user: l.user.username
        })) || []
    }));
}

export const ruleSet = {
    answer: must(beNotEmpty).withMessage('Answer is required')
};
