import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privasi & Keamanan | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Privasi & Keamanan
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Halaman ini merangkum beberapa hal mendasar terkait privasi, keamanan, dan bagaimana AI kami memproses foto Anda.
      </p>

      <div className="space-y-16 mt-16">
        <section id="privasi">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Apakah gambar asli saya disimpan di server?
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Sama sekali tidak. Proses analisis dan pemburaman dilakukan secara <i>on-the-fly</i>. Setelah gambar hasil diproses dan dikembalikan ke antarmuka klien, file asli akan dihapus dari memori server secara otomatis.
          </p>
        </section>
        
        <section id="akurasi">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Bagaimana akurasi dari sensor AI ini?
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Sistem kami menggunakan arsitektur YOLO terbaru yang telah dilatih pada ratusan ribu data. Meskipun sangat akurat dalam kondisi standar, ada kalanya model ini gagal mendeteksi wajah atau plat nomor jika pencahayaannya terlalu gelap, blur secara ekstrem, atau tertutup oleh objek lain.
          </p>
        </section>
      </div>
    </div>
  );
}
