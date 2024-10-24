import { Request, Response } from "express";
import { MenuItemCategoryService } from "../services/MenuItemCategoryService";

class MenuItemCategoryController {
  async create(request: Request) {
    const { title } = request.body as { title: string };

    const service = new MenuItemCategoryService();
    const category = await service.create(title);

    return category;
  }
}

export { MenuItemCategoryController };
