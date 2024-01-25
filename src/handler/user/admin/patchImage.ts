import { Context } from "hono";
import prisma from "../../../../lib/prisma";
import {
  apiErrorResponse,
  apiResponse,
} from "../../../../lib/util/apiResponses";
import { BadRequestError, NoDataError } from "../../../../lib/errors/ApiErrors";
import imageUpload from "../../../../lib/s3/imageUpload";

export default async function patchImage(ctx: Context) {
  try {
    const { id } = ctx.req.param();
    const { image } = await ctx.req.json();

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NoDataError("User doesn't exist");

    if (!user?.active) throw new BadRequestError("User is not valid");

    if (!image) throw new BadRequestError("Data missing");

    const validationOptions = {
      image: {
        value: image,
        handler: (value: string) => {
          const validExt = ["png", "jpeg", "jpg", "heic"];
          const imageExt = value.split("").pop()?.toLowerCase();
          return imageExt ? validExt.includes(imageExt) : false;
        },
      },
    };

    const validator = new Validator(validationOptions);
    const data = validator.valid();

    const imageUploadingDetail = {
      image: data.image,
      section: "admin",
    };

    const imageDetail = await imageUpload(imageUploadingDetail);
    const imageUrl = imageDetail.url;
    const imageId = imageDetail.keyName;

    const admin = await prisma.$transaction(async (tx) => {
      return tx.admin.update({
        where: {
          emailAddress: user.emailAddress,
        },
        data: {
          imageUrl,
          imageId,
        },
      });
    });

    const adminImageDetail = {
      imageUrl: admin.imageUrl,
      imageId: admin.imageId,
    };

    return apiResponse(ctx, adminImageDetail);
  } catch (error) {
    return apiErrorResponse(ctx, error);
  } finally {
    await prisma.$disconnect();
  }
}
