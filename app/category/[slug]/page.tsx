import { getCategories, getProductsByCategory } from '@/app/lib/api';
import { notFound } from 'next/navigation';
import CategoryProducts from './CategoryProducts';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find(item => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f8f3] py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Category Header */}
        <section className="rounded-3xl border border-[#dfe8de] bg-white px-6 py-7 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f6f3] text-4xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-[34px] font-extrabold leading-none text-[#263329]">
                {category.nameBn}
              </h1>

              <p className="mt-2 text-[15px] text-[#6b7280]">
                {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}
