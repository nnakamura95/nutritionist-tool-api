-- AlterTable
ALTER TABLE "User" ALTER COLUMN "active" DROP NOT NULL;

CREATE SEQUENCE user_id_seq
    INCREMENT 1
    START 1
    CACHE 1;

ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('user_', nextval('user_id_seq'::regclass));
