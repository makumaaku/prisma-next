-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "imageUrl" TEXT NOT NULL,
    "link" TEXT,
    "order" INTEGER NOT NULL
);
INSERT INTO "new_Banner" ("imageUrl", "link", "order") SELECT "imageUrl", "link", "order" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
CREATE UNIQUE INDEX "Banner_imageUrl_key" ON "Banner"("imageUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
