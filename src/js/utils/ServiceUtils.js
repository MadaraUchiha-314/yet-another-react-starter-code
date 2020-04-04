import axios from 'axios';
import { uuid } from 'src/js/utils/Utils';

/**
 * Returns the API header populating the authorization header
 * @returns {object} The header
 */
export function genApiHeader() {
  return {
    'content-type': 'application/json',
    tid: uuid(),
  };
}

/**
 * Generates the request promise object
 * @param {object} body - The body of the HTTP request
 * @param {object} headers - The headers of the HTTP request
 * @param {object} params - The params of the HTTP request
 * @param {string} method - The method of the HTTP request
 * @param {string} baseUrl - The baseUrl of the HTTP request
 * @param {string} endPoint - The endPoint of the HTTP request
 * @returns {object} Promise of making the API call
 */
export function genRequest(body, headers, params, method, baseUrl, endPoint) {
  const urlConfigStateList = {
    url: endPoint,
    method,
    params,
    baseURL: baseUrl,
    headers,
    data: body,
    withCredentials: true,
  };
  return axios(urlConfigStateList);
}
