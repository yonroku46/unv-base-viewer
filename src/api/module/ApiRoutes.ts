import { config } from '@/config';

const ROOT = config.apiRoot;

const HEALTH_CHECK = `${ROOT}/health-check`;

// Auth
const AUTH_ROOT = `${ROOT}/auth`;
const LOGIN = `${AUTH_ROOT}/login`;
const SIGNUP = `${AUTH_ROOT}/signup`;
const GOOGLE_LOGIN = `${AUTH_ROOT}/google`;
const GOOGLE_OAUTH = `${ROOT}/oauth2/google/access-token`;
const LOGOUT = `${AUTH_ROOT}/logout`;
const REFRESH_TOKEN = `${AUTH_ROOT}/refresh-token`;
const USER_ME = `${AUTH_ROOT}/me`;

const ApiRoutes = {
  HEALTH_CHECK,
  LOGIN,
  SIGNUP,
  GOOGLE_LOGIN,
  GOOGLE_OAUTH,
  LOGOUT,
  REFRESH_TOKEN,
  USER_ME,
};

export default ApiRoutes;
