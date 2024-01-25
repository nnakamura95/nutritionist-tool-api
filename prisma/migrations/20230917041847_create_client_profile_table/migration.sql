-- CreateTable
CREATE TABLE "ClientProfile" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "dob" DATE NOT NULL,
    "age" INTEGER NOT NULL,
    "emailAddress" VARCHAR(200) NOT NULL,
    "phoneNumber" VARCHAR(11) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ClientProfile_pkey" PRIMARY KEY ("id")
);

CREATE SEQUENCE clt_pfl_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "ClientProfile" ALTER COLUMN "id" SET DEFAULT concat('clt_pfl_', nextval('clt_pfl_seq'::regclass));