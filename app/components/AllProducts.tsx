'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Product } from '../lib/api';

type SortOption = 'default' | 'low-to-high' | 'high-to-low';

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

export default function AllProducts({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === 'low-to-high') {
      result.sort((a, b) => a.today - b.today);
    } else if (sortBy === 'high-to-low') {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortBy]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#737b73]">
          মোট {formatPrice(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <label className="flex items-center gap-2 text-xs font-medium text-[#263329]">
          <span>সাজান</span>

          <select
            value={sortBy}
            onChange={event => setSortBy(event.target.value as SortOption)}
            className="rounded-lg border border-[#e1e9e2] bg-[#fbfdfb] px-3 py-2 text-xs text-[#263329] outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map(product => {
            const isUp = product.change.dir === 'up';
            const isDown = product.change.dir === 'down';

            const changeStyle = isUp
              ? 'bg-[#fff0ee] text-[#e34b42]'
              : isDown
                ? 'bg-[#eaf6ed] text-[#238747]'
                : 'bg-[#edf2ed] text-[#59645a]';

            return (
              <Link
                key={product.id}
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
                      <p className="text-[10px] leading-5 text-[#687168]">
                        আজকের দাম
                      </p>

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
          })}
        </div>
      ) : (
        <p className="rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] p-4 text-xs text-gray-500">
          এখনো কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
}
