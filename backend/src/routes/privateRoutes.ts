import { Router, Request, Response } from "express";
import { ReservationController } from "../controllers/ReservationController";
import { verifyRoles } from "../middleware/verifyRoles";
import { MenuItemCategoryController } from "../controllers/MenuItemCategoryController";
import { MenuItemController } from "../controllers/MenuItemController";
import { UserController } from "../controllers/UserController";
import { Roles } from "../config/roles";

export const privateRoutes = Router();

privateRoutes
  .route("/reservation")
  .post(verifyRoles(Roles.USER), async (req: Request, res: Response) => {
    try {
      res.status(200).json(await new ReservationController().create(req));
    } catch (exception: any) {
      res.status(500).json({ error: exception.message });
    }
  });

privateRoutes
  .route("/user")
  .get(verifyRoles(Roles.ADMIN), async (req: Request, res: Response) => {
    res.status(200).json(await new UserController().listUsers());
  });

privateRoutes
  .route("/reservation/user/:userId")
  .get(verifyRoles(Roles.ADMIN), async (req: Request, res: Response) => {
    try {
      res.status(200).json(await new ReservationController().getByUser(req));
    } catch (exception: any) {
      res.status(500).json({ error: exception.message });
    }
  });

privateRoutes
  .route("/menuItemCategory")
  .post(verifyRoles(Roles.ADMIN), async (req: Request, res: Response) => {
    res.status(200).json(await new MenuItemCategoryController().create(req));
  });

privateRoutes
  .route("/menu")
  .post(verifyRoles(Roles.ADMIN), async (req: Request, res: Response) => {
    res.status(200).json(await new MenuItemController().create(req));
  });

privateRoutes.route("/logout").get(async (req: Request, res: Response) => {
  await new UserController().logOut(req);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.sendStatus(204);
});

privateRoutes
  .route("/user/role")
  .post(verifyRoles(Roles.ADMIN), async (req: Request, res: Response) => {
    const response = await new UserController().updateRoles(req);
    if (response.success) res.sendStatus(200);
    else {
      res.status(500).json(response.error);
    }
  });
