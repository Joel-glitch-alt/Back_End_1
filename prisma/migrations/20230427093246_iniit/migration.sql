/*
  Warnings:

  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");
