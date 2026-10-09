import Link from 'next/link';
import { getProducts } from '../lib/api';
import type { Product } from '../lib/api';

function formatPrice(value: number) {
  return Number(value).toLocaleString('bn-BD');
}

function formatUnit(unit: string) {
  const units: Record<string, string> = {
    kg: 'কেজি',
    gram: 'গ্রাম',
    liter: 'লিটার',
    piece: 'টি',
    dozen: 'ডজন',
  };

  return units[unit] || unit;
}

function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  const changeStyle = isUp
    ? 'bg-[#fff0ee] text-[#e34b42]'
    : isDown
      ? 'bg-[#eaf6ed] text-[#238747]'
      : 'bg-[#edf2ed] text-[#59645a]';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex min-h-[120px] items-center gap-4 rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#a9cdb0] hover:shadow-md"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
        {product.image || product.categoryIcon || '🛒'}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold leading-6 text-[#263329] transition group-hover:text-green-700 sm:text-base">
          {product.nameBn}
        </h3>

        <p className="text-xs leading-5 text-[#737b73]">
          প্রতি {formatUnit(product.unit)}
        </p>

        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] leading-5 text-[#687168]">আজকের দাম</p>

            <p className="text-sm font-extrabold leading-6 text-[#263329] sm:text-base">
              {formatPrice(product.today)} টাকা
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${changeStyle}`}
          >
            {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
            {formatPrice(Math.abs(product.change.pct))}%
          </span>
        </div>
      </div>
    </Link>
  );
}

function SectionHeading({ icon, title }: { icon?: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      {icon && (
        <span
          className={`text-xs font-extrabold ${
            icon === '▲' ? 'text-red-500' : 'text-green-600'
          }`}
        >
          {icon}
        </span>
      )}

      <h2 className="text-sm font-extrabold text-[#263329] sm:text-base">
        {title}
      </h2>
    </div>
  );
}

export default async function ProductSection() {
  try {
    const products = await getProducts();

    const increased = products
      .filter(product => product.change.dir === 'up')
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, 6);

    const decreased = products
      .filter(product => product.change.dir === 'down')
      .sort((a, b) => a.change.pct - b.change.pct)
      .slice(0, 6);

    return (
      <main
        id="products"
        className="min-h-screen bg-[#f4f8f3] px-4 pb-10 pt-5 sm:pt-6"
      >
        <div className="mx-auto w-full max-w-7xl">
          <section className="mb-6">
            <SectionHeading icon="▲" title="আজ দাম বেড়েছে" />

            {increased.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {increased.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] p-4 text-xs text-gray-500">
                আজ কোনো পণ্যের দাম বাড়েনি।
              </p>
            )}
          </section>

          <section className="mb-6">
            <SectionHeading icon="▼" title="আজ দাম কমেছে" />

            {decreased.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {decreased.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] p-4 text-xs text-gray-500">
                আজ কোনো পণ্যের দাম কমেনি।
              </p>
            )}
          </section>

          <section id="সব-পণ্য" className="scroll-mt-40">
            <SectionHeading title="সব পণ্য" />

            <p className="mb-3 text-[10px] text-[#737b73]">
              মোট {formatPrice(products.length)}টি পণ্যের বাজারদর
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] p-4 text-xs text-gray-500">
                এখনো কোনো পণ্যের তথ্য পাওয়া যায়নি।
              </p>
            )}
          </section>
        </div>
      </main>
    );
  } catch (error) {
    console.error('ProductSection error:', error);

    return (
      <main className="bg-[#f4f8f3] px-4 py-10">
        <div className="mx-auto w-full max-w-7xl rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] p-6 text-center shadow-sm">
          <h2 className="text-sm font-bold text-[#263329]">
            পণ্যের তথ্য লোড করা যায়নি
          </h2>

          <p className="mt-2 text-xs text-gray-600">
            পেজটি রিফ্রেশ করে আবার চেষ্টা করো।
          </p>
        </div>
      </main>
    );
  }
}
