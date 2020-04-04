/*
 * This takes an action and then cleans the PI data inside it and returns a new action.
 */
import * as ActionTypes from 'src/js/actions/ActionTypes';
import { logTypes } from 'src/js/utils/Enums';

/**
 * Return whether the log id of type log, debug, warn, error, fatal
 * @param {object} action - The action being dispatched
 * @returns {string} The type of log
 */
export function getLogType(action) {
  switch (action.type) {
    case ActionTypes.SHOW_SNAG_SCREEN:
      return logTypes.ERROR;
    default:
      return logTypes.LOG;
  }
}

/**
 * Return whether the log id of type log, debug, warn, error, fatal
 * @param {object} action - The action being dispatched
 * @returns {object} The cleaned action withoutt any PII
 */
export function removePIIData(action) {
  if (Object.prototype.hasOwnProperty.call(action, 'hasPIIData')) {
    if (action.hasPIIData === false) {
      return action;
    }
  }
  /*
   * The action has PII information we just return the action.type
   */
  return {
    type: action.type,
  };
}
