import { Context, Hono } from "hono";
import clientGetById from "../handler/clientProfile/clientGetById";
import clientGetAll from "../handler/clientProfile/clientGetAll";
import clientGetList from "../handler/clientProfile/clientGetList";
import clientSearchByName from "../handler/clientProfile/clientSearchByName";
import clientSave from "../handler/clientProfile/clientSave";
import clientUpdate from "../handler/clientProfile/clientUpdate";
import clientDelete from "../handler/clientProfile/clientDelete";

const clientProfile = new Hono();

clientProfile.get("/get/:id", (ctx: Context) => {
  return clientGetById(ctx);
});

clientProfile.get("/all", (ctx: Context) => {
  return clientGetAll(ctx);
});

clientProfile.get("/bsc-client-lst", (ctx: Context) => {
  return clientGetList(ctx);
});

clientProfile.post("/by-name", (ctx: Context) => {
  return clientSearchByName(ctx);
});

clientProfile.post("/save", (ctx: Context) => {
  return clientSave(ctx);
});

clientProfile.put("/update/:id", (ctx: Context) => {
  return clientUpdate(ctx);
});

clientProfile.delete("/delete/:id", (ctx: Context) => {
  return clientDelete(ctx);
});

export default clientProfile;