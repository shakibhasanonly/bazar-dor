import PriceTicker from './PriceTicker';
import CategoryNav from './CategoryNav';
import UserMenu from './UserMenu';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { auth } from '@/app/lib/auth';

export default async function Navbar() {
  const today = new Intl.DateTimeFormat('bn-BD', {
    dateStyle: 'full',
  }).format(new Date());

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Main Navbar */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4">
        {/* Logo and Date */}
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/logo.png"
            alt="বাজার দর"
            width={50}
            height={50}
            priority
            className="h-9 w-9 shrink-0 object-contain sm:h-[50px] sm:w-[50px]"
          />

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-lg font-bold text-green-700 sm:text-2xl">
              বাজার দর
            </h1>

            <p className="text-[9px] leading-relaxed text-gray-500 sm:text-xs">
              {today}
            </p>
          </div>
        </Link>

        {/* Login / Signup / User Menu */}
        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-3">
          {user ? (
            <UserMenu
              name={user.name?.trim() || 'ব্যবহারকারী'}
              email={user.email || ''}
              image={user.image}
            />
          ) : (
            <>
              <Link
                href="/signin"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-green-600 px-2 py-2 text-xs font-medium text-green-600 transition hover:bg-green-50 sm:px-4 sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-green-600 px-2 py-2 text-xs font-medium text-white transition hover:bg-green-700 sm:px-4 sm:text-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="w-full min-w-0">
        <CategoryNav />
      </div>

      {/* Price Ticker */}
      <div className="w-full min-w-0 overflow-hidden">
        <PriceTicker />
      </div>
    </header>
  );
}
