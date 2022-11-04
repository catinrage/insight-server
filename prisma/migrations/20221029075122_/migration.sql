-- DropForeignKey
ALTER TABLE `storagecategoryonstoragecategoryformfield` DROP FOREIGN KEY `StorageCategoryOnStorageCategoryFormField_fieldId_fkey`;

-- AddForeignKey
ALTER TABLE `StorageCategoryOnStorageCategoryFormField` ADD CONSTRAINT `StorageCategoryOnStorageCategoryFormField_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `StorageCategoryFormField`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
