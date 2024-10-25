import { Request, Response } from "express";
import { IMenuItem } from "../interfaces/IMenuItem";
import { MenuItemService } from "../services/MenuItemService";

class MenuItemController {
  async listWithCategories() {
    return await new MenuItemService().listWithCategories();
  }

  async create(request: Request) {
    const data = request.body as IMenuItem;

    const service = new MenuItemService();
    const menuItem = await service.create(data);

    return menuItem;
  }
}

export { MenuItemController };
