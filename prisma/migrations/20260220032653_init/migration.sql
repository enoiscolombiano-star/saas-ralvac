-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('CRIADA', 'EM_PRODUCAO', 'PRONTA_PARA_TESTES');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "prefixo" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'CRIADA',
    "criado_por" TEXT,
    "com_quem" TEXT,
    "prazo" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_criado_em_idx" ON "tasks"("criado_em");
