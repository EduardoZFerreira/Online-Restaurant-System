import express from "express";
import { routes } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(routes);

app.listen(8081, () => {
  console.log("server online");
});
