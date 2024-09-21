/*
  Warnings:

  - The primary key for the `userm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uName` on the `userm` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `userm` table. All the data in the column will be lost.
  - Added the required column `email` to the `UserM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `UserM` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `UserM` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `lastName` to the `UserM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userm` DROP PRIMARY KEY,
    DROP COLUMN `uName`,
    DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
