-- CreateTable
CREATE TABLE `Users` (
    `userId` VARCHAR(191) NOT NULL,
    `uName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female', 'others') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
