import { IMenuItem } from "../interfaces/IMenuItem";
import prismaClient from "../prisma/PrismaClient";

class MenuItemService {
  async list() {
    const menuItems = await prismaClient.menuItem.findMany();

    return menuItems;
  }

  async create(data: IMenuItem) {
    const menuItem = await prismaClient.menuItem.create({
      data: {
        ...data,
      },
    });

    return menuItem;
  }
}

export { MenuItemService };
