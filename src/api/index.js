import {
  register,
  login,
  verification,
  sendVerificationCode,
} from "./user/auth";
import {
  getUserData,
  getAllFields,
  getAllFiles,
  getFileById,
  getAllOrientations,
  updateUser,
} from "./user/home";

import { adminLogin } from "./admin/auth";
import {
  getAllFields as getAllAdminFields,
  deleteField,
  addField,
  editField,
} from "./admin/fields";

import {
  getAllCourses,
  addCourse,
  editCourse,
  deleteCourse,
} from "./admin/course";

import { getAllProfs, addProf, editProf, deleteProf } from "./admin/prof";

export {
  // admin api
  adminLogin,
  getAllAdminFields,
  deleteField,
  addField,
  editField,
  getAllCourses,
  addCourse,
  editCourse,
  deleteCourse,
  getAllProfs,
  addProf,
  editProf,
  deleteProf,
  // users api
  register,
  login,
  verification,
  sendVerificationCode,
  getUserData,
  getAllFields,
  getAllFiles,
  getFileById,
  getAllOrientations,
  updateUser,
};
