import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError, NoDataError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function clientDelete(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const clientProfile = await prisma.clientProfile.findUnique({
      where: {
        id,
      },
    });

    if (!clientProfile) throw new NoDataError("Client doesn't exist");

    await prisma.$transaction(async (tx) => {
      await tx.clientProfile.delete({
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
