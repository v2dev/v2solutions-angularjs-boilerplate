export class RequestModel {
  email?: string;
  password?: string;
  rememberMe?: boolean;
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
