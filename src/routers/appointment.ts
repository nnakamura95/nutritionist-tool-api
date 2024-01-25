import { Context, Hono } from "hono";
import aptGetById from "../handler/appointment/aptGetById";
import aptGetAll from "../handler/appointment/aptGetAll";
import aptCancel from "../handler/appointment/aptCancel";
import aptSave from "../handler/appointment/aptSave";
import aptUpdate from "../handler/appointment/aptUpdate";

const appointment = new Hono();

appointment.get("/get/:id", (ctx: Context) => {
  return aptGetById(ctx);
});

appointment.get("/all", (ctx: Context) => {
  return aptGetAll(ctx);
});

appointment.delete("/cancel/:id", (ctx: Context) => {
  return aptCancel(ctx);
});

appointment.post("/save", (ctx: Context) => {
  return aptSave(ctx);
});

appointment.put("/update/:id", (ctx: Context) => {
  return aptUpdate(ctx);
});

export default appointment;