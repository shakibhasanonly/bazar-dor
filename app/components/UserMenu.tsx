'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from '@/app/lib/auth-client';

type UserMenuProps = {
  name: string;
  email: string;
  image?: string | null;
};

export default function UserMenu({ name, email, image }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  async function handleSignOut() {
    setLoading(true);
    setError('');

    try {
      const result = await signOut();

      if (result?.error) {
        const message = 'সাইন আউট করা যায়নি। আবার চেষ্টা করুন।';

        setError(message);
        toast.error(message);
        setLoading(false);
        return;
      }

      setOpen(false);
      toast.success('সফলভাবে লগআউট হয়েছে!');

      router.replace('/signin');
      router.refresh();
    } catch {
      const message = 'সাইন আউট করতে সমস্যা হয়েছে।';

      setError(message);
      toast.error(message);
      setLoading(false);
    }
  }

  const firstLetter = email.trim().charAt(0).toUpperCase() || 'U';

  return (
    <div ref={menuRef} className="relative">
      {/* User Button */}
      <button
        type="button"
        onClick={() => {
          setOpen(previous => !previous);
          setError('');
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="ইউজার মেনু"
        className="flex max-w-[220px] items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-green-50 sm:max-w-xs"
      >
        {/* Profile Image or Email Initial */}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 text-sm font-bold text-green-700">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={36}
              height={36}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            firstLetter
          )}
        </span>

        <span className="max-w-[125px] truncate text-sm font-medium text-gray-800">
          {name}
        </span>

        <svg
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[100] mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl"
        >
          {/* User Information */}
          <div className="border-b border-gray-100 px-3 py-3">
            <p className="break-words text-sm font-semibold text-gray-800">
              {name}
            </p>

            <p className="mt-1 break-all text-xs text-gray-500">{email}</p>
          </div>

          {/* Profile Link */}
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
          >
            <span aria-hidden="true">👤</span>
            <span>আমার প্রোফাইল</span>
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={loading}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            <span aria-hidden="true">↩</span>

            <span>{loading ? 'সাইন আউট হচ্ছে...' : 'সাইন আউট'}</span>
          </button>

          {/* Error Message */}
          {error && (
            <p role="alert" className="px-3 py-2 text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
