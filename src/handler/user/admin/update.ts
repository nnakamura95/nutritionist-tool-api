import { Context } from "hono";
import { BadRequestError, NoDataError } from "../../../../lib/errors/ApiErrors";
import prisma from "../../../../lib/prisma";
import {
  apiErrorResponse,
  apiResponse,
} from "../../../../lib/util/apiResponses";

export default async function update(ctx: Context) {
  try {
    const { id } = ctx.req.param();
    const body = await ctx.req.json();

    if (!body) throw new BadRequestError("User data missing");

    const user = await prisma.user.findUnique({
      where: {
        emailAddress: body.emailAddress,
      },
    });

    if (!user) throw new NoDataError("User doesn't exist");

    if (!user?.active) throw new BadRequestError("User is not valid");

    const validationOptions = {
      emailAddress: {
        value: body.emailAddress,
        maxLength: 200,
      },
      firstName: {
        value: body.firstName,
        maxLength: 100,
      },
      lastName: {
        value: body.lastName,
        maxLength: 100,
      },
      dob: {
        value: body.dob,
        dateTime: "MM/DD/YYYY",
      },
      age: {
        value: body.age,
        handler: (value: number) => {
          return 18 < value && value < 120;
        },
      },
      phoneNumber: {
        value: body.phoneNumber,
        maxLength: 13,
      },
      address: {
        value: body.address,
        maxLength: 200,
      },
    };

    const validator = new Validator(validationOptions);
    const {
      emailAddress,
      firstName,
      lastName,
      dob,
      age,
      phoneNumber,
      address,
    } = validator.valid();

    await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.update({
        where: {
          id,
        },
        data: {
          emailAddress,
          firstName,
          lastName,
          dob,
          age,
          phoneNumber,
          address,
        },
      });

      await tx.user.update({
        where: {
          id: admin.userId,
        },
        data: {
          emailAddress,
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