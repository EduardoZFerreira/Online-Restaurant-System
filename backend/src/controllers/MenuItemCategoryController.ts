import { Request, Response } from "express";
import { MenuItemCategoryService } from "../services/MenuItemCategoryService";

class MenuItemCategoryController {
  async create(request: Request, response: Response) {
    const { title } = request.body as { title: string };

    const service = new MenuItemCategoryService();
    const category = await service.create(title);

    response.json(category);
  }
}

export { MenuItemCategoryController };
