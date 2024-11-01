import { Router, Request, Response, response } from "express";
import { MenuItemController } from "../controllers/MenuItemController";
import { UserController } from "../controllers/UserController";

export const publicRoutes = Router();

publicRoutes.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

publicRoutes.post("/user", async (req: Request, res: Response) => {
  res.status(200).json(await new UserController().create(req));
});

publicRoutes.post("/authenticate", async (req: Request, res: Response) => {
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
    res.json({
      token: authResponse.accessToken,
      roles: authResponse.roles,
      name: authResponse.name,
    });
  }
});

publicRoutes
  .route("/reauthenticate")
  .get(async (req: Request, res: Response) => {
    const authResponse = await new UserController().refreshToken(req);
    if (authResponse.error) {
      res.status(401).json({ error: authResponse.error });
    } else {
      res.json({ token: authResponse.accessToken });
    }
  });

publicRoutes.get("/menu", async (req: Request, res: Response) => {
  res.status(200).json(await new MenuItemController().listWithCategories());
});
