import { AdminAxios } from "../request";

export function getAllOrientations() {
  return AdminAxios.get("/orientations").then(({ data: { data } }) =>
    data.map((item) => {
      item.fieldName = item.fieldId.name;
      item.fieldId = item.fieldId.id;
      return item;
    })
  );
}

export function addOrientation(body) {
  return AdminAxios.post("/orientations", body).then(
    ({ data: { data } }) => data
  );
}

export function editOrientation({ id, body }) {
  return AdminAxios.put(`/orientations/${id}`, body).then(
    ({ data: { data } }) => data
  );
}

export function deleteOrientation(id) {
  return AdminAxios.delete(`/orientations/${id}`).then(
    ({ data: { data } }) => data
  );
}
