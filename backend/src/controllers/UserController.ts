import { ISaveUserDTO } from "../interfaces/ISaveUserDTO";
import { UserService } from "../services/UserService";
import { Request } from "express";

class UserController {
  async listUsers() {
    return await new UserService().listUsers();
  }

  async create(req: Request) {
    const userData = req.body as ISaveUserDTO;
    return await new UserService().create(userData);
  }

  async auth(req: Request): Promise<IAuthenticationResponse> {
    const { username, password } = req.body;
    return await new UserService().authenticate(username, password);
  }

  async refreshToken(req: Request): Promise<IAuthenticationResponse> {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
      console.log("No cookies");
      throw new Error("No refresh token provided");
    }

    return await new UserService().refreshToken(cookie as IJWTCookie);
  }

  async logOut(req: Request) {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
      return { success: true };
    }
    await new UserService().logOut(cookie as IJWTCookie);
    return { success: true };
  }
}

export { UserController };
