import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        FAQ (Frequently Asked Questions)
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Berikut adalah jawaban untuk beberapa pertanyaan teknis yang paling sering ditanyakan mengenai penggunaan Veil.
      </p>

      <div className="space-y-16 mt-16">
        <section id="pertanyaan-1">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Berapa lama proses penyensoran sebuah foto?
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Secara umum, proses pemindaian dan penyensoran oleh model YOLO memakan waktu sekitar 1-2 detik bergantung pada ukuran gambar dan resolusinya.
          </p>
        </section>
        
        <section id="pertanyaan-2">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Mengapa API menolak gambar saya dengan pesan Error 422?
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Error 422 menandakan Unprocessable Entity. Pastikan gambar yang Anda unggah memiliki ukuran di bawah batas maksimum (biasanya 10 MB) dan format yang digunakan adalah format gambar yang valid secara tipe MIME seperti image/jpeg, image/png, atau image/webp.
          </p>
        </section>
      </div>
    </div>
  );
}
