import prismaClient from "../prisma/PrismaClient";

class MenuItemCategoryService {
  async create(title: string) {
    const category = await prismaClient.menuItemCategory.create({
      data: {
        title: title,
      },
    });

    return category;
  }
}

export { MenuItemCategoryService };
