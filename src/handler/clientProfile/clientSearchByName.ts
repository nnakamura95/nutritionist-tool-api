import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function clientSearchByName(ctx: Context) {
  try {
    const { name } = ctx.req.query();

    if (!name) throw new BadRequestError("Data missing");

    const clientProfile = await prisma.$transaction(async (tx) => {
      const splitName: string[] = name.split(" ");
      let whereCondition = {
        OR: [
          {
            firstName: {
              contains: splitName[0],
            },
          },
          {
            lastName: {
              contains: splitName[0],
            },
          },
        ],
      };

      if (splitName[1]) {
        whereCondition.OR.push({
          lastName: {
            contains: splitName[1],
          },
        });
      }

      return tx.clientProfile.findMany({
        where: whereCondition,
      });
    });

    return apiResponse(ctx, clientProfile);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
