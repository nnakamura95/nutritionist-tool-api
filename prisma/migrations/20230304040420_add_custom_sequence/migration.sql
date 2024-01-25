-- AlterTable
ALTER TABLE "BloodType" ALTER COLUMN "type" SET DATA TYPE CHAR,
ALTER COLUMN "Rh" SET DATA TYPE CHAR;

ALTER TABLE "Eyesight" ALTER COLUMN "leftEye" TYPE DECIMAL(5,1);
ALTER TABLE "Eyesight" ALTER COLUMN "rightEye" TYPE DECIMAL(5,1);

ALTER TABLE "Hearing" ALTER COLUMN "leftEar" TYPE VARCHAR(20);
ALTER TABLE "Hearing" ALTER COLUMN "rightEar" TYPE VARCHAR(20);

ALTER TABLE "Hearing" RENAME "leftEar" TO "leftEar1000hz";
ALTER TABLE "Hearing" RENAME "rightEar" TO "rightEar1000hz";

ALTER TABLE "BloodPressure" RENAME "mmHg" TO "highestBloodPressureSecond";