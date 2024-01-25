import { Context } from "hono";
import prisma from "../../../lib/prisma";
import { BadRequestError, NoDataError } from "../../../lib/errors/ApiErrors";
import moment from "moment/moment";
import { apiErrorResponse, apiResponse } from "../../../lib/util/apiResponses";

export default async function aptUpdate(ctx: Context) {
  try {
    const { id } = ctx.req.param();

    const body = await ctx.req.json();
    if (!body) throw new BadRequestError("Appointment data missing");

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });
    if (!appointment) throw new NoDataError("Appointment doesn't exist");

    const date = body.date;

    if (date !== moment(body.date).format("MM/DD/YYYY")) {
      const currentDate: moment.Moment = moment();
      const targetDate: moment.Moment = moment(date);

      const isOlderDate: boolean = targetDate.isBefore(currentDate);
      if (isOlderDate) {
        throw new BadRequestError("Cannot accept passed date");
      }

      const threeMonthsLater: moment.Moment = currentDate.clone().add(3, "months");
      const isWithinThreeMonths: boolean = moment(date).isBetween(targetDate, threeMonthsLater, "day");
      if (!isWithinThreeMonths) {
        throw new BadRequestError("Date cannot more than 3 months later");
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.appointment.update({
        where: {
          id: id,
        },
        data: {
          ...body,
          date: new Date(date),
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