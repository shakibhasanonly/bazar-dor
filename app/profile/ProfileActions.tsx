'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient, signOut } from '@/app/lib/auth-client';

type ProfileActionsProps = {
  currentName: string;
};

export default function ProfileActions({ currentName }: ProfileActionsProps) {
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState('');

  const router = useRouter();

  async function handleUpdateName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newName = name.trim();

    if (!newName) {
      setMessage('নাম লিখুন।');
      return;
    }

    if (newName === currentName.trim()) {
      setMessage('নামে কোনো পরিবর্তন করা হয়নি।');
      return;
    }

    setLoading(true);
    setMessage('');
    setToast('');

    try {
      const result = await authClient.updateUser({
        name: newName,
      });

      if (result.error) {
        setMessage(result.error.message || 'নাম আপডেট করা যায়নি।');
        return;
      }

      setMessage('');
      setToast('নাম সফলভাবে হালনাগাদ হয়েছে!');
      router.refresh();

      window.setTimeout(() => setToast(''), 3000);
    } catch {
      setMessage('নাম আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    setMessage('');

    try {
      const result = await signOut();

      if (result.error) {
        setMessage('সাইন আউট করা যায়নি। আবার চেষ্টা করুন।');
        return;
      }

      router.replace('/signin');
      router.refresh();
    } catch {
      setMessage('সাইন আউট করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Success Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[100] flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-xl border border-green-200 bg-white px-5 py-4 text-green-700 shadow-xl"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold">
            ✓
          </span>
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      <div className="w-full">
        {/* Update Name Card */}
        <section className="rounded-2xl border border-[#dfe9df] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="text-lg font-bold text-[#202b23]">
            নাম হালনাগাদ করুন
          </h2>

          <form onSubmit={handleUpdateName} className="mt-4 space-y-3">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                name="profile-display-name"
                value={name}
                onChange={event => setName(event.target.value)}
                maxLength={100}
                required
                autoComplete="off"
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {message && (
              <p role="alert" className="text-sm text-red-600">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'সেভ হচ্ছে...' : 'নাম হালনাগাদ করুন'}
            </button>
          </form>
        </section>

        {/* Sign Out */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="rounded-lg border border-red-400 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            {loading ? 'অপেক্ষা করুন...' : '↩ সাইন আউট'}
          </button>
        </div>
      </div>
    </>
  );
}
