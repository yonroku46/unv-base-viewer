import { AppDispatch, store } from '@/store';
import { setUser, logout } from '@/store/slice/authSlice';
import ApiRoutes from '@/api/module/ApiRoutes';
import ApiInstance from '@/api';

export const AuthService = (dispatch: AppDispatch = store.dispatch) => {
  const getCurrentUser = (): User | null => {
    return store.getState().auth.currentUser;
  };

  const login = async (credentials: { email: string; password: string }) => {
    const response: any = await ApiInstance.post(ApiRoutes.LOGIN, credentials);
    if (response?.data) {
      dispatch(setUser(response.data));
    }
    return response;
  };

  const performLogout = async () => {
    try {
      await ApiInstance.post(ApiRoutes.LOGOUT);
    } catch {
      // ignore
    } finally {
      dispatch(logout());
    }
  };

  const refreshToken = async (token: string) => {
    return ApiInstance.post(ApiRoutes.REFRESH_TOKEN, { refreshToken: token });
  };

  return {
    getCurrentUser,
    login,
    logout: performLogout,
    refreshToken,
  };
};

export default AuthService;
