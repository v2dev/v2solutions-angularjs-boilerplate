export class RequestModel {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

export class NewUserModel {
  name?: string;
  email?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
}

export class ResetPasswordModel {
  name?: string;
  email?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
}

export class ResponseModel {
  isFirstTime?: boolean;
  token?: string;
}

export class UserModel {
  emailId?: string;
  fullName?: string;
  roles?: string[] = [];
  imageUrl?: string;
  access: any[] = [];
  userId?: string;
  agreement?: string;
  chatAgreement?: string;
}

export class OtpModel {
  email?: string;
  mfaToken?: number;
}
