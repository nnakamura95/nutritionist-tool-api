import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError, ConflictError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";
import imageUpload from "../../../lib/s3/imageUpload";

export default async function clientSave(ctx: Context) {
  try {
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
        dob,
      },
    });
    if (clientProfile) throw new ConflictError("Client already exist");

    await prisma.$transaction(async (tx) => {
      await tx.clientProfile.create({
        data: {
          firstName,
          lastName,
          dob: new Date(dob),
          age,
          emailAddress,
          phoneNumber,
          address
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
