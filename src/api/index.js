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
import { getAllFields as getAllAdminFields } from "./admin/fields";

export {
  // admin api
  adminLogin,
  getAllAdminFields,
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
