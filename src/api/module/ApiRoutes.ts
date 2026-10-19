import { config } from '@/config';

const ROOT = config.apiRoot;

const HEALTH_CHECK = `${ROOT}/health`;

// Auth
const AUTH_ROOT = `${ROOT}/auth`;
const LOGIN = `${AUTH_ROOT}/login`;
const LOGOUT = `${AUTH_ROOT}/logout`;
const REFRESH_TOKEN = `${AUTH_ROOT}/refresh`;
const SIGNUP = `${AUTH_ROOT}/signup`;

// User
const USER_ROOT = `${ROOT}/user`;
const USER_ME = `${USER_ROOT}/me`;

const ApiRoutes = {
  HEALTH_CHECK,
  LOGIN,
  LOGOUT,
  REFRESH_TOKEN,
  SIGNUP,
  USER_ME,
};

export default ApiRoutes;
