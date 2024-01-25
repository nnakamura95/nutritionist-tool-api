import AWS from "aws-sdk";

const settings = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  endpoint: process.env.S3_ENDPOINT,
  s3ForcePathStyle: Boolean(process.env.S3_FORCE_PATH_STYLE),
};

AWS.config.update(settings);

export const s3Config = new AWS.S3();