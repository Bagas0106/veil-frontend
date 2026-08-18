import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Cara Penggunaan | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Cara Penggunaan
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Frontend dan backend berada di folder berbeda. Keduanya harus dijalankan agar aplikasi dapat digunakan.
      </p>

      <div className="space-y-16 mt-16">
        <section id="langkah-instalasi">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-8 scroll-mt-28">
            Langkah Instalasi & Penggunaan
          </h2>
          
          <div className="relative border-l border-zinc-800 ml-4 md:ml-5 space-y-16 pb-8">
            
            {/* step 1 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                1
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Persyaratan Sistem</h3>
              <p className="text-lg text-zinc-400 mb-4 leading-relaxed">
                Sebelum menjalankan aplikasi, pastikan sistem Anda memiliki komponen berikut:
              </p>
              <div className="space-y-8">
                <div>
                  <p className="text-base text-zinc-400 mb-3 leading-relaxed">
                    <strong>Node.js (18+)</strong> dan <strong>Python (3.9+)</strong>. Pastikan kedua runtime ini sudah terinstal. Jika belum, silakan unduh di situs resmi <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline transition-colors">nodejs.org</a> dan <a href="https://www.python.org" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline transition-colors">python.org</a>.
                  </p>
                  <CodeBlock 
                    filename="Terminal"
                    code={`node -v\npython --version`}
                    language="bash"
                  />
                </div>
                
                <div>
                  <p className="text-base text-zinc-400 mb-3 leading-relaxed">
                    <strong>Zbar Library</strong>. Dibutuhkan oleh <code>pyzbar</code> untuk membaca QR Code. Pengguna Windows bisa melewati langkah ini jika Visual C++ Redistributable sudah terinstal.
                  </p>
                  <CodeBlock 
                    filename="Terminal (Linux & Mac)"
                    code={`# Ubuntu / Debian\nsudo apt-get install libzbar0\n\n# MacOS\nbrew install zbar`}
                    language="bash"
                  />
                </div>
              </div>
            </div>

            {/* step 2 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                2
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Siapkan Repositori</h3>
              <p className="text-lg text-zinc-400 mb-4 leading-relaxed">
                Fork kedua repositori ke akun GitHub Anda, lalu clone ke komputer lokal.
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-400 text-base">
                <li>Frontend: <a href="https://github.com/Bagas0106/veil-frontend" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline transition-colors break-all">github.com/Bagas0106/veil-frontend</a></li>
                <li>Backend: <a href="https://github.com/NabilHilmi21/veil-backend" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline transition-colors break-all">github.com/NabilHilmi21/veil-backend</a></li>
              </ul>
            </div>

            {/* step 3 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                3
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Jalankan Backend</h3>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Buka folder <code>veil-backend</code>. Install dependensi Python, lalu jalankan server.
              </p>
              <CodeBlock 
                filename="Terminal (Backend)"
                code={`cd veil-backend
pip install -r requirements.txt
py run.py`}
                language="bash"
              />
              <p className="text-base text-zinc-500 mt-5">
                Backend akan berjalan di <code className="text-zinc-400">http://localhost:8000</code>.
              </p>
            </div>

            {/* step 4 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                4
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Jalankan Frontend</h3>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Buka terminal baru dan masuk ke folder <code>veil-frontend</code>. Install dependensi Node.js, lalu jalankan server.
              </p>
              <CodeBlock 
                filename="Terminal (Frontend)"
                code={`cd veil-frontend
npm install
npm run dev`}
                language="bash"
              />
              <p className="text-base text-zinc-500 mt-5">
                Frontend akan berjalan di <code className="text-zinc-400">http://localhost:3000</code>. Buka alamat ini di browser untuk menggunakan aplikasi.
              </p>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
