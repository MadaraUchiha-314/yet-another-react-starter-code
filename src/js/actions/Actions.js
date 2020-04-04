import * as ActionTypes from './ActionTypes';

/**
 * Action to show the snag screen.
 * @param {string} errorType - The type of error
 * @param {string} errorMessage - The message associated with the error. Used to display to the user
 * @param {object} errorPayload - The payload associated with the error
 * @returns {object} The associated action
 */
export function showSnagScreen(errorType, errorMessage, errorPayload) {
  return {
    type: ActionTypes.SHOW_SNAG_SCREEN,
    hasPIIData: false,
    errorType,
    errorMessage,
    errorPayload,
  };
}

/**
 * Action to remove the snag screen
 * @returns {object} The associated action
 */
export function removeSnagScreen() {
  return {
    type: ActionTypes.REMOVE_SNAG_SCREEN,
    hasPIIData: false,
  };
}

/**
 * Action to set the api call as initiated. Used to invoke the spinner
 * @param {string} apiName - The API name(route) which is being called.
 * @returns {object} The associated action
 */
export function setAPICallInitiated(apiName) {
  return {
    type: ActionTypes.API_CALL_INITIATED,
    hasPIIData: false,
    apiName,
  };
}

/**
 * Action to set the api call as success. Used to remove the spinner
 * @param {string} apiName - The API name(route) which is being called.
 * @returns {object} The associated action
 */
export function setAPICallSuccess(apiName) {
  return {
    type: ActionTypes.API_CALL_SUCCESS,
    hasPIIData: false,
    apiName,
  };
}

/**
 * Action to set the platform
 * @param {object} platform The current platform
 * @returns {object} The associated action
 */
export function setPlatformType(platform) {
  return {
    type: ActionTypes.SET_PLATFORM_TYPE,
    platform,
  };
}

/**
 * Action to "Try Again" snag screen
 * @returns {object} The associated action
 */
export function onSnagRetry() {
  return {
    type: ActionTypes.ON_SNAG_RETRY,
  };
}

/**
 * Action to set the last made API call, can be useful on retry purposes.
 * @param {object} actionPayload The previous API call action payload
 * @returns {object} The associated action
 */
export function setLastAPICallAction(actionPayload) {
  return {
    type: ActionTypes.SET_LAST_API_CALL_ACTION,
    actionPayload,
  };
}

/**
 * Action to set the retry counts
 * @returns {object} The associated action
 */
export function incrementRetryCount() {
  return {
    type: ActionTypes.INCREMENT_RETRY_COUNT,
  };
}

/**
 * Action to close the window. Implementation may differ across clients
 * @returns {object} The associated action
 */
export function closeWindow() {
  return {
    type: ActionTypes.CLOSE_WINDOW,
  };
}
