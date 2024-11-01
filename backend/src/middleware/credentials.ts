import { Request, Response } from "express";

const credentials = (req: Request, res: Response, next: any) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(" ");
  const origin = req.headers.origin;

  if (origin && allowedOrigins?.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }

  next();
};

export { credentials };
