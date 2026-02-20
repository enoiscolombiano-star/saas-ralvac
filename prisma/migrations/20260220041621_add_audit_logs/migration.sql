/*
  Warnings:

  - You are about to drop the column `data` on the `ad_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `link_vsl` on the `ads` table. All the data in the column will be lost.
  - You are about to drop the column `criado_por_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `atualizado_em` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `atualizado_em` on the `webhooks` table. All the data in the column will be lost.
  - The `eventos` column on the `webhooks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `evento` on the `webhook_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT');

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_criado_por_id_fkey";

-- DropIndex
DROP INDEX "ad_metrics_data_idx";

-- DropIndex
DROP INDEX "tasks_criado_por_id_idx";

-- AlterTable
ALTER TABLE "ad_metrics" DROP COLUMN "data",
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ads" DROP COLUMN "link_vsl";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "criado_por_id",
ADD COLUMN     "criado_por" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "atualizado_em";

-- AlterTable
ALTER TABLE "webhook_logs" DROP COLUMN "evento",
ADD COLUMN     "evento" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "webhooks" DROP COLUMN "atualizado_em",
DROP COLUMN "eventos",
ADD COLUMN     "eventos" TEXT[];

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" "AuditAction" NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT,
    "changes" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_idx" ON "audit_logs"("entity_type");

-- CreateIndex
CREATE INDEX "audit_logs_criado_em_idx" ON "audit_logs"("criado_em");

-- CreateIndex
CREATE INDEX "ad_metrics_criado_em_idx" ON "ad_metrics"("criado_em");

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
