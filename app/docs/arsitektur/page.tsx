import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Arsitektur Backend | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Arsitektur Backend
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Backend dibangun menggunakan FastAPI dan ONNX Runtime. Sistem dirancang memuat semua model <i>machine learning</i> ke dalam RAM sejak inisialisasi awal untuk menghindari <i>delay I/O</i> pada setiap proses inferensi.
      </p>

      <div className="space-y-16 mt-16">
        <section id="tech-stack-backend">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">Teknologi Utama</h2>
          <ul className="list-disc list-inside space-y-3 text-zinc-400 text-lg leading-relaxed">
            <li><strong>FastAPI dan Uvicorn</strong>: Kerangka kerja web <i>async</i> untuk menangani permintaan HTTP secara efisien.</li>
            <li><strong>ONNX Runtime dan Ultralytics</strong>: Mesin inferensi yang mengeksekusi model YOLO pada CPU.</li>
            <li><strong>OpenCV (cv2)</strong>: Melakukan dekode dan manipulasi matriks citra di dalam memori tanpa disk.</li>
            <li><strong>Pyzbar</strong>: Pustaka spesifik untuk mengidentifikasi kode batang dan QR Code.</li>
          </ul>
        </section>

        <section id="sistem-desain">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">Desain Sistem Eksekusi</h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-4">
            Veil Backend berjalan dalam arsitektur skala lokal dengan prioritas eksekusi sinkron.
          </p>
          <p className="text-lg text-zinc-400 leading-relaxed mb-6">
            Sistem memanfaatkan <i>context manager</i> <code>lifespan</code> milik FastAPI untuk mengalokasikan seluruh model AI berformat <code>.onnx</code> ke dalam memori RAM pada fase awal. Permintaan yang masuk dieksekusi secara <i>synchronous-blocking</i>, yang mengunci <i>event loop</i> agar utas CPU didedikasikan tanpa gangguan <i>context switching</i>.
          </p>
          <CodeBlock 
            filename="veil-backend/app/main.py"
            code={`@asynccontextmanager
async def lifespan(app: FastAPI):
    global pipeline
    
    # memuat mesin inferensi onnx ke ram sebelum server menerima request
    detector_service.load_models()
    pipeline = ExtractionPipeline(detector_service)
    
    yield
    
    # melepas referensi memori saat server dimatikan
    detector_service.unload_models()`}
            language="python"
          />
        </section>
      </div>
    </div>
  );
}
