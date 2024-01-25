import { Context, Hono } from "hono";
import medicalReportGetAllById from "../handler/meidcalReport/medicalReportGetAllById";
import medicalReportFromSave from "../handler/meidcalReport/medicalReportFromSave";
import medicalReportDeleteById from "../handler/meidcalReport/medicalReportDeleteById";
import medicalReportUpdate from "../handler/meidcalReport/medicalReportUpdate";


const medicalReport = new Hono();

medicalReport.get("/all/by-client-id/:id", (ctx: Context) => {
  return medicalReportGetAllById(ctx);
});

medicalReport.post("/save/:id", (ctx: Context) => {
  return medicalReportFromSave(ctx);
});

medicalReport.delete("/delete/:id", (ctx: Context) => {
  return medicalReportDeleteById(ctx);
});

medicalReport.put("/update/:id", (ctx: Context) => {
  return medicalReportUpdate(ctx);
});

export default medicalReport;