-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('NOVO', 'EDICAO_VSL');

-- CreateTable
CREATE TABLE "task_definitions" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "modelo_anuncio" TEXT NOT NULL,
    "tipo_edicao" "AdType" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utm_configs" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "campaign_name" TEXT NOT NULL,
    "funcao" TEXT,
    "copy" TEXT,
    "lead" TEXT,
    "editor" TEXT,
    "hook" TEXT,
    "persona" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utm_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_definitions_task_id_key" ON "task_definitions"("task_id");

-- CreateIndex
CREATE INDEX "utm_configs_task_id_idx" ON "utm_configs"("task_id");

-- AddForeignKey
ALTER TABLE "task_definitions" ADD CONSTRAINT "task_definitions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utm_configs" ADD CONSTRAINT "utm_configs_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
