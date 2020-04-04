import { environments, localStorageKeys } from 'src/js/utils/Enums';
/* global window, localStorage */

/* eslint-disable */
/**
 * Utility function to parse the query parameters
 * https://stackoverflow.com/a/901144/3751615
 * @param {string} name - The parameter we want to retrive
 * @param {string} url - The URL from which we want to retrieve the parameter
 * @returns {string} The value of the parameter of present, else null
 */
export function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Referred from here : https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523
 * @returns {string} A 16 length alpha numeric UUID
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/* eslint-enable */

/**
 * Whether PII masking is enabled or not
 * @returns {boolean} Whether PII masking is enabled or not
 */
export function isPIIDataMaskingEnabled() {
  const isMaskingEnabled = localStorage.getItem(localStorageKeys.PII_MASKING_ENABLED);

  if (isMaskingEnabled === true || isMaskingEnabled === 'true') {
    return true;
  }
  return false;
}

/**
 * Gets the current environment in which the widget/plugin is operating in
 * @returns {string} The current environmentt
 */
export function getCurrentEnvironment() {
  const { host } = window.location;

  if (host.indexOf('local.') !== -1) {
    /* For running locally */
    return environments.LOCAL;
  }
  if (host.indexOf('dev.') !== -1) {
    /* For QA Environment */
    return environments.DEV;
  }
  if (host.indexOf('prf.') !== -1 || host.indexOf('perf.') !== -1) {
    /* For PERF Environment */
    return environments.PERF;
  }
  if (
    host.indexOf('qa.') !== -1 ||
    host.indexOf('.a.') !== -1 ||
    host.indexOf('cqa.') !== -1 ||
    host.indexOf('qal.') !== -1
  ) {
    /* For QA Environment */
    return environments.QA;
  }
  if (host.indexOf('e2e.') !== -1) {
    /* For E2E Environment */
    return environments.E2E;
  }
  /* For PROD Environment */
  return environments.PROD;
}

/**
 * A Utility function to check whether the error is an Axios Error.
 * @param {object} errorPayload The errorPayload object
 * @returns {boolean} Whether its and axios error object
 */
export function isAxiosError(errorPayload) {
  if (Object.prototype.hasOwnProperty.call(errorPayload, 'isAxiosError')) {
    return true;
  }
  return false;
}
