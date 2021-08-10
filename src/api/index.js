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

export {
  // admin api
  adminLogin,
  getAllAdminFields,
  deleteField,
  addField,
  editField,
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
