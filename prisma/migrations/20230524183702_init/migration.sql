-- CreateTable
CREATE TABLE `Salaries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salary` INTEGER NOT NULL,
    `employees_id` INTEGER NOT NULL,

    UNIQUE INDEX `Salaries_employees_id_key`(`employees_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job` VARCHAR(191) NOT NULL,
    `employees_id` INTEGER NOT NULL,

    UNIQUE INDEX `Job_employees_id_key`(`employees_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Salaries` ADD CONSTRAINT `Salaries_employees_id_fkey` FOREIGN KEY (`employees_id`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_employees_id_fkey` FOREIGN KEY (`employees_id`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
