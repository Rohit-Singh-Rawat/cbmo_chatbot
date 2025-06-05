/*
  Warnings:

  - You are about to drop the column `isUser` on the `messages` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('user', 'assistant', 'system', 'tool');

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "isUser",
ADD COLUMN     "role" "MessageRole" NOT NULL DEFAULT 'user',
ALTER COLUMN "parentMessageId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "chats_userId_updatedAt_idx" ON "chats"("userId", "updatedAt" DESC);
