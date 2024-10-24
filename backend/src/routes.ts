import { Router, Request, Response } from "express";
import { MenuItemCategoryController } from "./controllers/MenuItemCategoryController";
import { MenuItemController } from "./controllers/MenuItemController";

export const routes = Router();

routes.get("/healthcheck", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

routes.post("/menuItemCategory", async (req: Request, res: Response) => {
  const response = await new MenuItemCategoryController().create(req, res);
  res.json(response);
});

routes.post("/menuItem", async (req: Request, res: Response) => {
  res.json(await new MenuItemController().create(req, res));
});
