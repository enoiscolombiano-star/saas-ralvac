/*
  Warnings:

  - You are about to drop the column `criado_em` on the `ad_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `investimento` on the `ad_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `receita` on the `ad_metrics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ad_metrics" DROP COLUMN "criado_em",
DROP COLUMN "investimento",
DROP COLUMN "receita",
ADD COLUMN     "gasto_total" DOUBLE PRECISION NOT NULL DEFAULT 0;
