import express from "express";
import { routes } from "./routes";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(8081, () => {
  console.log("server online");
});
