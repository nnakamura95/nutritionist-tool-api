import { Hono } from "hono";
import * as process from "process";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import index from "./routers";

const app = new Hono().basePath("/api");
app.use("*", poweredBy());
app.use("*", logger());
app.use("*", cors({
  origin: "http://localhost:3000",
  allowMethods: ["*"],
}));

app.route("/v1", index);

const port = process.env.PORT || 8080;

export default {
  port,
  fetch: app.fetch,
};
