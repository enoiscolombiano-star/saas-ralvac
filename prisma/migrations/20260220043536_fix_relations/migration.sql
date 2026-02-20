/*
  Warnings:

  - The `eventos` column on the `webhooks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `atualizado_em` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizado_em` to the `webhooks` table without a default value. This is not possible if the table is not empty.

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
DROP INDEX "ad_metrics_ad_id_idx";

-- DropIndex
DROP INDEX "ads_status_idx";

-- DropIndex
DROP INDEX "ads_task_id_idx";

-- DropIndex
DROP INDEX "audit_logs_entity_type_entity_id_idx";

-- DropIndex
DROP INDEX "utm_configs_task_id_idx";

-- AlterTable
ALTER TABLE "audit_logs" ALTER COLUMN "changes" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "webhooks" ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL,
DROP COLUMN "eventos",
ADD COLUMN     "eventos" TEXT[];

-- DropEnum
DROP TYPE "WebhookEvent";

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_idx" ON "audit_logs"("entity_type");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_metrics" ADD CONSTRAINT "ad_metrics_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_logs" ADD CONSTRAINT "webhook_logs_webhook_id_fkey" FOREIGN KEY ("webhook_id") REFERENCES "webhooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
