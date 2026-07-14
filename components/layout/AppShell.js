'use client';

export default function AppShell({ children }) {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-rose-pink focus:px-4 focus:py-2 focus:text-night-sky"
      >
        Skip to content
      </a>
      <div className="relative min-h-screen-safe overflow-x-hidden">
        {children}
      </div>
    </>
  );
}
