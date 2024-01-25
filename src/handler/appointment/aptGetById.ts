import { Context } from "hono";
import prisma from "../../../lib/prisma";
import moment from "moment";
import { BadRequestError, NoDataError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function aptGetById(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });
    if (!appointment) throw new NoDataError("Appointment doesn't exist");

    const clientProfile = await prisma.clientProfile.findUnique({
      where: {
        id: appointment?.clientProfileId,
      },
    });
    if (!clientProfile) throw new NoDataError("Client doesn't exist");

    const clientAppointmentDetail = {
      id: appointment?.id,
      title: appointment?.title,
      date: moment(appointment?.date).format("MM/DD/YYYY"),
      time: appointment?.time,
      description: appointment?.description,
      clientName: `${clientProfile?.firstName} ${clientProfile?.lastName}`,
    };

    return apiResponse(ctx, clientAppointmentDetail);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}