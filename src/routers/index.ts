import { Hono } from "hono";
import clientProfile from "./clientProfile";
import medicalReport from "./medicalReport";
import appointment from "./appointment";

const index = new Hono();

index.route("/client-profile", clientProfile);
index.route("/medical-report", medicalReport);
index.route("/appointment", appointment);

export default index;