import { Roles } from "../config/roles";

interface IAuthenticationResponse {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  roles?: Roles[];
}

export { IAuthenticationResponse };
