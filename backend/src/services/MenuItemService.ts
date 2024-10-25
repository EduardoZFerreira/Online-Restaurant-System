import { IMenuItem } from "../interfaces/IMenuItem";
import prismaClient from "../prisma/PrismaClient";

class MenuItemService {
  async listWithCategories() {
    const menuItemCategoryList = await prismaClient.menuItemCategory.findMany({
      include: {
        menuItems: true,
      },
    });

    return menuItemCategoryList;
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
