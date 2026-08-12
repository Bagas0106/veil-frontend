import React from 'react';
import { DocsSidebar } from './docs-sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-zinc-100 selection:bg-purple-500/30">
      <div className="flex-1 mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10 pt-24 pb-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24 relative items-start mt-2">
          <DocsSidebar />
          <main className="flex-1 min-w-0 pb-32 max-w-full overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
