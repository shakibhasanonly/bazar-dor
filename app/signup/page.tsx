'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn, signUp } from '@/app/lib/auth-client';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
      return;
    }

    if (password !== confirmPassword) {
      setError('দুটি পাসওয়ার্ড মিলছে না।');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL: '/',
      });

      if (result.error) {
        setError(result.error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি।');
      } else {
        setSuccess('অ্যাকাউন্ট তৈরি হয়েছে।');
      }
    } catch {
      setError('সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignUp(provider: 'google' | 'github') {
    setError('');
    setSocialLoading(provider);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: '/',
      });

      if (result?.error) {
        setError(result.error.message || 'সোশ্যাল লগইন চালু করা যায়নি।');
        setSocialLoading('');
      }
    } catch {
      setError('সোশ্যাল লগইন চালু করা যায়নি।');
      setSocialLoading('');
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-180px)] items-start justify-center bg-[#f0f5f0] px-4 pb-16 pt-12 sm:pt-14">
      <section className="w-full max-w-[400px]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-950">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mx-auto mt-2 max-w-[340px] text-sm leading-6 text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="আপনার পুরো নাম"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p
                role="status"
                className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
              >
                {success}
              </p>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="h-11 w-full rounded-lg bg-green-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'অপেক্ষা করুন...' : 'অ্যাকাউন্ট তৈরি করুন'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google and GitHub Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialSignUp('google')}
              disabled={loading || !!socialLoading}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 48 48"
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 38.02 46.98 31.9 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  transform="translate(0 -4)"
                />
              </svg>

              {socialLoading === 'google'
                ? 'Google-এ সংযোগ হচ্ছে...'
                : 'Google দিয়ে চালিয়ে যান'}
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSocialSignUp('github')}
              disabled={loading || !!socialLoading}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.77 2.01 3.39 1.53.1-.73.39-1.23.7-1.52-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              {socialLoading === 'github'
                ? 'GitHub-এ সংযোগ হচ্ছে...'
                : 'GitHub দিয়ে চালিয়ে যান'}
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{' '}
            <Link
              href="/signin"
              className="font-medium text-green-700 underline underline-offset-2 hover:text-green-800"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
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
