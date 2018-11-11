export function mapMostQuestionsLikes(questions) {
    return questions.map((q) => ({
        id: q.id,
        title: q.question,
        count: q.likecount
    }));
}

export function mapMostUsersAnswers(users) {
    return users.map((u) => ({
        id: u.id,
        title: u.username,
        count: u.answercount
    }));
}

export function mapLatestQuestions(questions) {
    return questions.map((m) => ({
        id: m.id,
        title: m.question,
        date: m.createdAt,
        user: m.user.username,
        submodel: m.answers.map((a) => ({
            id: a.id,
            title: a.answer,
            date: a.createdAt,
            user: a.user.username
        }) || []
        ) })
    );
}
