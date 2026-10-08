"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const today = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="বাজার দর"
            width={50}
            height={50}
            priority
          />

          <div>
            <h1 className="text-2xl font-bold text-green-700">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-500">
              {today}
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
    </header>
  );
}