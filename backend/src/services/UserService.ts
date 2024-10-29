import prismaClient from "../prisma/PrismaClient";

class UserService {
  async listUsers() {
    const users = await prismaClient.user.findMany();

    return users;
  }
}

export { UserService };
