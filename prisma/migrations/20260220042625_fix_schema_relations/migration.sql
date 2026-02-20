/*
  Warnings:

  - You are about to drop the column `veiculado_em` on the `ads` table. All the data in the column will be lost.
  - You are about to drop the column `ip_address` on the `audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `audit_logs` table. All the data in the column will be lost.
  - The `changes` column on the `audit_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `evento` on the `webhook_logs` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `webhook_logs` table. All the data in the column will be lost.
  - You are about to drop the column `resposta` on the `webhook_logs` table. All the data in the column will be lost.
  - The `eventos` column on the `webhooks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `link_base` to the `ads` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `audit_logs` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `action` on the `audit_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `entity_id` on table `audit_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status_code` on table `webhook_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ad_metrics" DROP CONSTRAINT "ad_metrics_ad_id_fkey";

-- DropForeignKey
ALTER TABLE "ads" DROP CONSTRAINT "ads_task_id_fkey";

-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "webhook_logs" DROP CONSTRAINT "webhook_logs_webhook_id_fkey";

-- DropIndex
DROP INDEX "ad_metrics_criado_em_idx";

-- DropIndex
DROP INDEX "audit_logs_criado_em_idx";

-- DropIndex
DROP INDEX "audit_logs_entity_type_idx";

-- DropIndex
DROP INDEX "audit_logs_user_id_idx";

-- DropIndex
DROP INDEX "sessions_token_idx";

-- DropIndex
DROP INDEX "sessions_user_id_idx";

-- DropIndex
DROP INDEX "webhook_logs_criado_em_idx";

-- DropIndex
DROP INDEX "webhook_logs_webhook_id_idx";

-- AlterTable
ALTER TABLE "ads" DROP COLUMN "veiculado_em",
ADD COLUMN     "link_base" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "ip_address",
DROP COLUMN "user_agent",
ALTER COLUMN "user_id" SET NOT NULL,
DROP COLUMN "action",
ADD COLUMN     "action" TEXT NOT NULL,
ALTER COLUMN "entity_id" SET NOT NULL,
DROP COLUMN "changes",
ADD COLUMN     "changes" JSONB;

-- AlterTable
ALTER TABLE "webhook_logs" DROP COLUMN "evento",
DROP COLUMN "payload",
DROP COLUMN "resposta",
ADD COLUMN     "response" TEXT,
ALTER COLUMN "status_code" SET NOT NULL;

-- AlterTable
ALTER TABLE "webhooks" DROP COLUMN "eventos",
ADD COLUMN     "eventos" "WebhookEvent"[];

-- DropEnum
DROP TYPE "AuditAction";

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- AddForeignKey
ALTER TABLE "webhook_logs" ADD CONSTRAINT "webhook_logs_webhook_id_fkey" FOREIGN KEY ("webhook_id") REFERENCES "webhooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_metrics" ADD CONSTRAINT "ad_metrics_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
