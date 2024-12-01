import { remove } from "../../utils/storage/remove";

/**
 * Logs out the user by removing the access token and profile from storage,
 * then redirects the user to the home page.
 *
 * @function logout
 * @param {Function} navigate - A function to navigate the user to a different route.
 * @returns {void} This function does not return a value.
 */

export function logout(navigate) {
  remove("token");
  remove("profile");
  navigate("/");
}
