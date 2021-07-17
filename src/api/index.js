import {register,login,verification,sendVerificationCode} from './user/auth';
import {getUserData,getAllFields,getAllFiles,getFileById} from './user/home';

import {adminLogin} from './admin/auth';

export{
  register,
  login,
  verification,
  sendVerificationCode,
  adminLogin,
  getUserData,
  getAllFields,
  getAllFiles,
  getFileById
}