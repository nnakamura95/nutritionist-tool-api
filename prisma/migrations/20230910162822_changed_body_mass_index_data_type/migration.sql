/*
  Warnings:

  - You are about to alter the column `bodyMassIndex` on the `MedicalReport` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,1)`.

*/
-- AlterTable
ALTER TABLE "BloodType" ALTER COLUMN "type" SET DATA TYPE CHAR,
ALTER COLUMN "Rh" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Hepatitis" ALTER COLUMN "hepatitisBSurfaceAntigen" SET DATA TYPE CHAR,
ALTER COLUMN "antiHepatitisBSerologic" SET DATA TYPE CHAR,
ALTER COLUMN "hepatitisCAntibody" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "MedicalReport" ALTER COLUMN "bodyMassIndex" SET DATA TYPE DECIMAL(5,1);

-- AlterTable
ALTER TABLE "StoolExamination" ALTER COLUMN "fecalOccultBloodLA1" SET DATA TYPE CHAR,
ALTER COLUMN "fecalOccultBloodLA2" SET DATA TYPE CHAR;
