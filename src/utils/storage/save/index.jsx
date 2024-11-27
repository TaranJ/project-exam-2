/**
 * Saves data to local storage under the specified key after converting the value to a JSON string.
 * @param {string} key - The key under which the data will be stored in local storage.
 * @param {any} value - The data to be saved to local storage.
 */

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
