-- CreateTable
CREATE TABLE `Playlist` (
    `id` INTEGER NOT NULL,
    `movie` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `imdb_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Playlist_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
