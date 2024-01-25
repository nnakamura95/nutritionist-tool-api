import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError, NoDataError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function clientUpdate(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const body = await ctx.req.json();

    if (!body) throw new BadRequestError("Client data missing");

    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      dob,
      age,
      address,
    } = body;

    const clientProfile = await prisma.clientProfile.findFirst({
      where: {
        emailAddress,
      },
    });

    if (!clientProfile) throw new NoDataError("Client doesn't exist");

    await prisma.$transaction(async (tx) => {
      await tx.clientProfile.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          dob: new Date(dob),
          age,
          emailAddress,
          phoneNumber,
          address,
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