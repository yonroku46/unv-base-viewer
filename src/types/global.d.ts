export {};

declare global {
  interface User {
    id: string;
    email: string;
    name: string;
    nickname?: string;
    role?: 'USER' | 'ADMIN' | 'PARTNER';
    token?: string;
    refreshToken?: string;
  }

  interface CommonResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    errorCode?: string;
  }
}
