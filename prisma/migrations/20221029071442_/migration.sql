/*
  Warnings:

  - You are about to drop the `_storagecategorytostoragecategoryformfield` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_storagecategorytostoragecategoryformfield` DROP FOREIGN KEY `_StorageCategoryToStorageCategoryFormField_A_fkey`;

-- DropForeignKey
ALTER TABLE `_storagecategorytostoragecategoryformfield` DROP FOREIGN KEY `_StorageCategoryToStorageCategoryFormField_B_fkey`;

-- DropTable
DROP TABLE `_storagecategorytostoragecategoryformfield`;

-- CreateTable
CREATE TABLE `StorageCategoryOnStorageCategoryFormField` (
    `categoryId` INTEGER NOT NULL,
    `fieldId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`categoryId`, `fieldId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StorageCategoryOnStorageCategoryFormField` ADD CONSTRAINT `StorageCategoryOnStorageCategoryFormField_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `StorageCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StorageCategoryOnStorageCategoryFormField` ADD CONSTRAINT `StorageCategoryOnStorageCategoryFormField_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `StorageCategoryFormField`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
