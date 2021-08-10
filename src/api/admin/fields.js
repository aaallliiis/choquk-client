import { AdminAxios } from "../request";

export function getAllFields() {
  return AdminAxios.get("/fields").then(({ data: { data } }) => data);
}

export function addField(body) {
  return AdminAxios.post("/fields", body).then(({ data: { data } }) => data);
}

export function editField({ id, body }) {
  return AdminAxios.put(`/fields/${id}`, body).then(
    ({ data: { data } }) => data
  );
}

export function deleteField(id) {
  return AdminAxios.delete(`/fields/${id}`).then(({ data: { data } }) => data);
}
