import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pelatihan AI | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Model AI & Integrasi
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Sistem ini menggunakan arsitektur YOLO berukuran kecil untuk mempercepat inferensi tanpa membebani resource.
      </p>

      <div className="space-y-16 mt-16">
        {/* bagian 1 cara ai dilatih */}
        <section id="bagaimana-ai-dilatih">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Bagaimana AI Dilatih
          </h2>
          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Kode training untuk deteksi wajah, identitas, dan plat nomor ada di file <code>template_pelatihan_veil.ipynb</code>. Varian YOLO lain bisa dipakai sesuai kebutuhan proyek. Lihat <a href="https://docs.ultralytics.com/models/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline transition-colors">dokumentasi model Ultralytics</a>.
          </p>

          <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
            Proses training menggunakan teknik <strong>Augmentasi</strong> gambar. Ini membuat model tahan terhadap variasi input seperti rotasi dan objek yang terhalang.
          </p>

          <div className="mb-6">
            <a 
              href="/downloads/template_pelatihan_veil.ipynb" 
              download 
              className="inline-flex items-center gap-2 text-purple-400 hover:underline transition-colors"
            >
              <Download size={16} />
              Unduh Template Notebook
            </a>
          </div>

          <CodeBlock 
            filename="template_pelatihan_veil.ipynb"
            code={`from ultralytics import YOLO

# Memuat arsitektur dasar YOLO11 varian Small
model = YOLO('yolo11s.pt') 

# Menjalankan proses pelatihan dengan konfigurasi augmentasi tingkat lanjut
model.train(
    data="Dataset-Privasi/data.yaml",       
    epochs=50,
    imgsz=640,
    batch=8,
    mosaic=1.0,               # Penggabungan matriks citra
    perspective=0.001,        # Distorsi sudut perspektif
    degrees=10.0,             # Rotasi citra acak
    erasing=0.2,              # Penghapusan blok piksel parsial
)`}
            language="python"
          />
        </section>

        {/* bagian 2 cara nambah model baru */}
        <section id="panduan-ekspor">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-8 scroll-mt-28">
            Melatih & Menambahkan Model Baru
          </h2>
          <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
            Anda bisa menambah kemampuan deteksi dengan mengikuti panduan integrasi model di bawah.
          </p>
          
          <div className="relative border-l border-zinc-800 ml-4 md:ml-5 space-y-16 pb-8">
            
            {/* step 1 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                1
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Training dan Ekspor</h3>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Jalankan script di <code>template_pelatihan_veil.ipynb</code>. Script ini akan melakukan training pada dataset dan langsung mengekspor hasilnya menjadi file model berformat <code>.onnx</code>.
              </p>
              
              <div className="mt-6 mb-2 p-4 rounded-md bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400/90 text-sm font-medium leading-relaxed">
                  <strong>Hardware Requirement:</strong> Training model YOLO butuh resource tinggi. Jika menggunakan komputer lokal, pastikan ada GPU diskrit dengan VRAM yang cukup. Anda juga bisa memakai layanan cloud computing seperti Google Colab atau Kaggle.
                </p>
              </div>
            </div>

            {/* step 2 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                2
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Evaluasi Model Lokal</h3>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Proses training akan menghasilkan model berformat <code>.onnx</code>. Evaluasi model ini pada dataset testing lokal. Tahap ini mengukur tingkat presisi sebelum model dipakai di production.
              </p>
              <CodeBlock 
                filename="Terminal/Jupyter (Python CLI)"
                code={`# menguji model pada citra contoh
model_onnx = YOLO('runs/detect/train/weights/best.onnx')
results = model_onnx('gambar_tes.jpg')
results[0].show() # menampilkan hasil deteksi`}
                language="python"
              />
            </div>

            {/* step 3 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                3
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Integrasi Backend</h3>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Pindahkan file <code>.onnx</code> ke folder <code>veil-backend/weights/</code>. Daftarkan path dan threshold di <code>app/core/config.py</code>, lalu muat model di <code>app/services/detector.py</code>.
              </p>
              <CodeBlock 
                filename="veil-backend/app/core/config.py"
                code={`class Settings(BaseSettings):
    # ... konfigurasi yang sudah ada ...
    KTP_MODEL_PATH: str = os.path.join(WEIGHTS_DIR, "ktp_sensor.onnx")
    KTP_CONF_THRESHOLD: float = 0.5`}
                language="python"
              />
              <div className="mt-4">
                <CodeBlock 
                  filename="veil-backend/app/services/detector.py"
                code={`def load_models(self):
    # daftarkan model yang sudah disetting di config.py
    if os.path.exists(settings.KTP_MODEL_PATH):
        self.models["ktp"] = YOLO(settings.KTP_MODEL_PATH, task="detect")

def detect(self, img: np.ndarray) -> List[RedactedRegion]:
    yolo_tasks = [
        # ...
        ("ktp", "kartu_identitas", settings.KTP_CONF_THRESHOLD)
    ]`}
                language="python"
              />
              </div>
            </div>

            {/* step 4 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-medium text-zinc-300 ring-8 ring-black">
                4
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-4">Pembaruan Frontend</h3>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Frontend akan otomatis merender kategori baru jika gambar berhasil dideteksi. Namun, tambahkan kategori tersebut ke <code>baseCategories</code> agar muncul saat tampilan standar.
              </p>
              <CodeBlock 
                filename="components/ui/Upload page/setting.tsx"
                code={`// tambahin tipe kategori baru ke array default
const baseCategories = ["wajah", "plat_nomor", "kartu_identitas"];

// sistem bakal render otomatis dari array json backend
const detectedCategories = Array.from(new Set(regions.map(r => r.type)));`}
                language="typescript"
              />
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
