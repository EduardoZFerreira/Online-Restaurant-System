import { Request, Response } from "express";
import { IMenuItem } from "../interfaces/IMenuItem";
import { MenuItemService } from "../services/MenuItemService";

class MenuItemController {
  async list() {
    const service = new MenuItemService();
    const menuItems = await service.list();

    return menuItems;
  }

  async create(request: Request) {
    const data = request.body as IMenuItem;

    const service = new MenuItemService();
    const menuItem = await service.create(data);

    return menuItem;
  }
}

export { MenuItemController };
