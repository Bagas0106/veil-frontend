import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Catatan Penting | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Catatan Penting
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Dokumen ini membahas batasan arsitektur dan sistem Veil. 
        Pembahasan mencakup analisis masalah performa saat melakukan clustering.
      </p>

      <div className="space-y-16 mt-16">
        <section id="format">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Format Gambar
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            API menolak file PDF dan DOCX. 
            File berukuran nol byte juga ditolak. 
            Aplikasi hanya menerima format <code>image/</code> seperti PNG, JPG, WEBP, dan AVIF. 
            Pengecekan error ini mencegah pemakaian memori yang salah.
          </p>
        </section>

        <section id="memori">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Manajemen Memori
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Sistem menggunakan inisialisasi awal untuk mencegah delay. 
            Model YOLO diload penuh ke RAM saat server menyala. 
            Backend menahan memori ini secara terus-menerus walau server sedang tidak menerima request.
          </p>
        </section>
        
        <section id="bottleneck">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Desain Sinkron pada FastAPI
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Meskipun FastAPI menggunakan arsitektur async secara penuh, proses inferensi YOLO dan OpenCV berjalan secara sinkron.
            Keputusan ini diambil untuk memaksimalkan performa pada environment lokal.
            Karena request diproses satu per satu secara berurutan, sistem tidak akan mengalami <i>overhead</i> context switching.
          </p>
          <CodeBlock 
            filename="app/api/extract.py"
            code={`@router.post("/extract")
async def extract_data(request: Request, file: UploadFile = File(...)):
    # ... validasi file ...
    
    # Pemrosesan inferensi YOLO dijalankan secara sinkron.
    # Pendekatan ini memastikan alokasi CPU difokuskan penuh
    # pada satu gambar untuk menghasilkan latensi terendah.
    return pipeline.process_image(img)`}
            language="python"
          />
        </section>

        <section id="skalabilitas">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Skalabilitas Komputasi
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Pipeline menjalankan komputasi ONNX Runtime langsung pada CPU. 
            Performa YOLO11s sangat stabil untuk penggunaan tunggal secara lokal. 
            Untuk skala produksi yang membutuhkan konkurensi tinggi, arsitektur ini dirancang agar mudah dimigrasikan menggunakan <i>thread pool</i> atau layanan GPU terdedikasi di masa mendatang.
          </p>
        </section>
      </div>
    </div>
  );
}
