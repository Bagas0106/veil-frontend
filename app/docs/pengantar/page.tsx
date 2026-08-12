import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pengantar | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Pengantar
      </h1>
      
      <div className="space-y-8 text-lg leading-8 text-zinc-400">
        <p>
          Veil adalah aplikasi web untuk mendeteksi dan menyensor data sensitif pada gambar. Aplikasi ini menggunakan model YOLO untuk mendeteksi wajah dan plat nomor kendaraan.
        </p>

        <p>
          Aplikasi ini terbagi menjadi dua bagian:
        </p>

        <div className="space-y-8 mt-12">
          <div>
            <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-3">
              Frontend (Next.js)
            </h2>
            <p>
              Dibuat dengan Next.js. Frontend menerima input gambar dan mengirimkannya ke backend. Setelah hasil deteksi diterima, frontend menempatkan sensor pada gambar tanpa mengubah file aslinya.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-3">
              Backend (FastAPI)
            </h2>
            <p>
              Dibuat dengan FastAPI di Python. Backend memuat model YOLO ke memori agar lebih cepat. Gambar diproses langsung dari memori tanpa disimpan ke disk. Setelah itu, koordinat deteksi dikirim kembali ke frontend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
