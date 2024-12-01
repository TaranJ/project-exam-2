/**
 * Removes data stored in local storage under the specified key.
 *
 * This function removes the data from local storage that is associated with the given key.
 *
 * @param {string} key - The key of the data to be removed from local storage.
 * @returns {void} This function does not return a value.
 */
export function remove(key) {
  localStorage.removeItem(key);
}
