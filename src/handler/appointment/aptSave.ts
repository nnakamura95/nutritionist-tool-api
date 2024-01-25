import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError, ConflictError } from "../../../lib/errors/ApiErrors";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";
import moment from "moment";

export default async function aptSave(ctx: Context) {
  try {
    const body = await ctx.req.json();
    if (!body) throw new BadRequestError("Appointment data missing");

    const { title, date, time, text, selectedClientId } = body;

    const currentDate: moment.Moment = moment();
    const targetDate: moment.Moment = moment(date);
    const isOlderDate: boolean = targetDate.isBefore(currentDate);

    if (isOlderDate) throw new BadRequestError("Cannot accept passed date");

    const threeMonthsLater: moment.Moment = currentDate.clone().add(3, "months");
    const isWithinThreeMonths: boolean = moment(date).isBetween(targetDate, threeMonthsLater, "day");

    if (!isWithinThreeMonths) throw new BadRequestError("Date cannot more than 3 months later");

    const appointment = await prisma.appointment.findFirst({
      where: {
        date,
        time,
        clientProfileId: selectedClientId,
      },
    });
    if (appointment) throw new ConflictError("There's already an exising appointment");

    await prisma.$transaction(async (tx) => {
      await tx.appointment.create({
        data: {
          title,
          date: new Date(date),
          time,
          description: text,
          clientProfileId: selectedClientId,
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