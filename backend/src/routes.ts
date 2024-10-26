import { Router, Request, Response } from "express";
import { MenuItemCategoryController } from "./controllers/MenuItemCategoryController";
import { MenuItemController } from "./controllers/MenuItemController";
import { ReservationController } from "./controllers/ReservationController";

export const routes = Router();

routes.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

routes.get("/menu", async (req: Request, res: Response) => {
  res.status(200).json(await new MenuItemController().listWithCategories());
});

routes.post("/menu", async (req: Request, res: Response) => {
  res.status(200).json(await new MenuItemController().create(req));
});

routes.post("/menuItemCategory", async (req: Request, res: Response) => {
  res.status(200).json(await new MenuItemCategoryController().create(req));
});

routes.post("/reservation", async (req: Request, res: Response) => {
  res.status(200).json(await new ReservationController().create(req));
});
