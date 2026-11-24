BEGIN;

CREATE UNIQUE INDEX "Publication_doctrineNumber_doctrineVersion_key"
ON "Publication"("doctrineNumber", "doctrineVersion");

DROP INDEX "Publication_doctrineNumber_doctrineVersion_idx";

COMMIT;
