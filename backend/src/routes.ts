import { Router, Request, Response } from "express";
import { MenuItemCategoryController } from "./controllers/MenuItemCategoryController";
import { MenuItemController } from "./controllers/MenuItemController";
import { ReservationController } from "./controllers/ReservationController";
import { UserController } from "./controllers/UserController";
import { authJWT } from "./middleware/auth";

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

routes.post("/user/role", async (req: Request, res: Response) => {
  const response = await new UserController().updateRoles(req);
  if (response.success) res.sendStatus(200);
  else {
    res.status(500).json(response.error);
  }
});

routes.post("/authenticate", async (req: Request, res: Response) => {
  const authResponse = await new UserController().auth(req);
  if (authResponse.error) {
    res.status(401).json({ error: authResponse.error });
  } else {
    res.cookie("jwt", authResponse.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ token: authResponse.accessToken });
  }
});

routes.get("/reauthenticate", async (req: Request, res: Response) => {
  const authResponse = await new UserController().refreshToken(req);
  if (authResponse.error) {
    res.status(401).json({ error: authResponse.error });
  } else {
    res.json({ token: authResponse.accessToken });
  }
});

routes.get("/logout", async (req: Request, res: Response) => {
  const response = await new UserController().logOut(req);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.sendStatus(204);
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

routes
  .route("/reservation")
  .post(authJWT, async (req: Request, res: Response) => {
    try {
      res.status(200).json(await new ReservationController().create(req));
    } catch (exception: any) {
      res.status(500).json({ error: exception.message });
    }
  });
