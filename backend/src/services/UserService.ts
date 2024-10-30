import { ISaveUserDTO } from "../interfaces/ISaveUserDTO";
import prismaClient from "../prisma/PrismaClient";
import { hash, genSalt, compare } from "bcrypt";

class UserService {
  async listUsers() {
    const users = await prismaClient.user.findMany();

    return users;
  }

  async create(user: ISaveUserDTO) {
    const salt = await genSalt();
    const hashedPassword = await hash(user.password, salt);
    const newUser = await prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async authenticate(username: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: username,
      },
    });

    if (user) {
      const passwordCompare = await compare(password, user.password);
      if (passwordCompare) {
        // handle correct password
      } else {
        // handle wrong password
      }
    }

    return user;
  }
}

export { UserService };
