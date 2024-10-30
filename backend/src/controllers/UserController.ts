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

  async auth(req: Request) {
    const { username, password } = req.body;
    return await new UserService().authenticate(username, password);
  }
}

export { UserController };
