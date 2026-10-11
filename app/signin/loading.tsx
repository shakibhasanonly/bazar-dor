export default function SignInLoading() {
  return (
    <main className="flex min-h-[calc(100vh-180px)] items-start justify-center bg-[#f0f5f0] px-4 pb-16 pt-12 sm:pt-14">
      <section className="w-full max-w-[400px] animate-pulse">
        <header className="mb-6 text-center">
          <div className="mx-auto h-8 w-28 rounded bg-gray-200" />
          <div className="mx-auto mt-3 h-4 w-64 max-w-full rounded bg-gray-200" />
        </header>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div>
              <div className="mb-2 h-4 w-16 rounded bg-gray-200" />
              <div className="h-11 w-full rounded-lg bg-gray-200" />
            </div>

            <div>
              <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
              <div className="h-11 w-full rounded-lg bg-gray-200" />
            </div>

            <div className="h-11 w-full rounded-lg bg-gray-300" />
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 rounded-lg bg-gray-200" />
            <div className="h-12 rounded-lg bg-gray-200" />
          </div>

          <div className="mx-auto mt-5 h-4 w-48 rounded bg-gray-200" />
        </div>

        <div className="mx-auto mt-6 h-4 w-40 rounded bg-gray-200" />
      </section>
    </main>
  );
}
