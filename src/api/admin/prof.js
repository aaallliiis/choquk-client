import { AdminAxios } from "../request";

export function getAllProfs() {
  return AdminAxios.get("/profs").then(({ data: { data } }) => data);
}
