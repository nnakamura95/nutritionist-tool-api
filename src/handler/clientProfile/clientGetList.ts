import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function clientGetList(ctx: Context) {
  try {
    const clientList = await prisma.$transaction(async (tx) => {
      const clientProfiles = await tx.clientProfile.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          emailAddress: true,
        },
      });

      if (!clientProfiles) return [];

      return await Promise.all(
        clientProfiles.map(async (clientProfile) => {
          const clientMedicalReportCount: number = await tx.medicalReport.count(
            {
              where: {
                clientProfileId: clientProfile.id,
              },
            },
          );
          return {
            ...clientProfile,
            clientMedicalReportCount,
          };
        }),
      );
    });

    return apiResponse(ctx, clientList);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
