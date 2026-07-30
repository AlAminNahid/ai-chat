-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN "messages" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "Message";
