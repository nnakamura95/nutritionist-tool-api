import { Context } from "hono";
import prisma from "../../../../lib/prisma";
import {
  apiErrorResponse,
  apiResponse,
} from "../../../../lib/util/apiResponses";
import {
  BadRequestError,
  ConflictError,
} from "../../../../lib/errors/ApiErrors";
import { isSystemHexColor } from "../../../../lib/util/generateRandomColor";
import { Validator } from "../../../../lib/util/Validator";
import { Role } from "@prisma/client";
import { hashHandler } from "../../../../lib/util/passwordUtility";
import imageUpload from "../../../../lib/s3/imageUpload";

export default async function register(ctx: Context) {
  try {
    const body = await ctx.req.json();
    if (!body) throw new BadRequestError("Data missing");

    const user = await prisma.user.findUnique({
      where: {
        emailAddress: body.emailAddress,
        active: true,
        deletedAt: undefined,
      },
    });
    if (user) throw new ConflictError("User already exist");

    const validatorOptions = {
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
      ...(body.avatarColor && {
        avatarColor: {
          value: body.avatarColor,
          handler: (value: string) => {
            return isSystemHexColor(value);
          },
        },
      }),
      ...(body.image && {
        image: {
          value: body.image,
          handler: (value: string) => {
            const validExt = ["png", "jpeg", "jpg", "heic"];
            const imageExt = value.split("").pop()?.toLowerCase();
            return imageExt ? validExt.includes(imageExt) : false;
          },
        },
      }),
      password: {
        value: body.password,
        maxLength: 30,
      },
    };

    const validator = new Validator(validatorOptions);
    const data = validator.valid();

    const passwordHash: string = await hashHandler(data.password);

    let imageUrl: string | undefined;
    let imageId: string | undefined;
    if (data.image) {
      const imageUploadingDetail = {
        image: data.image,
        section: "admin",
      };
      const imageDetail = await imageUpload(imageUploadingDetail);
      imageUrl = imageDetail.url;
      imageId = imageDetail.keyName;
    }

    const resultImageDetail = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          emailAddress: data.emailAddress,
          password: data.password,
          role: Role.Nutritionist,
          active: true,
        },
      });

      const nutritionist = await tx.nutritionist.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          age: data.age,
          emailAddress: data.emailAddress,
          phoneNumber: data.phoneNumber,
          address: data.address,
          ...(data.avatarColor && { avatarColor: data.avatarColor }),
          ...(imageUrl && { imageUrl }),
          ...(imageId && { imageId }),
          userId: user.id,
        },
      });

      return nutritionist.imageUrl ? {
        imageUrl: nutritionist.imageUrl,
        imageId: nutritionist.imageId,
      } : null;
    });

    return apiResponse(ctx, resultImageDetail);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
