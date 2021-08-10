import { AdminAxios } from "../request";

export function getAllFields() {
  return AdminAxios.get("/fields").then(({ data: { data } }) => data);
}

export function deleteField(id) {
  return AdminAxios.delete(`/fields/${id}`).then(({ data: { data } }) => data);
}
