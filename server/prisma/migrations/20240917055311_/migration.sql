/*
  Warnings:

  - Added the required column `added` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `playlist` ADD COLUMN `added` BOOLEAN NOT NULL;
