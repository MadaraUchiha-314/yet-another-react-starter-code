import { combineReducers } from 'redux';

import { showSnagScreen } from 'src/js/actions/Actions';
import { errorCodes, errorMessages } from 'src/js/utils/ErrorUtils';

/* Will be used only in debug environments and when query param unitTestRecord=true */
import { addTestCase } from 'src/js/utils/UnitTestUtils';
import { environments } from 'src/js/utils/Enums';
import { getCurrentEnvironment, getParameterByName } from 'src/js/utils/Utils';

import { common } from './CommonReducer';

const appReducer = combineReducers({
  Common: common,
});

/**
 * The root of all reducers. Hopefully not the root of all problems
 * @param {object} state - The current state of the reducer. If nothing is provided, it defaultst to initial state
 * @param {object} action - The action being dispatched
 * @returns {object} - The new state of the reducer
 */
export default function rootReducer(state, action) {
  try {
    const newState = appReducer(state, action);
    /* This is to record the test cases */
    if (
      getCurrentEnvironment() !== environments.PROD &&
      getParameterByName('unitTestRecord') === 'true'
    ) {
      addTestCase(state, action, newState);
    }
    return newState;
  } catch (error) {
    const newState = appReducer(
      state,
      showSnagScreen(errorCodes.REDUCER_LOGIC_ERROR, errorMessages.REDUCER_LOGIC_ERROR, error),
    );
    /* This is to record the test cases */
    if (
      getCurrentEnvironment() !== environments.PROD &&
      getParameterByName('unitTestRecord') === 'true'
    ) {
      addTestCase(state, action, newState);
    }
    return newState;
  }
}
