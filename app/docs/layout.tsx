import React from 'react';
import { DocsSidebar } from './docs-sidebar';
import { TocSidebar } from './toc-sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dokumentasi',
  description: 'Dokumentasi resmi untuk aplikasi Veil.',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-zinc-100 selection:bg-purple-500/30">
      <div className="flex-1 mx-auto w-full px-4 sm:px-6 md:px-10 pt-24 pb-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 relative items-start mt-2">
          <DocsSidebar />
          <main className="flex-1 min-w-0 pb-50 max-w-full lg:max-w-[800px] xl:max-w-[860px] mx-auto overflow-hidden order-3 lg:order-2 mt-4 lg:mt-0">
            {children}
          </main>
          <div className="order-2 lg:order-3 w-full lg:w-auto flex justify-end lg:block lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)]">
            <TocSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
