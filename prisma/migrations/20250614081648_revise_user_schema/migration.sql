/*
  Warnings:

  - You are about to drop the column `passwordToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordToken",
ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "User_userId_seq";
