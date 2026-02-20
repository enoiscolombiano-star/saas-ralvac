-- CreateEnum
CREATE TYPE "AdStatus" AS ENUM ('RASCUNHO', 'VEICULADO', 'PAUSADO', 'FINALIZADO');

-- CreateTable
CREATE TABLE "ads" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "link_gerado" TEXT NOT NULL,
    "link_vsl" TEXT,
    "status" "AdStatus" NOT NULL DEFAULT 'RASCUNHO',
    "veiculado_em" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_metrics" (
    "id" TEXT NOT NULL,
    "ad_id" TEXT NOT NULL,
    "impressoes" INTEGER NOT NULL DEFAULT 0,
    "cliques" INTEGER NOT NULL DEFAULT 0,
    "conversoes" INTEGER NOT NULL DEFAULT 0,
    "investimento" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "receita" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ads_task_id_idx" ON "ads"("task_id");

-- CreateIndex
CREATE INDEX "ads_status_idx" ON "ads"("status");

-- CreateIndex
CREATE INDEX "ad_metrics_ad_id_idx" ON "ad_metrics"("ad_id");

-- CreateIndex
CREATE INDEX "ad_metrics_data_idx" ON "ad_metrics"("data");

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_metrics" ADD CONSTRAINT "ad_metrics_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
