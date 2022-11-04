-- DropForeignKey
ALTER TABLE `storagecategoryonstoragecategoryformfield` DROP FOREIGN KEY `StorageCategoryOnStorageCategoryFormField_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `storagecategoryonstoragecategoryformfield` DROP FOREIGN KEY `StorageCategoryOnStorageCategoryFormField_fieldId_fkey`;

-- AddForeignKey
ALTER TABLE `StorageCategoryOnStorageCategoryFormField` ADD CONSTRAINT `StorageCategoryOnStorageCategoryFormField_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `StorageCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StorageCategoryOnStorageCategoryFormField` ADD CONSTRAINT `StorageCategoryOnStorageCategoryFormField_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `StorageCategoryFormField`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
