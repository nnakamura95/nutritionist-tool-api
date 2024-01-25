/*
  Warnings:

  - The primary key for the `BloodPressure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[medicalReportId]` on the table `BloodPressure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `BloodTest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `BloodType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `Eyesight` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `Hearing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `Hepatitis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `KidneyFunction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `LipidMetabolism` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `LiverGallbladderFunction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `StoolExamination` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `SugarMetabolism` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalReportId]` on the table `UrineGlucose` will be added. If there are existing duplicate values, this will fail.
  - Made the column `medicalReportId` on table `BloodPressure` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `BloodTest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `BloodType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `Eyesight` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `Hearing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `Hepatitis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `KidneyFunction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `LipidMetabolism` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `LiverGallbladderFunction` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `MedicalReport` table without a default value. This is not possible if the table is not empty.
  - Made the column `medicalReportId` on table `StoolExamination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `SugarMetabolism` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalReportId` on table `UrineGlucose` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BloodPressure" DROP CONSTRAINT "BloodPressure_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "BloodTest" DROP CONSTRAINT "BloodTest_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "BloodType" DROP CONSTRAINT "BloodType_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "Eyesight" DROP CONSTRAINT "Eyesight_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "Hearing" DROP CONSTRAINT "Hearing_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "Hepatitis" DROP CONSTRAINT "Hepatitis_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "KidneyFunction" DROP CONSTRAINT "KidneyFunction_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "LipidMetabolism" DROP CONSTRAINT "LipidMetabolism_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "LiverGallbladderFunction" DROP CONSTRAINT "LiverGallbladderFunction_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "StoolExamination" DROP CONSTRAINT "StoolExamination_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "SugarMetabolism" DROP CONSTRAINT "SugarMetabolism_medicalReportId_fkey";

-- DropForeignKey
ALTER TABLE "UrineGlucose" DROP CONSTRAINT "UrineGlucose_medicalReportId_fkey";

-- AlterTable
ALTER TABLE "BloodPressure" DROP CONSTRAINT "BloodPressure_pkey",
ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BloodTest" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BloodType" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Eyesight" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Hearing" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Hepatitis" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "KidneyFunction" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LipidMetabolism" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LiverGallbladderFunction" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "MedicalReport" ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "StoolExamination" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SugarMetabolism" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UrineGlucose" ALTER COLUMN "medicalReportId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BloodPressure_medicalReportId_key" ON "BloodPressure"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "BloodTest_medicalReportId_key" ON "BloodTest"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "BloodType_medicalReportId_key" ON "BloodType"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Eyesight_medicalReportId_key" ON "Eyesight"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Hearing_medicalReportId_key" ON "Hearing"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "Hepatitis_medicalReportId_key" ON "Hepatitis"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "KidneyFunction_medicalReportId_key" ON "KidneyFunction"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "LipidMetabolism_medicalReportId_key" ON "LipidMetabolism"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "LiverGallbladderFunction_medicalReportId_key" ON "LiverGallbladderFunction"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "StoolExamination_medicalReportId_key" ON "StoolExamination"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "SugarMetabolism_medicalReportId_key" ON "SugarMetabolism"("medicalReportId");

-- CreateIndex
CREATE UNIQUE INDEX "UrineGlucose_medicalReportId_key" ON "UrineGlucose"("medicalReportId");

-- AddForeignKey
ALTER TABLE "BloodPressure" ADD CONSTRAINT "BloodPressure_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eyesight" ADD CONSTRAINT "Eyesight_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodType" ADD CONSTRAINT "BloodType_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hearing" ADD CONSTRAINT "Hearing_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UrineGlucose" ADD CONSTRAINT "UrineGlucose_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoolExamination" ADD CONSTRAINT "StoolExamination_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodTest" ADD CONSTRAINT "BloodTest_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiverGallbladderFunction" ADD CONSTRAINT "LiverGallbladderFunction_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LipidMetabolism" ADD CONSTRAINT "LipidMetabolism_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KidneyFunction" ADD CONSTRAINT "KidneyFunction_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SugarMetabolism" ADD CONSTRAINT "SugarMetabolism_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hepatitis" ADD CONSTRAINT "Hepatitis_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
