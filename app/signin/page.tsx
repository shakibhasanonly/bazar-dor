'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { signIn } from '@/app/lib/auth-client';

function getReturnTo(): string {
  const callbackUrl = new URLSearchParams(window.location.search).get(
    'callbackUrl',
  );

  if (
    callbackUrl?.startsWith('/') &&
    !callbackUrl.startsWith('//') &&
    !callbackUrl.includes('\\')
  ) {
    return callbackUrl;
  }

  return '/';
}

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const returnTo = getReturnTo();

      const result = await signIn.email({
        email,
        password,
        callbackURL: returnTo,
      });

      if (result.error) {
        toast.error(result.error.message || 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।');
        return;
      }

      toast.success('সফলভাবে সাইন ইন হয়েছে!');

      window.setTimeout(() => {
        window.location.href = returnTo;
      }, 1000);
    } catch {
      toast.error('সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: 'google' | 'github') {
    setSocialLoading(true);

    try {
      const returnTo = getReturnTo();

      const result = await signIn.social({
        provider,
        callbackURL: returnTo,
      });

      if (result?.error) {
        toast.error(result.error.message || 'সোশ্যাল লগইন চালু করা যায়নি।');
        setSocialLoading(false);
      }
    } catch {
      toast.error('সোশ্যাল লগইন চালু করা যায়নি।');
      setSocialLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-180px)] items-start justify-center bg-[#f0f5f0] px-4 pb-16 pt-12 sm:pt-14">
      <section className="w-full max-w-[400px]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-950">সাইন ইন</h1>

          <p className="mx-auto mt-2 max-w-[340px] text-sm leading-6 text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </header>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || socialLoading}
              className="h-11 w-full rounded-lg bg-green-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'অপেক্ষা করুন...' : 'সাইন ইন'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignIn('google')}
              disabled={loading || socialLoading}
              className="flex min-w-0 w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:text-sm"
            >
              <svg
                viewBox="0 0 48 48"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.8 6.1-8.3 11.4-8.3Z"
                />
              </svg>

              <span className="min-w-0 text-center leading-4">
                Google দিয়ে চালিয়ে যান
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn('github')}
              disabled={loading || socialLoading}
              className="flex min-w-0 w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 fill-current"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.67 2.04 3.3 1.45.1-.71.39-1.2.71-1.48-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.62 5.23-5.11 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span className="min-w-0 text-center leading-4">
                GitHub দিয়ে চালিয়ে যান
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{' '}
            <Link
              href="/signup"
              className="font-medium text-green-700 underline underline-offset-2 hover:text-green-800"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </main>
  );
}
