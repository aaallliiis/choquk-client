import { AdminAxios } from "../request";

export function getAllProfs() {
  return AdminAxios.get("/profs").then(({ data: { data } }) => data);
}

export function addProf(body) {
  return AdminAxios.post("/profs", body).then(({ data: { data } }) => data);
}

export function editProf({ id, body }) {
  return AdminAxios.put(`/profs/${id}`, body).then(
    ({ data: { data } }) => data
  );
}

export function deleteProf(id) {
  return AdminAxios.delete(`/profs/${id}`).then(({ data: { data } }) => data);
}
