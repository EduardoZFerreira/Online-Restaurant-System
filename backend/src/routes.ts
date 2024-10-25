import { Router, Request, Response } from "express";
import { MenuItemCategoryController } from "./controllers/MenuItemCategoryController";
import { MenuItemController } from "./controllers/MenuItemController";
import { ReservationController } from "./controllers/ReservationController";

export const routes = Router();

routes.get("/healthcheck", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

routes.get("/menu", async (req: Request, res: Response) => {
  res.json(await new MenuItemController().listWithCategories());
});

routes.post("/menuItemCategory", async (req: Request, res: Response) => {
  res.json(await new MenuItemCategoryController().create(req));
});

routes.post("/menuItem", async (req: Request, res: Response) => {
  res.json(await new MenuItemController().create(req));
});

routes.post("/reservation", async (req: Request, res: Response) => {
  res.json(await new ReservationController().create(req));
});
