/*
  Warnings:

  - You are about to drop the column `link_base` on the `ads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ads" DROP COLUMN "link_base";

-- CreateIndex
CREATE INDEX "ad_metrics_ad_id_idx" ON "ad_metrics"("ad_id");

-- CreateIndex
CREATE INDEX "ads_task_id_idx" ON "ads"("task_id");

-- CreateIndex
CREATE INDEX "ads_status_idx" ON "ads"("status");

-- CreateIndex
CREATE INDEX "sessions_token_idx" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "webhook_logs_webhook_id_idx" ON "webhook_logs"("webhook_id");

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
