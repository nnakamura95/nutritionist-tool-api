import { Context } from "hono";
import imageUpload from "../../../../lib/s3/imageUpload";
import prisma from "../../../../lib/prisma";
import {
  BadRequestError,
  ConflictError,
} from "../../../../lib/errors/ApiErrors";
import { hashHandler } from "../../../../lib/util/passwordUtility";
import { Role } from "@prisma/client";
import {
  apiErrorResponse,
  apiResponse,
} from "../../../../lib/util/apiResponses";
import { isSystemHexColor } from "../../../../lib/util/generateRandomColor";
import { Validator } from "../../../../lib/util/Validator";

export default async function register(ctx: Context) {
  try {
    const body = await ctx.req.json();
    if (!body) throw new BadRequestError("Admin data missing");

    const {
      emailAddress,
      firstName,
      lastName,
      dob,
      age,
      phoneNumber,
      address,
      avatarColor,
      image,
      password,
    } = body;

    if (!emailAddress) throw new BadRequestError("Email address missing");
    if (!password) throw new BadRequestError("Password missing");

    const admin = await prisma.user.findUnique({
      where: {
        emailAddress: emailAddress,
      },
    });
    if (admin) throw new ConflictError("User already exist");

    const validatorOptions = {
      emailAddress: {
        value: emailAddress,
        maxLength: 200,
      },
      firstName: {
        value: firstName,
        maxLength: 100,
      },
      lastName: {
        value: lastName,
        maxLength: 100,
      },
      dob: {
        value: dob,
        dateTime: "MM/DD/YYYY",
      },
      age: {
        value: age,
        handler: (value: number) => {
          return 18 < value && value < 120;
        },
      },
      phoneNumber: {
        value: phoneNumber,
        maxLength: 13,
      },
      address: {
        value: address,
        maxLength: 200,
      },
      ...(avatarColor && {
        avatarColor: {
          value: avatarColor,
          handler: (value: string) => {
            return isSystemHexColor(value);
          },
        },
      }),
      ...(image && {
        image: {
          value: image,
          handler: (value: string) => {
            const validExt = ["png", "jpeg", "jpg", "heic"];
            const imageExt = value.split("").pop()?.toLowerCase();
            return imageExt ? validExt.includes(imageExt) : false;
          },
        },
      }),
      password: {
        value: password,
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

    const adminData = await prisma.$transaction(async (tx) => {
      let user;
      user = await tx.user.findFirst({
        where: {
          emailAddress: data.emailAddress,
          role: Role.Admin,
          active: true,
        },
      });

      if (!user) {
        user = await tx.user.create({
          data: {
            emailAddress: data.emailAddress,
            password: passwordHash,
            role: Role.Admin,
          },
        });
      }

      let admin;
      admin = await tx.admin.findFirst({
        where: {
          emailAddress: data.emailAddress,
          userId: user.id,
        },
      });

      if (!admin) {
        admin = await tx.admin.create({
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
      }

      return admin;
    });

    return apiResponse(
      ctx,
      adminData && {
        imageUrl: adminData.imageUrl,
        imageId: adminData.imageId,
      },
    );
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
