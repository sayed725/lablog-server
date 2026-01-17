-- AddForeignKey
ALTER TABLE "usagelog" ADD CONSTRAINT "usagelog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
