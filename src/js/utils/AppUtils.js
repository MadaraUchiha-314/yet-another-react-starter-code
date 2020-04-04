const AppUtils = {
  logger: console,
  analytics: () => null,
};

/**
 * Used to get the logger
 * @returns {object} The logger
 */
export function getLogger() {
  return AppUtils.logger;
}

/**
 * Used to get the logger
 * @returns {object} The logger
 */
export function getAnalytics() {
  return AppUtils.analytics;
}
