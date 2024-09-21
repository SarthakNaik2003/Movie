/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserM` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserM_email_key` ON `UserM`(`email`);
