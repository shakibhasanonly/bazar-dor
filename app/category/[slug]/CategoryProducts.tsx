'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/app/lib/api';

type Props = {
  products: Product[];
};

function formatPrice(price: number) {
  return Number(price).toLocaleString('bn-BD');
}

export default function CategoryProducts({ products }: Props) {
  const [sort, setSort] = useState('default');

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sort) {
      case 'price-low':
        return list.sort((a, b) => a.today - b.today);

      case 'price-high':
        return list.sort((a, b) => b.today - a.today);

      default:
        return list;
    }
  }, [products, sort]);

  return (
    <section className="mt-7">
      {/* Top Bar */}

      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-[#dfe7df] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#263329]">সকল পণ্য</h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট {formatPrice(products.length)}টি পণ্য
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">সাজান</span>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>

            <option value="price-low">দাম: কম থেকে বেশি</option>

            <option value="price-high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedProducts.map(product => {
            const isUp = product.change.dir === 'up';
            const isDown = product.change.dir === 'down';

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group rounded-2xl border border-[#e2e8e2] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f4f8f3]">
                    <span className="text-5xl">
                      {product.image || product.categoryIcon}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-bold text-[#263329] group-hover:text-green-700">
                      {product.nameBn}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      প্রতি {product.unit}
                    </p>

                    <div className="mt-4">
                      <p className="text-xs text-gray-500">আজকের দাম</p>

                      <p className="mt-1 text-2xl font-extrabold text-[#263329]">
                        ৳{formatPrice(product.today)}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        গতকাল: ৳{formatPrice(product.yesterday)}
                      </p>
                    </div>

                    <div className="mt-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                          isUp
                            ? 'bg-red-50 text-red-600'
                            : isDown
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
                        {Math.abs(product.change.pct).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-[#e2e8e2] bg-white px-6 py-16 text-center shadow-sm">
          <div className="text-6xl">🛒</div>

          <h2 className="mt-5 text-2xl font-bold text-[#263329]">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </section>
  );
}
