import 'regenerator-runtime/runtime';

import { all } from 'redux-saga/effects';

import * as CommonSaga from 'src/js/sagas/CommonSaga';

/**
 * The root saga
 */
export default function* rootSaga() {
  yield all([CommonSaga.watchEvents()]);
}
