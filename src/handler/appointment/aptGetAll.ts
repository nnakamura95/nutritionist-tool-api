import { Context } from "hono";
import prisma from "../../../lib/prisma";
import moment from "moment";
import { NoDataError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function aptGetAll(ctx: Context) {
  try {
    const appointmentList = await prisma.appointment.findMany({
      orderBy: [
        {
          date: "asc",
        },
        {
          time: "asc",
        },
      ],
    });
    if (!appointmentList) throw new NoDataError("No appointments found");

    const appointmentListWithClientProfile = await prisma.$transaction(async (tx) => {
      return await Promise.all(
        appointmentList.map(async (appointment) => {
          const clientProfile = await tx.clientProfile.findUnique({
            where: {
              id: appointment.clientProfileId,
            },
          });

          return {
            id: appointment.id,
            title: appointment.title,
            date: moment(appointment.date).format("MM/DD/YYYY"),
            time: moment(appointment.time).format("hh:mm A"),
            clientName: `${clientProfile?.firstName} ${clientProfile?.lastName}`,
          };
        }),
      );
    })

    return apiResponse(ctx, appointmentListWithClientProfile);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}