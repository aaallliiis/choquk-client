import { AdminAxios } from "../request";

export function getAllCourses() {
  return AdminAxios.get("/courses").then(({ data: { data } }) =>
    data.map((item) => {
      item.fieldName = item.fieldId.name;
      item.profName = item.profId.name;
      item.fieldId = item.fieldId.id;
      item.profId = item.profId.id;
      return item;
    })
  );
}

export function addCourse(body) {
  return AdminAxios.post("/courses", body).then(({ data: { data } }) => data);
}

export function editCourse({ id, body }) {
  return AdminAxios.put(`/courses/${id}`, body).then(
    ({ data: { data } }) => data
  );
}

export function deleteCourse(id) {
  return AdminAxios.delete(`/courses/${id}`).then(({ data: { data } }) => data);
}
