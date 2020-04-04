/**
 * Implements a simple LRU Cache.
 */
const LRUCache = {
  /**
   * Maximum number of entries allowed in the cache before its evicted.
   */
  maxCount: 10,
  /**
   * Each entry will be an object :
   * {
   *  age:
   *  value:
   *  key
   * }
   */
  dataStore: {},
};

/**
 * Set the capacity of the cache
 * @param {number} maxCount - The maximum capacity of the cache
 */
export function setMaxCount(maxCount) {
  LRUCache.maxCount = maxCount;
}

/**
 * Adds a new key to the cache
 * @param {string} keyToAdd - The key we want to insert in the cache
 * @param {object} value - The value we want to associate with the key
 */
export function addKeyValue(keyToAdd, value) {
  /*
   * Whenever we add a key, we increase the age of all the elements.
   */
  Object.keys(LRUCache.dataStore).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(LRUCache.dataStore, key)) {
      LRUCache.dataStore[key].age += 1;
      if (LRUCache.dataStore[key].age === LRUCache.maxCount) {
        delete LRUCache[key];
      }
    }
  });
  LRUCache.dataStore[keyToAdd] = {
    value,
    age: 0,
  };
}

/**
 * Gets a key from the cache if present else returns null
 * @param {string} key - The key to retrive
 * @returns {object} The value corresponding to the key
 */
export function getKey(key) {
  if (Object.prototype.hasOwnProperty.call(LRUCache.dataStore, key)) {
    /*
     * Update age of every key which is less than the age of the current key.
     */
    Object.keys(LRUCache.dataStore).forEach((keyItr) => {
      if (Object.prototype.hasOwnProperty.call(LRUCache.dataStore, keyItr)) {
        if (LRUCache.dataStore[keyItr].age < LRUCache.dataStore[key].age) {
          LRUCache.dataStore[keyItr].age += 1;
        }
      }
    });
    LRUCache.dataStore[key].age = 0;
    return LRUCache.dataStore[key].value;
  }
  return null;
}
