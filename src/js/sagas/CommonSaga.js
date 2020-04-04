import 'regenerator-runtime/runtime';
import * as ActionTypes from 'src/js/actions/ActionTypes';
import * as ActionCreators from 'src/js/actions/Actions';
import { takeEvery, select, put } from 'redux-saga/effects';
import { getLogType, removePIIData } from 'src/js/utils/LogUtils';
import { getLogger } from 'src/js/utils/AppUtils';
import { logTypes, plaformTypes, maxApiRetryLimit } from 'src/js/utils/Enums';
import { errorCodes } from 'src/js/utils/ErrorUtils';

/* global window */

/* eslint-disable require-yield */
/**
 * The saga which logs all the actions dispatched
 * @param {object} action - The action being dispatched
 */
export function* logEvent(action) {
  const actionLogType = getLogType(action);
  const cleanedAction = removePIIData(action);

  switch (actionLogType) {
    case logTypes.LOG:
      getLogger().log(action.type, cleanedAction);
      break;
    case logTypes.DEBUG:
      getLogger().debug(action.type, cleanedAction);
      break;
    case logTypes.WARN:
      getLogger().warn(action.type, cleanedAction);
      break;
    case logTypes.ERROR:
      getLogger().error(action.type, cleanedAction);
      break;
    default:
      getLogger().log(action.type, cleanedAction);
      break;
  }
}
/* eslint-enable require-yield */
/**
 * The watcher for all the actions dispatched
 */
export function* watchEvents() {
  yield takeEvery('*', logEvent);
}

/**
 * The saga which dispatches the do action on Snag Screen Try Again
 */
export function* onSnagTryAgain() {
  const state = yield select();
  if (state.Common.platform === plaformTypes.WEB) {
    window.location.reload();
  } else if (
    state.Common.errorType === errorCodes.API_ERROR &&
    state.Common.retryCount < maxApiRetryLimit
  ) {
    /*
     * If we came to the Snag Screen Due to an API error, we will make that same API call again.
     */
    yield put(state.Common.lastAPICallAction);
  } else {
    yield put(ActionCreators.closeWindow());
  }
}

/**
 * The watcher for all the actions dispatched
 */
export function* watchForSnagRetry() {
  yield takeEvery(ActionTypes.ON_SNAG_RETRY, onSnagTryAgain);
}
