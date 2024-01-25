import { Context } from "hono";
import prisma from "../../../../lib/prisma";
import { BadRequestError, NoDataError } from "../../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../../lib/util/apiResponses";

export default async function deleteById(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NoDataError("User doesn't exist");

    if (!user?.active) throw new BadRequestError("Invalid user");

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id,
        },
        data: {
          active: false,
          deletedAt: new Date(Date.now()),
        },
      });

      await tx.admin.delete({
        where: {
          id: user.emailAddress,
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
