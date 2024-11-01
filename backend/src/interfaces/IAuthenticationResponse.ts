import { Roles } from "../config/roles";

interface IAuthenticationResponse {
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  roles?: Roles[];
}

export { IAuthenticationResponse };
