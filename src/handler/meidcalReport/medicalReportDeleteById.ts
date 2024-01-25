import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError, NoDataError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function medicalReportDeleteById(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const medicalReport = await prisma.medicalReport.findUnique({
      where: {
        id,
      },
    });
    if (!medicalReport) throw new NoDataError("No medical report found");

    await prisma.$transaction(async (tx) => {
      await tx.medicalReport.delete({
        where: {
          id,
        },
      });
    });

    return apiResponse(ctx);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
