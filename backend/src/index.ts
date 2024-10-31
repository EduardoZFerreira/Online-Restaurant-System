import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions";
import { credentials } from "./middleware/credentials";
import { publicRoutes } from "./routes/publicRoutes";
import { authJWT } from "./middleware/auth";
import { privateRoutes } from "./routes/privateRoutes";

const swaggerFile = require("./docs/swagger-output.json");

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(publicRoutes);

app.use(authJWT);
app.use(privateRoutes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(Number(process.env.API_PORT) ?? 8081, () => {
  console.log("server online");
});
