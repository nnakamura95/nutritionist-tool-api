import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function clientGetById(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const clientProfile = await prisma.$transaction(async (tx) => (
      await tx.clientProfile.findUnique({
        where: {
          id,
        },
      })
    ));

    return apiResponse(ctx, clientProfile);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
