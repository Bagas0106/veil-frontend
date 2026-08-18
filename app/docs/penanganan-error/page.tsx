import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Penanganan Error | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Penanganan Error
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Backend memiliki sistem handling error terstruktur. 
        Saat error komputasi terjadi, server tetap menjaga koneksi jaringan. 
        Server membalas dengan format JSON dan kode status HTTP yang sesuai.
      </p>

      <div className="space-y-16 mt-16">
        <section id="http-400">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Validasi Input (400)
          </h2>
          <p className="text-lg text-zinc-400 mb-6">
            Error 400 Bad Request terjadi karena input data tidak valid. 
            Hal ini disebabkan oleh tiga hal:
          </p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-zinc-400 text-lg mb-6">
            <li><strong>File Kosong:</strong> File gambar memiliki ukuran nol byte.</li>
            <li><strong>Format Dilarang:</strong> Format file bukan gambar.</li>
            <li><strong>Gambar Rusak:</strong> Sistem gagal membaca data gambar.</li>
          </ul>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Validasi di frontend sangat disarankan untuk mencegah pengiriman request yang salah. 
            Cara ini sangat berguna untuk menghemat transfer jaringan. 
            Pengecekan tipe dan ukuran file harus dilakukan sebelum upload dimulai.
          </p>
          <CodeBlock 
            filename="components/ui/Upload page/upload.tsx"
            code={`// validasi tipe sama ukuran file sblm panggil api
const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert("Format tidak valid! Harap unggah gambar.");
    return;
  }
  if (file.size === 0) {
    alert("File gambar Anda kosong!");
    return;
  }
  // lanjut upload
  const imageUrl = URL.createObjectURL(file);
  setPreview(imageUrl);
  processImageApi(file);
}`}
            language="typescript"
          />
        </section>

        <section id="http-422">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Skema Tidak Valid (422)
          </h2>
          <p className="text-lg text-zinc-400 mb-6">
            Error HTTP 422 diproduksi oleh komponen Pydantic di FastAPI. 
            Error ini terjadi ketika server gagal memproses input <code>file</code> dari paket <i>multipart/form-data</i>. 
            Masalah juga muncul jika skema data yang dikirim tidak sesuai dengan API.
          </p>
        </section>

        <section id="http-500">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Internal Server Error (500)
          </h2>
          <p className="text-lg text-zinc-400 mb-6">
            Error 500 menandakan backend gagal memproses request. 
            Penyebab utamanya adalah beban RAM yang terlalu tinggi di server. 
            Beban berlebih ini terjadi saat sistem membaca banyak gambar beresolusi tinggi secara bersamaan. 
            Sistem otomatis melakukan handling error agar server tetap berjalan lancar.
          </p>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Proses resize gambar sangat direkomendasikan pada tahap awal di backend. 
            Langkah ini berjalan sebelum gambar diserahkan ke memori OpenCV. 
            Membatasi resolusi sangat penting untuk menghemat RAM.
          </p>
          <CodeBlock 
            filename="veil-backend/app/api/extract.py"
            code={`# kompres resolusi gambar sebelum masuk yolo
MAX_DIMENSION = 1920

if img.shape[0] > MAX_DIMENSION or img.shape[1] > MAX_DIMENSION:
    # paksa downscale gambar resolusi gede
    scale = MAX_DIMENSION / max(img.shape[0], img.shape[1])
    new_size = (int(img.shape[1] * scale), int(img.shape[0] * scale))
    img = cv2.resize(img, new_size, interpolation=cv2.INTER_AREA)`}
            language="python"
          />
        </section>

        <section id="http-503">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Inisialisasi Mesin (503)
          </h2>
          <p className="text-lg text-zinc-400 mb-6">
            Status 503 dikirim saat server sedang melakukan inisialisasi awal. 
            Koneksi ditolak karena model YOLO sedang dimuat ke memori RAM. 
            Server membalas error ini secara asinkron tanpa memutuskan request yang lain. 
            Klien dirancang untuk mencoba request ulang setelah beberapa saat.
          </p>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Sistem polling otomatis sangat direkomendasikan di frontend. 
            Cara ini memonitor status server tanpa membuat UI menjadi macet. 
            Fitur polling mencegah pengguna untuk menekan tombol secara manual berkali-kali.
          </p>
          <CodeBlock 
            filename="components/ui/Upload page/upload.tsx"
            code={`// auto polling klo api ngerespon 503
const processImageApi = async (file: File, retries = 3) => {
  setIsProcessing(true);
  setRegions([]);
  
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    for (let i = 0; i < retries; i++) {
      const res = await fetch("http://localhost:8000/api/extract", {
          method: "POST",
          body: formData
      });
      
      if (res.status === 503) {
        console.warn(\`Server belum siap. Menunggu \${i + 1} detik...\`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      
      if (!res.ok) throw new Error("API Error");
      
      const data = await res.json();
      // lanjut map json data
      return;
    }
  } catch (error) {
    console.error("Error processing image", error);
  } finally {
    setIsProcessing(false);
  }
}`}
            language="typescript"
          />
        </section>
      </div>
    </div>
  );
}
