import { remove } from "../../utils/storage/remove";

export function logout(navigate) {
  remove("token");
  remove("profile");
  navigate("/");
}
