import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/app/lib/auth';
import ProfileActions from './ProfileActions';

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin?callbackUrl=%2Fprofile');
  }

  const userName = session.user.name || 'ব্যবহারকারী';

  return (
    <main className="min-h-[70vh] bg-[#f0f5f0] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800">আমার প্রোফাইল</h1>

        <p className="mt-2 text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-100 text-4xl">
                👤
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold text-gray-800">
                  {userName}
                </h2>

                <p className="mt-1 break-all text-gray-500">
                  {session.user.email}
                </p>
              </div>
            </div>

            <ProfileActions currentName={session.user.name || ''} />
          </div>
        </section>

        <Link
          href="/"
          className="mt-6 inline-block text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
