/**
 * Removes data stored in local storage under the specified key.
 * @param {string} key - The key of the data to be removed from local storage.
 */

export function remove(key) {
  localStorage.removeItem(key);
}
