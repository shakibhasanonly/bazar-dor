import Image from "next/image";

export default function Hero() {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="bg-[#f4f8f3] py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-12">
            {/* Left */}
            <div>
              <div className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                {today}
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
                আজকের বাজারের দাম
                <br />
                এক নজরে
              </h1>

              <p className="mt-5 max-w-xl text-gray-600 leading-8">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।


              </p>

              <button className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition">
                সব পণ্য দেখুন
              </button>
            </div>

            {/* Right */}
            <div className="flex justify-center">
              <Image
                src="/bazar-hero.png"
                alt="Bazar Hero"
                width={380}
                height={380}
                priority
                className="h-auto w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}