import Jwt from "jsonwebtoken";

const authJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  Jwt.verify(
    token,
    process.env.ACCESS_TOKEN as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded.username;
      next();
    }
  );
};

export { authJWT };
