/*
  Warnings:

  - Added the required column `firstName` to the `MedicalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `MedicalReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BloodPressure" ADD COLUMN     "lowestBloodPressureSecond" INTEGER,
ALTER COLUMN "highestBloodPressure" DROP NOT NULL,
ALTER COLUMN "lowestBloodPressure" DROP NOT NULL,
ALTER COLUMN "highestBloodPressureSecond" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BloodType" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" SET DATA TYPE CHAR,
ALTER COLUMN "Rh" DROP NOT NULL,
ALTER COLUMN "Rh" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Eyesight" ADD COLUMN     "leftEyeCorrection" DECIMAL(5,1),
ADD COLUMN     "rightEyeCorrection" DECIMAL(5,1),
ALTER COLUMN "leftEye" DROP NOT NULL,
ALTER COLUMN "rightEye" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Hearing" ADD COLUMN     "leftEar4000hz" VARCHAR(20),
ADD COLUMN     "rightEar4000hz" VARCHAR(20),
ALTER COLUMN "leftEar1000hz" DROP NOT NULL,
ALTER COLUMN "rightEar1000hz" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicalReport" ADD COLUMN     "bodyMassIndex" INTEGER,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "firstName" VARCHAR(100) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE "UrineGlucose" (
    "id" TEXT NOT NULL,
    "urineGlucoseQualitative" VARCHAR(3),
    "urineProteinQualitative" VARCHAR(3),
    "uricBlood" VARCHAR(3),
    "urobilinogenQualitative" VARCHAR(3),
    "medicalReportId" TEXT,

    CONSTRAINT "UrineGlucose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoolExamination" (
    "id" TEXT NOT NULL,
    "fecalOccultBloodLA1" CHAR,
    "fecalOccultBloodLA2" CHAR,
    "medicalReportId" TEXT,

    CONSTRAINT "StoolExamination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodTest" (
    "id" TEXT NOT NULL,
    "whiteBloodCellCount" DECIMAL(5,1),
    "redBloodCellCount" INTEGER,
    "hemoglobinContent" DECIMAL(5,1),
    "hematocrit" DECIMAL(5,1),
    "meanCorpuscularVolume" DECIMAL(5,1),
    "meanCorpuscularHemoglobin" DECIMAL(5,1),
    "meanCorpuscularHemoglobinConcentration" DECIMAL(5,1),
    "bloodPlateletCount" DECIMAL(5,1),
    "medicalReportId" TEXT,

    CONSTRAINT "BloodTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiverGallbladderFunction" (
    "id" TEXT NOT NULL,
    "aspartateAminotransferase" INTEGER,
    "alanineTransaminase" INTEGER,
    "gammaGlutamylTranspeptidase" INTEGER,
    "alkalinePhosphatase" INTEGER,
    "lactateDehydrogenase" INTEGER,
    "totalBilirubin" DECIMAL(5,1),
    "totalProtein" DECIMAL(5,1),
    "albumin" DECIMAL(5,1),
    "albuminGlobulinRatio" DECIMAL(5,1),
    "medicalReportId" TEXT,

    CONSTRAINT "LiverGallbladderFunction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LipidMetabolism" (
    "id" TEXT NOT NULL,
    "naturalFat" INTEGER,
    "totalCholesterol" INTEGER,
    "hdLCholesterol" INTEGER,
    "nonHdl" INTEGER,
    "ldLCholesterol" INTEGER,
    "medicalReportId" TEXT,

    CONSTRAINT "LipidMetabolism_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KidneyFunction" (
    "id" TEXT NOT NULL,
    "ureaNitrogen" DECIMAL(5,1),
    "creatinine" DECIMAL(5,2),
    "uricAcid" DECIMAL(5,1),
    "estimatedGlomerularFiltrationRate" DECIMAL(5,1),
    "medicalReportId" TEXT,

    CONSTRAINT "KidneyFunction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SugarMetabolism" (
    "id" TEXT NOT NULL,
    "bloodSugar" DECIMAL(5,1),
    "hba1c" DECIMAL(5,1),
    "medicalReportId" TEXT,

    CONSTRAINT "SugarMetabolism_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hepatitis" (
    "id" TEXT NOT NULL,
    "hepatitisBSurfaceAntigen" CHAR,
    "antiHepatitisBSerologic" CHAR,
    "hepatitisCAntibody" CHAR,
    "medicalReportId" TEXT,

    CONSTRAINT "Hepatitis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UrineGlucose" ADD CONSTRAINT "UrineGlucose_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoolExamination" ADD CONSTRAINT "StoolExamination_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodTest" ADD CONSTRAINT "BloodTest_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiverGallbladderFunction" ADD CONSTRAINT "LiverGallbladderFunction_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LipidMetabolism" ADD CONSTRAINT "LipidMetabolism_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KidneyFunction" ADD CONSTRAINT "KidneyFunction_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SugarMetabolism" ADD CONSTRAINT "SugarMetabolism_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hepatitis" ADD CONSTRAINT "Hepatitis_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;


CREATE SEQUENCE uri_glu_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "UrineGlucose" ALTER COLUMN "id" SET DEFAULT concat('uri_glu_', nextval('uri_glu_seq'::regclass));

CREATE SEQUENCE stl_exm_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "StoolExamination" ALTER COLUMN "id" SET DEFAULT concat('stl_exm_', nextval('stl_exm_seq'::regclass));

CREATE SEQUENCE bld_tst_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "BloodTest" ALTER COLUMN "id" SET DEFAULT concat('bld_tst_', nextval('bld_tst_seq'::regclass));

CREATE SEQUENCE lvr_gal_fun_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "LiverGallbladderFunction" ALTER COLUMN "id" SET DEFAULT concat('lvr_gal_fun_', nextval('lvr_gal_fun_seq'::regclass));

CREATE SEQUENCE lip_meta_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "LipidMetabolism" ALTER COLUMN "id" SET DEFAULT concat('lip_meta_', nextval('lip_meta_seq'::regclass));

CREATE SEQUENCE kdy_fun_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "KidneyFunction" ALTER COLUMN "id" SET DEFAULT concat('kdy_fun_', nextval('kdy_fun_seq'::regclass));

CREATE SEQUENCE sgr_meta_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "SugarMetabolism" ALTER COLUMN "id" SET DEFAULT concat('sgr_meta_', nextval('sgr_meta_seq'::regclass));

CREATE SEQUENCE hps_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "Hepatitis" ALTER COLUMN "id" SET DEFAULT concat('hps_', nextval('hps_seq'::regclass));