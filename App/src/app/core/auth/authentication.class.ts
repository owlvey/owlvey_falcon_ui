export class AuthorizationToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export class UserInfo {
  sub: string;
  owneridentifier: string;
  firstName: string;
  lastName: string;
  fullname: string;
  role: string;
  name: string;
  email: string;
}
