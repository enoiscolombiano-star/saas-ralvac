/*
  Warnings:

  - Added the required column `link_original` to the `ads` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ad_metrics_ad_id_idx";

-- DropIndex
DROP INDEX "ads_status_idx";

-- DropIndex
DROP INDEX "ads_task_id_idx";

-- DropIndex
DROP INDEX "sessions_token_idx";

-- DropIndex
DROP INDEX "webhook_logs_webhook_id_idx";

-- AlterTable
ALTER TABLE "ads" ADD COLUMN     "link_original" TEXT NOT NULL;
