import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f4f8f3] px-4 text-center">
      <div className="mb-5 text-7xl">🛒</div>

      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-green-700">
        Error 404
      </p>

      <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-5xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mb-7 max-w-md text-gray-600">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। হোম পেজে ফিরে
        প্রয়োজনীয় পণ্যের দাম দেখুন।
      </p>

      <Link
        href="/"
        className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
