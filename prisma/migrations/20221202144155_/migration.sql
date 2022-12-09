/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,propertiesAsString]` on the table `StorageItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `StorageItem_propertiesAsString_key` ON `storageitem`;

-- AlterTable
ALTER TABLE `storageitemrecord` ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StorageItem_categoryId_propertiesAsString_key` ON `StorageItem`(`categoryId`, `propertiesAsString`);
