/*
  Warnings:

  - You are about to drop the column `avatarColor` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ClientProfile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Nutritionist');

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "avatarColor",
DROP COLUMN "imageUrl",
ADD COLUMN     "nutritionistId" TEXT;

-- CreateTable
CREATE TABLE "Nutritionist" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "dob" DATE NOT NULL,
    "age" INTEGER NOT NULL,
    "emailAddress" VARCHAR(200) NOT NULL,
    "phoneNumber" VARCHAR(13),
    "address" VARCHAR(200),
    "education" VARCHAR(200),
    "cirtificate" VARCHAR(200),
    "avatarColor" VARCHAR(15),
    "imageUrl" VARCHAR(500),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Nutritionist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "dob" DATE NOT NULL,
    "age" INTEGER NOT NULL,
    "emailAddress" VARCHAR(200) NOT NULL,
    "phoneNumber" VARCHAR(13),
    "address" VARCHAR(200),
    "avatarColor" VARCHAR(15),
    "imageUrl" VARCHAR(500),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "emailAddress" VARCHAR(200) NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "role" "Role" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nutritionist_emailAddress_key" ON "Nutritionist"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Nutritionist_userId_key" ON "Nutritionist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_emailAddress_key" ON "Admin"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- AddForeignKey
ALTER TABLE "ClientProfile" ADD CONSTRAINT "ClientProfile_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutritionist" ADD CONSTRAINT "Nutritionist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE SEQUENCE nutritionist_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "Nutritionist" ALTER COLUMN "id" SET DEFAULT concat('ntr_', nextval('nutritionist_id_seq'::regclass));


CREATE SEQUENCE admin_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT concat('adm_', nextval('admin_id_seq'::regclass));