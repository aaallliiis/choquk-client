import { Axios } from "../request";

export function getAllFields() {
  return Axios.get("/fields").then(({ data: { data } }) => data);
}
