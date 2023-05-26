-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_employees_id_fkey`;

-- DropForeignKey
ALTER TABLE `Salaries` DROP FOREIGN KEY `Salaries_employees_id_fkey`;

-- AlterTable
ALTER TABLE `Job` MODIFY `employees_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Salaries` MODIFY `employees_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Salaries` ADD CONSTRAINT `Salaries_employees_id_fkey` FOREIGN KEY (`employees_id`) REFERENCES `Employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_employees_id_fkey` FOREIGN KEY (`employees_id`) REFERENCES `Employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
