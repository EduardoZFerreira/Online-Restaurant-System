import { UserService } from "../services/UserService";

class UserController {
  async listUsers() {
    return await new UserService().listUsers();
  }
}

export { UserController };
