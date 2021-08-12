import { AdminAxios } from "../request";

export function getAllFiles() {
  return AdminAxios.get("/files").then(({ data: { data } }) =>
    data.map((item) => {
      item.fieldName = item.fieldId.name;
      item.courseName = item.courseId.name;
      item.profName = item.courseId.profId.name;
      item.fieldId = item.fieldId.id;
      item.courseId = item.courseId.id;
      return item;
    })
  );
}

export function addFile(body) {
  return AdminAxios.post("/files", body).then(({ data: { data } }) => data);
}

export function editFile({ id, body }) {
  return AdminAxios.put(`/files/${id}`, body).then(
    ({ data: { data } }) => data
  );
}

export function deleteFile(id) {
  return AdminAxios.delete(`/files/${id}`).then(({ data: { data } }) => data);
}
