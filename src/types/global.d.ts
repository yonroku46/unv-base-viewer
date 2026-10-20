export {};

declare global {
  interface User {
    userId: string;
    userName: string;
    mail: string;
    profileImg?: string;
    token?: string;
    refreshToken?: string;
    roleId?: number;
    // エイリアス
    id?: string;
    email?: string;
    name?: string;
  }

  interface InformationItem {
    messageId?: string;
    message?: string;
  }

  interface ErrorItem extends InformationItem {
    parameter?: string;
    errorDetail?: string;
  }

  interface BaseResponse<T = any> {
    resultCode: number;
    hasErrors: boolean;
    informations?: InformationItem[];
    errors?: ErrorItem[];
    responseData?: T;
  }
}
