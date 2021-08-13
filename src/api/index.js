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
  getAllProf,
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
} from "./admin/courses";

import {
  getAllFiles as getAllAdminFiles,
  addFile,
  editFile,
  deleteFile,
} from "./admin/files";

import { getAllProfs, addProf, editProf, deleteProf } from "./admin/profs";

import {
  getAllOrientations as getAllAdminOrientations,
  deleteOrientation,
  addOrientation,
  editOrientation,
} from "./admin/orientations";

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
  getAllAdminFiles,
  addFile,
  editFile,
  deleteFile,
  getAllAdminOrientations,
  deleteOrientation,
  addOrientation,
  editOrientation,
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
  getAllProf,
};
