import { Router, Request, Response } from "express";

export const routes = Router();

routes.get("/healthcheck", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});
