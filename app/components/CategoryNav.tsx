import Link from "next/link";
import { getCategories } from "../lib/api";

export default async function CategoryNav() {
  const categories = await getCategories();

  return (
    <nav className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-green-600 hover:bg-green-600 hover:text-white"
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}