-- AlterTable
ALTER TABLE "Opinion" ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "provinceId" TEXT;

-- CreateIndex
CREATE INDEX "Opinion_provinceId_createdAt_idx" ON "Opinion"("provinceId", "createdAt");

-- CreateIndex
CREATE INDEX "Opinion_authorId_idx" ON "Opinion"("authorId");

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
