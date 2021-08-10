import { AdminAxios } from "../request";

export function adminLogin(body) {
  return AdminAxios.post("/login", body).then(({ data }) => data);
}
