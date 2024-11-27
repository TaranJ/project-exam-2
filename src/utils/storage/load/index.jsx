/**
 * Loads data from local storage and parses the stored JSON data.
 * @param {string} key - The key under which the data is stored in local storage.
 * @returns {any} The parsed JSON data retrieved from local storage, or null if the key does not exist.
 */

export function load(key) {
  return JSON.parse(localStorage.getItem(key));
}
