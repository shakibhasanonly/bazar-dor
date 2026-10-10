import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/app/lib/auth';
import { getProduct } from '../../lib/api';

function formatPrice(price: number) {
  return new Intl.NumberFormat('bn-BD').format(price);
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

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // লগইন করা আছে কি না যাচাই
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // লগইন না থাকলে Sign In পেজে পাঠানো হবে
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);
  }

  let product;

  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const changeDirection = product.change.dir;
  const changeColor =
    changeDirection === 'up'
      ? 'text-red-600 bg-red-50'
      : changeDirection === 'down'
        ? 'text-green-700 bg-green-50'
        : 'text-gray-600 bg-gray-100';

  const averagePrice =
    product.markets.length > 0
      ? product.markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / product.markets.length
      : product.today;

  const lowestPrice =
    product.markets.length > 0
      ? Math.min(...product.markets.map(market => market.min))
      : product.today;

  const highestPrice =
    product.markets.length > 0
      ? Math.max(...product.markets.map(market => market.max))
      : product.today;

  return (
    <main className="min-h-screen bg-[#f4f8f3] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900"
        >
          <span aria-hidden="true">←</span>
          বাজারদরে ফিরে যান
        </Link>

        <div className="overflow-hidden rounded-3xl border border-[#e1e9e2] bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="flex min-h-64 items-center justify-center bg-[#edf5ed] p-8 sm:min-h-80">
              <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-white text-7xl shadow-sm sm:h-44 sm:w-44 sm:text-8xl">
                {product.image || product.categoryIcon || '🛒'}
              </div>
            </div>

            <div className="p-6 sm:p-9">
              <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </span>

              <h1 className="mt-4 text-2xl font-extrabold text-[#263329] sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {formatUnit(product.unit)}
              </p>

              <div className="mt-6 rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-5">
                <p className="text-sm text-gray-500">আজকের বাজারদর</p>

                <p className="mt-2 text-3xl font-extrabold text-green-700">
                  {formatPrice(product.today)} টাকা
                </p>

                <span
                  className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-sm font-bold ${changeColor}`}
                >
                  {changeDirection === 'up'
                    ? '▲ দাম বেড়েছে'
                    : changeDirection === 'down'
                      ? '▼ দাম কমেছে'
                      : '— দাম অপরিবর্তিত'}{' '}
                  {formatPrice(Math.abs(product.change.pct))}%
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e1e9e2] p-6 sm:p-9">
            <h2 className="text-xl font-extrabold text-[#263329]">
              বাজারদরের সারসংক্ষেপ
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-green-50 p-5">
                <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
                <p className="mt-2 text-xl font-extrabold text-green-700">
                  {formatPrice(lowestPrice)} টাকা
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-sm text-gray-600">গড় দাম</p>
                <p className="mt-2 text-xl font-extrabold text-blue-700">
                  {formatPrice(Math.round(averagePrice))} টাকা
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-5">
                <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
                <p className="mt-2 text-xl font-extrabold text-red-700">
                  {formatPrice(highestPrice)} টাকা
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e1e9e2] p-6 sm:p-9">
            <h2 className="text-xl font-extrabold text-[#263329]">
              বাজারভিত্তিক দাম
            </h2>

            {product.markets.length > 0 ? (
              <div className="mt-5 overflow-x-auto rounded-xl border border-[#e1e9e2]">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-[#f4f8f3] text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">বাজার</th>
                      <th className="px-4 py-3 font-semibold">বিভাগ</th>
                      <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                      <th className="px-4 py-3 font-semibold">সর্বোচ্চ</th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-[#e1e9e2]"
                      >
                        <td className="px-4 py-4 font-medium text-gray-800">
                          {market.market}
                        </td>
                        <td className="px-4 py-4 text-gray-600">
                          {market.division}
                        </td>
                        <td className="px-4 py-4 font-semibold text-green-700">
                          {formatPrice(market.min)} টাকা
                        </td>
                        <td className="px-4 py-4 font-semibold text-red-600">
                          {formatPrice(market.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যায়নি।
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/#সব-পণ্য"
            className="inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            ← সব পণ্য দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}
