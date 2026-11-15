-- AlterTable
ALTER TABLE "Publication"
ADD COLUMN "doctrineNumber" INTEGER,
ADD COLUMN "doctrineVersion" TEXT;

-- CreateIndex
CREATE INDEX "Publication_doctrineNumber_doctrineVersion_idx"
ON "Publication"("doctrineNumber", "doctrineVersion");
