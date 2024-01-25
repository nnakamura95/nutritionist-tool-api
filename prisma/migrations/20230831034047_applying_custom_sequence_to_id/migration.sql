-- AlterTable
ALTER TABLE "BloodType" ALTER COLUMN "type" SET DATA TYPE CHAR,
ALTER COLUMN "Rh" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Hepatitis" ALTER COLUMN "hepatitisBSurfaceAntigen" SET DATA TYPE CHAR,
ALTER COLUMN "antiHepatitisBSerologic" SET DATA TYPE CHAR,
ALTER COLUMN "hepatitisCAntibody" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "StoolExamination" ALTER COLUMN "fecalOccultBloodLA1" SET DATA TYPE CHAR,
ALTER COLUMN "fecalOccultBloodLA2" SET DATA TYPE CHAR;
