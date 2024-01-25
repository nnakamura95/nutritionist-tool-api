import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { NoDataError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function clientGetAll(ctx: Context) {
  try {
    const clientProfileList = await prisma.clientProfile.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    if (!clientProfileList) throw new NoDataError("No clients found");

    const data = clientProfileList.map((data) => ({
      ...data,
      dob: data.dob.toISOString(),
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    }));

    return apiResponse(ctx, data);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
