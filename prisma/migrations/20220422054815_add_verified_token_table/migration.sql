-- CreateTable
CREATE TABLE "VerfiedToken" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "VerfiedToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "VerfiedToken_token_key" ON "VerfiedToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerfiedToken_user_id_key" ON "VerfiedToken"("user_id");
