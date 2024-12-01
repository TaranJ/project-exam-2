/**
 * Saves data to local storage under the specified key after converting the value to a JSON string.
 *
 * This function serializes the provided value into a JSON string and stores it in the browser's local storage
 * with the given key.
 *
 * @param {string} key - The key under which the data will be stored in local storage.
 * @param {any} value - The data to be saved to local storage. Can be any value that is serializable to JSON.
 * @returns {void} This function does not return a value.
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
