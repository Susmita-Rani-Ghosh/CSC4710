ALTER TABLE "tasks" RENAME COLUMN "category_id" TO "category";--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_category_id_category_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
