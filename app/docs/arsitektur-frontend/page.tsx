import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Arsitektur Frontend | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Arsitektur Frontend
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Arsitektur <i>frontend</i> dibangun di atas Next.js App Router dan React. Meskipun menggunakan <i>Server-Side Rendering</i> SSR untuk inisialisasi halaman, seluruh operasi logika sensor gambar dieksekusi secara <i>Client-Side Rendering</i> CSR untuk mengurangi latensi interaksi.
      </p>

      <div className="space-y-16 mt-16">
        <section id="tech-stack">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">Teknologi Utama</h2>
          <ul className="list-disc list-inside space-y-3 text-zinc-400 text-lg leading-relaxed">
            <li><strong>Next.js dan React</strong>: <i>Routing</i> SSR dan manajemen <i>state</i> komponen CSR.</li>
            <li><strong>Tailwind CSS</strong>: Sistem utilitas gaya berbasis atomik.</li>
            <li><strong>Framer Motion dan Radix UI</strong>: Primitif UI nirgaya dan orkestrasi animasi.</li>
          </ul>
        </section>

        <section id="alur-klien">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">Desain Interaksi Klien</h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-4">
            Untuk menghemat <i>bandwidth</i> jaringan, <i>frontend</i> memuat <i>file</i> masukan secara lokal menggunakan <code>URL.createObjectURL</code>. Server <i>backend</i> hanya bertugas mengembalikan metadata spasial berbasis JSON.
          </p>
          <p className="text-lg text-zinc-400 leading-relaxed mb-6">
            Selanjutnya, elemen DOM ditempatkan secara absolut menggunakan konversi persentase resolusi asli terhadap <i>container viewport</i>. Pendekatan ini secara inheren memecahkan anomali <i>layout shift</i> pada berbagai dimensi perangkat.
          </p>
          <CodeBlock 
            filename="veil-frontend/components/ui/Upload page/upload.tsx"
            language="tsx"
            code={`// konversi absolut ke persentase ruang viewport
<div
  className="absolute border-2 border-red-500 bg-black"
  style={{
    left: \`\${(r.box.x / img.width) * 100}%\`,
    top: \`\${(r.box.y / img.height) * 100}%\`,
    width: \`\${(r.box.width / img.width) * 100}%\`,
    height: \`\${(r.box.height / img.height) * 100}%\`
  }}
/>`}
          />
        </section>
      </div>
    </div>
  );
}
