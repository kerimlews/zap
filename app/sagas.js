// import appSagas from 'containers/App/sagas';

import appSaga from 'containers/App/sagas';
import homepageSaga from 'containers/Homepage/sagas';
import loginSaga from 'containers/Login/sagas';
import profileSaga from 'containers/Profile/sagas';
import questionsSaga from 'containers/Questions/sagas';
import registrationSaga from 'containers/Registration/sagas';
import myQuestionsSaga from 'containers/MyQuestions/sagas';

export default [
    // ...appSagas
    ...appSaga,
    ...homepageSaga,
    ...loginSaga,
    ...profileSaga,
    ...questionsSaga,
    ...registrationSaga,
    ...myQuestionsSaga
];
