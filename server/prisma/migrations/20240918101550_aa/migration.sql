/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `UserM` (
    `userId` VARCHAR(191) NOT NULL,
    `uName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female', 'others') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
