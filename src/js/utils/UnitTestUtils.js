/*
 * This is a module which helps you write unit tests automatically for redux based applications.
 *
 */
/* Will be used only in debug environments and when query param unitTestRecord=true */
/*
 * Forward declaration of the test cases we are going to record.
 */

export const unitTest = {
  firstState: null,
  /*
   * Each test cases looks like this :
   *  {
   *    action:
   *    afterState:
   *  }
   */
  testCases: [],
};

/**
 * Utility function to record a unit test case for the reducer.
 * @param {object} beforeState - State before the action was dispatched
 * @param {object} action - The action being dispatched
 * @param {object} afterState - State after the action was dispatched
 */
export function addTestCase(beforeState, action, afterState) {
  if (unitTest.firstState === null) {
    unitTest.firstState = { ...beforeState };
  }
  unitTest.testCases.push({
    action,
    afterState,
  });
  console.log('[UnitTests]'); /* eslint-disable-line no-console */
  console.log(JSON.stringify(unitTest)); /* eslint-disable-line no-console */
}
