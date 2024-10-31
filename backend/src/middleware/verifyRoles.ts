import { Request } from "express";
import { Roles } from "../config/roles";

const verifyRoles = (...allowedRoles: Roles[]) => {
  return (req: any, res: any, next: any) => {
    if (!req?.roles) return res.sendStatus(401);

    const userRoles = req.roles as Roles[];

    const userHasMatchingRoles = userRoles
      .map((role) => [...allowedRoles].includes(role))
      .find((val) => val === true);

    if (!userHasMatchingRoles) return res.sendStatus(401);

    next();
  };
};

export { verifyRoles };
