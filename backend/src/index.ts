import express from "express";
import { routes } from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import cookieParser from "cookie-parser";

const swaggerFile = require("./docs/swagger-output.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(Number(process.env.API_PORT) ?? 8081, () => {
  console.log("server online");
});
