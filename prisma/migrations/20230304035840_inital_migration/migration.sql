-- CreateTable
CREATE TABLE "MedicalReport" (
    "id" TEXT NOT NULL,
    "gender" VARCHAR(6) NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "waistCircumference" INTEGER,

    CONSTRAINT "MedicalReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodPressure" (
    "id" TEXT NOT NULL,
    "highestBloodPressure" INTEGER NOT NULL,
    "lowestBloodPressure" INTEGER NOT NULL,
    "mmHg" INTEGER NOT NULL,
    "medicalReportId" TEXT,

    CONSTRAINT "BloodPressure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eyesight" (
    "id" TEXT NOT NULL,
    "leftEye" INTEGER NOT NULL,
    "rightEye" INTEGER NOT NULL,
    "medicalReportId" TEXT,

    CONSTRAINT "Eyesight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodType" (
    "id" TEXT NOT NULL,
    "type" CHAR NOT NULL,
    "Rh" CHAR NOT NULL,
    "medicalReportId" TEXT,

    CONSTRAINT "BloodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hearing" (
    "id" TEXT NOT NULL,
    "leftEar" INTEGER NOT NULL,
    "rightEar" INTEGER NOT NULL,
    "medicalReportId" TEXT,

    CONSTRAINT "Hearing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BloodPressure" ADD CONSTRAINT "BloodPressure_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eyesight" ADD CONSTRAINT "Eyesight_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodType" ADD CONSTRAINT "BloodType_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hearing" ADD CONSTRAINT "Hearing_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "MedicalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;


CREATE SEQUENCE medical_report_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "MedicalReport" ALTER COLUMN "id" SET DEFAULT concat('med_rpt_', nextval('medical_report_id_seq'::regclass));

CREATE SEQUENCE eyesight_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "Eyesight" ALTER COLUMN "id" SET DEFAULT concat('eye_st_', nextval('eyesight_id_seq'::regclass));

CREATE SEQUENCE blood_pressure_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "BloodPressure" ALTER COLUMN "id" SET DEFAULT concat('bld_prs_', nextval('blood_pressure_id_seq'::regclass));

CREATE SEQUENCE blood_type_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "BloodType" ALTER COLUMN "id" SET DEFAULT concat('bld_type_', nextval('blood_type_id_seq'::regclass));

CREATE SEQUENCE hearing_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "Hearing" ALTER COLUMN "id" SET DEFAULT concat('hearing_', nextval('hearing_id_seq'::regclass));