-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_nik_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_nik_fkey" FOREIGN KEY ("nik") REFERENCES "participants"("nik") ON DELETE SET NULL ON UPDATE CASCADE;
