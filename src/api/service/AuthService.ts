import { AppDispatch, store } from '@/store';
import { setUser, logout } from '@/store/slice/authSlice';
import ApiRoutes from '@/api/module/ApiRoutes';
import ApiInstance from '@/api';

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  password: string;
  userName: string;
}

export interface GoogleLoginParams {
  code?: string;
  credential?: string;
  email?: string;
  name?: string;
  picture?: string;
}

export const AuthService = (dispatch: AppDispatch = store.dispatch) => {
  const getCurrentUser = (): User | null => {
    return store.getState().auth.currentUser;
  };

  /**
   * 이메일/비밀번호 로그인
   */
  const login = async (params: LoginParams): Promise<BaseResponse<User>> => {
    const response: any = await ApiInstance.post(ApiRoutes.LOGIN, {
      email: params.email,
      mail: params.email,
      password: params.password,
    });
    if (response?.responseData) {
      const user = response.responseData;
      dispatch(setUser(user));
    }
    return response;
  };

  /**
   * 신규 회원가입
   */
  const signup = async (params: SignupParams): Promise<BaseResponse<User>> => {
    const response: any = await ApiInstance.post(ApiRoutes.SIGNUP, {
      email: params.email,
      mail: params.email,
      password: params.password,
      userName: params.userName,
    });
    if (response?.responseData) {
      const user = response.responseData;
      dispatch(setUser(user));
    }
    return response;
  };

  /**
   * Google 로그인 (Credential / OAuth code)
   */
  const googleLogin = async (params: GoogleLoginParams): Promise<BaseResponse<User>> => {
    const response: any = await ApiInstance.post(ApiRoutes.GOOGLE_LOGIN, params);
    if (response?.responseData) {
      const user = response.responseData;
      dispatch(setUser(user));
    }
    return response;
  };

  /**
   * Google OAuth 콜백 (인가 코드)
   */
  const getGoogleAccessToken = async (code: string): Promise<BaseResponse<User>> => {
    const response: any = await ApiInstance.get(ApiRoutes.GOOGLE_OAUTH, {
      params: { code },
    });
    if (response?.responseData) {
      const user = response.responseData;
      dispatch(setUser(user));
    }
    return response;
  };

  /**
   * 현재 로그인 사용자 프로필 조회
   */
  const getMe = async (): Promise<BaseResponse<User>> => {
    const response: any = await ApiInstance.get(ApiRoutes.USER_ME);
    if (response?.responseData) {
      dispatch(setUser(response.responseData));
    }
    return response;
  };

  /**
   * 로그아웃
   */
  const performLogout = async (): Promise<void> => {
    try {
      await ApiInstance.post(ApiRoutes.LOGOUT);
    } catch {
      // ignore
    } finally {
      dispatch(logout());
    }
  };

  /**
   * 토큰 갱신
   */
  const refreshToken = async (token?: string): Promise<BaseResponse<User>> => {
    const currentRefreshToken = token || store.getState().auth.currentUser?.refreshToken;
    const response: any = await ApiInstance.post(ApiRoutes.REFRESH_TOKEN, {
      refreshToken: currentRefreshToken,
    });
    if (response?.responseData) {
      dispatch(setUser(response.responseData));
    }
    return response;
  };

  return {
    getCurrentUser,
    login,
    signup,
    googleLogin,
    getGoogleAccessToken,
    getMe,
    logout: performLogout,
    refreshToken,
  };
};

export default AuthService;
