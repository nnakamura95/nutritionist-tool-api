import { Context } from "hono";
import { BadRequestError, NoDataError } from "../../../lib/errors/ApiErrors";
import prisma from "../../../lib/prisma";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function medicalReportUpdate(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const body = await ctx.req.json();

    if (!body) throw new BadRequestError("Medical report data missing");

    const medicalReport = await prisma.medicalReport.findUnique({
      where: {
        id,
      },
    });

    if (!medicalReport) throw new NoDataError("Medical report not found");

    await prisma.$transaction(async (tx) => {
      await tx.medicalReport.update({
        where: {
          id,
        },
        data: {
          ...body,
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