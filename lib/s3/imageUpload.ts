import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { fileTypeFromBuffer } from "file-type";
import { s3Config } from "./s3Config";
import moment from "moment";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;

function isBase64Image(file: string) {
  const base64Regex = /^data:image\/([a-zA-Z]*);base64,(\S*)$/;
  return base64Regex.test(file);
}

function fileToBase64(file: string) {
  const fileData = fs.readFileSync(file);
  return Buffer.from(fileData).toString("base64");
}

async function getImageTypeExt(image: any) {
  const acceptedImageFileTypes = ["png", "jpeg", "jpg", "heic"];

  const imageType = await fileTypeFromBuffer(image);
  if (!acceptedImageFileTypes.includes(imageType?.ext as string)) {
    return null;
  }
  return imageType?.ext;
}

type ImageUploadingDetail = {
  image: any;
  section: string;
};

export default async function imageUpload(imageUploadingDetail: ImageUploadingDetail) {
  const { image, section } = imageUploadingDetail;

  let base64Image = image;
  if (!isBase64Image(image)) {
    base64Image = fileToBase64(image);
  }

  const imageTypeExt = await getImageTypeExt(base64Image);
  const dateNow = moment();
  const keyName = `nutri-image/${section}/${dateNow}/${uuidv4()}.${imageTypeExt}`;
  const params = {
    Bucket: process.env.BUCKET as string,
    Body: base64Image,
    Key: keyName,
  };

  let url: any;
  s3Config.upload(params, (error: any, data: SendData) => {
    if (error) {
      throw new Error("Upload image to S3 failed");
    }
    url = data.Location;
    console.log("File uploaded successfully");
  });

  return {
    url,
    keyName,
  };
}
