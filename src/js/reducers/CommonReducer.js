import * as ActionTypes from 'src/js/actions/ActionTypes';
import { widgetModes, plaformTypes } from 'src/js/utils/Enums';
import { errorMessages } from 'src/js/utils/ErrorUtils';

/**
 * Initial state of the Common Store
 */
export const initState = {
  numApiReqActive: 0,
  widgetMode: widgetModes.RENDER,
  isSnagScreen: false,
  errorType: null,
  errorPayload: null,
  errorMessage: errorMessages.UNKNOWN_ERROR,
  lastAPICallAction: null,
  retryCount: 0,
  platform: plaformTypes.WEB,
};

/**
 * Sets the API call as initiated
 * @param {object} state - The current state of the reducer
 * @returns {object} The new state of the reducer
 */
export function handleApiCallInitiated(state) {
  const activeRequests = state.numApiReqActive;
  /* When API call is initiated, the widget will always be in LOADING mode */
  return {
    ...state,
    numApiReqActive: activeRequests + 1,
    widgetMode: widgetModes.LOADING,
  };
}

/**
 * Sets the API call as success
 * @param {object} state - The current state of the reducer
 * @returns {object} The new state of the reducer
 */
export function handleApiCallSuccess(state) {
  let activeRequests = state.numApiReqActive;
  let mode;
  if (activeRequests > 0) {
    activeRequests -= 1;
  }
  /* If no API calls are left, render the widget */
  if (activeRequests === 0) {
    mode = widgetModes.RENDER;
  } else {
    mode = widgetModes.LOADING;
  }
  return {
    ...state,
    numApiReqActive: activeRequests,
    widgetMode: mode,
  };
}

/**
 * Sets the snag-screen as true
 * @param {object} state - The current state of the reducer
 * @param {object} action - The acttion to handle snag situation
 * @returns {object} The new state of the reducer
 */
export function handleSnagSituation(state, action) {
  return {
    ...state,
    isSnagScreen: true,
    errorPayload: action.errorPayload,
    errorMessage: action.errorMessage,
    errorType: action.errorType,
  };
}

/**
 * Sets the snag-screen as false
 * @param {object} state - The current state of the reducer
 * @returns {object} The new state of the reducer
 */
export function removeSnagScreen(state) {
  return {
    ...state,
    isSnagScreen: false,
    errorPayload: null,
    errorMessage: '',
  };
}

/**
 * Sets the action dispatched for the last API call made
 * @param {object} state - The current state of the reducer
 * @param {object} action - The acttion containing the last api action payload
 * @returns {object} The new state of the reducer
 */
export function setLastAPICallAction(state, action) {
  return {
    ...state,
    lastAPICallAction: action.actionPayload,
  };
}

/**
 * Sets the retry count
 * @param {object} state - The current state of the reducer
 * @returns {object} The new state of the reducer
 */
export function incrementRetryCount(state) {
  return {
    ...state,
    retryCount: state.retryCount + 1,
  };
}

/**
 * Set the platform type
 * @param {object} state - The current state of the reducer
 * @param {object} action - The acttion to handle snag situation
 * @returns {object} The new state of the reducer
 */
export function setPlatformType(state, action) {
  return {
    ...state,
    platform: action.platform,
  };
}

/**
 * The common reducer
 * @param {object} state - The current state of the reducer. If nothing is provided, it defaultst to initial state
 * @param {object} action - The action being dispatched
 * @returns {object} The new state of the "common" slice of redux store
 */
export function common(state = initState, action) {
  switch (action.type) {
    case ActionTypes.API_CALL_INITIATED:
      return handleApiCallInitiated(state);
    case ActionTypes.API_CALL_SUCCESS:
      return handleApiCallSuccess(state);
    case ActionTypes.SHOW_SNAG_SCREEN:
      return handleSnagSituation(state, action);
    case ActionTypes.REMOVE_SNAG_SCREEN:
      return removeSnagScreen(state);
    case ActionTypes.SET_LAST_API_CALL_ACTION:
      return setLastAPICallAction(state, action);
    case ActionTypes.INCREMENT_RETRY_COUNT:
      return incrementRetryCount(state, action);
    case ActionTypes.SET_PLATFORM_TYPE:
      return setPlatformType(state, action);
    default:
      return state;
  }
}
