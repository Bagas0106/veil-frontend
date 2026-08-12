import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'Proses Deteksi | Dokumentasi Veil',
};

export default function Page() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Pipeline Deteksi
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Proses deteksi gambar melewati serangkaian tahapan <i>pipeline</i> yang sepenuhnya dieksekusi secara in-memory buffer. Pendekatan ini memotong latensi secara signifikan karena mengeliminasi operasi simpan-baca (I/O) pada disk.
      </p>

      <div className="space-y-16 mt-16">
        <section id="dekode">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Dekode Gambar
          </h2>
          <p className="text-lg text-zinc-400 mb-6">
            File tidak disimpan ke disk untuk menghemat waktu. Gambar langsung diproses dari memori menggunakan OpenCV. Jika gagal, sistem akan menggunakan Pillow.
          </p>
          <CodeBlock 
            filename="veil-backend/app/api/extract.py"
            code={`# baca gambar ke memori
contents = await file.read()
nparr = np.frombuffer(contents, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

# pakai pillow jika opencv gagal
if img is None:
    pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
    img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)`}
            language="python"
          />
        </section>

        <section id="deteksi">
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4 scroll-mt-28">
            Deteksi & Sinkronisasi
          </h2>
          <p className="text-lg text-zinc-400 mb-6">
            Sistem mencari QR Code dan Barcode menggunakan pyzbar. Setelah itu, model YOLO mendeteksi wajah dan plat nomor. Hasil deteksi diubah ke format base64 lalu dikirim ke frontend.
          </p>
          <CodeBlock 
            filename="veil-backend/app/services/pipeline.py"
            code={`# 1. cari qr dan barcode
for obj in decode(img):
    x, y, w, h = obj.rect
    val = obj.data.decode('utf-8')
    regions.append(RedactedRegion(type="qr", value=val, box=Box(...)))

# 2. cari area dengan yolo
regions.extend(self.detector.detect(img))

# 3. ubah format gambar untuk frontend
_, buffer = cv2.imencode('.jpg', img)
img_b64 = base64.b64encode(buffer).decode('utf-8')`}
            language="python"
          />
        </section>
      </div>
    </div>
  );
}
