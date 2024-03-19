import Categories from "@/comps/Categories";
import { db } from "@/db";

export default async function page() {
  const categories = await db.query.category.findMany({});
  return (
    <div>
      <h1>Categories</h1>
      <Categories categories={categories} />
    </div>
  );
}
