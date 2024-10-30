import { Router, Request, Response } from "express";
import { MenuItemCategoryController } from "./controllers/MenuItemCategoryController";
import { MenuItemController } from "./controllers/MenuItemController";
import { ReservationController } from "./controllers/ReservationController";
import { UserController } from "./controllers/UserController";

export const routes = Router();

routes.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

routes.get("/user", async (req: Request, res: Response) => {
  res.status(200).json(await new UserController().listUsers());
});

routes.post("/user", async (req: Request, res: Response) => {
  res.status(200).json(await new UserController().create(req));
});

routes.post("/authenticate", async (req: Request, res: Response) => {
  res.status(200).json(await new UserController().auth(req));
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

routes.get("/reservation/user/:userId", async (req: Request, res: Response) => {
  try {
    res.status(200).json(await new ReservationController().getByUser(req));
  } catch (exception: any) {
    console.log(exception);
    res.status(500).json({ error: exception.message });
  }
});

routes.post("/reservation", async (req: Request, res: Response) => {
  try {
    res.status(200).json(await new ReservationController().create(req));
  } catch (exception: any) {
    res.status(500).json({ error: exception.message });
  }
});
