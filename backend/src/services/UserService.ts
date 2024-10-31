import { ISaveUserDTO } from "../interfaces/ISaveUserDTO";
import prismaClient from "../prisma/PrismaClient";
import { hash, genSalt, compare } from "bcrypt";
import Jwt from "jsonwebtoken";

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
        roles: [Roles.USER],
      },
    });

    return newUser;
  }

  async addRole(user: ISaveUserDTO) {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: user.email,
      },
    });

    const currentRoles: Roles[] = existingUser?.roles as Roles[];

    if (currentRoles.indexOf(user.role as Roles) != -1) return;

    await prismaClient.user.update({
      where: { id: existingUser?.id },
      data: {
        roles: [...currentRoles, user.role as Roles],
      },
    });
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<IAuthenticationResponse> {
    const user = await prismaClient.user.findFirst({
      where: {
        email: username,
      },
    });

    let data: IAuthenticationResponse;

    if (user) {
      const passwordCompare = await compare(password, user.password);
      if (passwordCompare) {
        const accessToken = Jwt.sign(
          { username: user.email },
          process.env.ACCESS_TOKEN as string,
          { expiresIn: "30s" }
        );

        const refreshToken = Jwt.sign(
          { username: user.email },
          process.env.REFRESH_TOKEN as string,
          { expiresIn: "1d" }
        );

        await prismaClient.user.update({
          where: { id: user.id },
          data: {
            refreshToken: refreshToken,
          },
        });

        data = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      } else {
        data = {
          error: "Wrong password",
        };
      }
    } else {
      data = {
        error: "User not found",
      };
    }

    return data;
  }

  async refreshToken(cookie: IJWTCookie): Promise<IAuthenticationResponse> {
    // Find the user related to the refresh token

    let response: IAuthenticationResponse = {};

    Jwt.verify(
      cookie.jwt,
      process.env.REFRESH_TOKEN as string,
      (err, decoded: any) => {
        // TODO: Handle errors and if the username in the token is different from the found user
        const newAccesToken = Jwt.sign(
          { username: decoded.email },
          process.env.ACCESS_TOKEN as string,
          { expiresIn: "30s" }
        );
        response = {
          accessToken: newAccesToken,
        };
      }
    );

    return response;
  }

  async logOut(cookie: IJWTCookie) {
    const tokenOwner = await prismaClient.user.findFirst({
      where: { refreshToken: cookie.jwt },
    });

    await prismaClient.user.update({
      where: { id: tokenOwner?.id },
      data: {
        refreshToken: null,
      },
    });
  }
}

export { UserService };
