/*
  Warnings:

  - The values [USER,ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,INACTIVE,CANCELLED] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CONVERSATION,DIAGNOSTIC,DOCUMENT_ANALYSIS] on the enum `ThreadType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'admin');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('active', 'inactive', 'cancelled');
ALTER TABLE "subscriptions" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "SubscriptionStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ThreadType_new" AS ENUM ('conversation', 'diagnostic', 'document_analysis');
ALTER TABLE "chats" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "chats" ALTER COLUMN "type" TYPE "ThreadType_new" USING ("type"::text::"ThreadType_new");
ALTER TYPE "ThreadType" RENAME TO "ThreadType_old";
ALTER TYPE "ThreadType_new" RENAME TO "ThreadType";
DROP TYPE "ThreadType_old";
ALTER TABLE "chats" ALTER COLUMN "type" SET DEFAULT 'conversation';
COMMIT;

-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "type" SET DEFAULT 'conversation';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
