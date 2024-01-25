import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError, NoDataError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function aptCancel(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });
    if (!appointment) throw new NoDataError("Appointment doesn't exist");

    await prisma.$transaction(async (tx) => {
      await tx.appointment.delete({
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