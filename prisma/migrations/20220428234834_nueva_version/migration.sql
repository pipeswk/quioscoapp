/*
  Warnings:

  - Added the required column `mesa` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mesero` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orden` ADD COLUMN `mesa` VARCHAR(191) NOT NULL,
    ADD COLUMN `mesero` VARCHAR(191) NOT NULL;
