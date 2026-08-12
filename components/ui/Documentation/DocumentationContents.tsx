import React from 'react';

export const Pengantar = () => (
  <div className="space-y-8">
    <div>
      <div className="mb-2 text-sm text-[#DE8AFF] font-medium">Memulai</div>
      <h1 className="text-4xl font-extrabold text-white mb-6">Pengantar</h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        Selamat datang di Dokumentasi Veil. Veil adalah alat berbasis AI yang dirancang untuk membantu Anda membagikan momen penting tanpa mengorbankan privasi.
      </p>
    </div>
    <section>
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-[#333] pb-2">Apa itu Veil?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Di era digital saat ini, kebocoran data pribadi (seperti NIK KTP, wajah orang lain, atau plat nomor) sering terjadi secara tidak sengaja melalui foto. Veil hadir untuk memberikan <strong>proteksi identitas visual secara instan</strong>.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Hanya dengan mengunggah foto, sistem cerdas Veil akan langsung mendeteksi area rawan dan mengaburkannya dalam hitungan detik. Cepat, aman, dan dapat diandalkan untuk kebutuhan sehari-hari.
      </p>
    </section>
  </div>
);

export const CaraPenggunaan = () => (
  <div className="space-y-8">
    <div>
      <div className="mb-2 text-sm text-[#DE8AFF] font-medium">Memulai</div>
      <h1 className="text-4xl font-extrabold text-white mb-6">Cara Penggunaan</h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        Menggunakan Veil sangatlah mudah. Cukup ikuti langkah berikut untuk mengamankan foto Anda.
      </p>
    </div>
    <div className="grid gap-4">
      <div className="bg-[#111] p-6 rounded-lg border border-[#333]">
        <h3 className="text-xl font-bold text-white mb-2">1. Unggah Foto</h3>
        <p className="text-gray-400">Klik tombol "Unggah & Sensor Foto" pada halaman utama untuk memilih foto dari perangkat Anda. Format yang didukung: JPG, PNG, WebP.</p>
      </div>
      <div className="bg-[#111] p-6 rounded-lg border border-[#333]">
        <h3 className="text-xl font-bold text-white mb-2">2. Proses Otomatis AI</h3>
        <p className="text-gray-400">Veil akan memindai foto Anda dan menyensor area sensitif secara otomatis (wajah, teks, dll) dalam hitungan detik.</p>
      </div>
      <div className="bg-[#111] p-6 rounded-lg border border-[#333]">
        <h3 className="text-xl font-bold text-white mb-2">3. Unduh Hasil</h3>
        <p className="text-gray-400">Setelah selesai, klik unduh untuk menyimpan foto yang sudah tersensor ke perangkat Anda dengan aman.</p>
      </div>
    </div>
  </div>
);

export const SensorWajah = () => (
  <div className="space-y-8">
    <div>
      <div className="mb-2 text-sm text-[#DE8AFF] font-medium">Fitur</div>
      <h1 className="text-4xl font-extrabold text-white mb-6">Sensor Wajah</h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        Lindungi privasi orang-orang di sekitar Anda dengan menyensor wajah mereka secara otomatis.
      </p>
    </div>
    <section>
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-[#333] pb-2">Bagaimana Cara Kerjanya?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        AI Veil dilatih untuk mendeteksi struktur wajah manusia dengan tingkat presisi tinggi. Saat Anda mengunggah foto grup atau foto di tempat umum, sistem akan memberikan efek <em>blur</em> pada wajah yang terdeteksi, memastikan identitas mereka tetap anonim.
      </p>
    </section>
  </div>
);

export const SensorDokumen = () => (
  <div className="space-y-8">
    <div>
      <div className="mb-2 text-sm text-[#DE8AFF] font-medium">Fitur</div>
      <h1 className="text-4xl font-extrabold text-white mb-6">Sensor Dokumen & Teks</h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        Cegah pencurian identitas dengan menyensor teks sensitif pada dokumen resmi.
      </p>
    </div>
    <section>
      <p className="text-gray-300 leading-relaxed mb-4">
        Jika Anda secara tidak sengaja memotret KTP, SIM, paspor, atau kartu kredit, fitur ini akan mencari pola angka dan teks sensitif seperti:
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-2">
        <li>Nomor Induk Kependudukan (NIK)</li>
        <li>Nomor Kartu Kredit / Debit</li>
        <li>Alamat Lengkap</li>
        <li>Nomor Telepon Pribadi</li>
      </ul>
    </section>
  </div>
);

export const SensorKendaraan = () => (
  <div className="space-y-8">
    <div>
      <div className="mb-2 text-sm text-[#DE8AFF] font-medium">Fitur</div>
      <h1 className="text-4xl font-extrabold text-white mb-6">Sensor Plat Nomor</h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        Jaga kerahasiaan kendaraan bermotor di dalam foto Anda.
      </p>
    </div>
    <section>
      <p className="text-gray-300 leading-relaxed mb-4">
        Fitur ini sangat berguna bagi Anda yang suka memotret di jalan raya atau membagikan foto dari <em>dashcam</em>. AI Veil mendeteksi letak plat nomor kendaraan dan mengaburkannya agar jejak digital kendaraan tidak bisa dilacak.
      </p>
    </section>
  </div>
);

export const PrivasiKeamanan = () => (
  <div className="space-y-8">
    <div>
      <div className="mb-2 text-sm text-[#DE8AFF] font-medium">Lainnya</div>
      <h1 className="text-4xl font-extrabold text-white mb-6">Privasi & Keamanan</h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        Komitmen penuh kami terhadap keamanan data Anda.
      </p>
    </div>
    <section className="bg-[#111] border border-[#BC13FE]/30 p-6 rounded-xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#DE8AFF] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
      <h3 className="text-[#DE8AFF] text-xl font-bold mb-4 relative z-10">Kebijakan Pemrosesan Data</h3>
      <ul className="space-y-4 text-gray-300 relative z-10">
        <li className="flex gap-3">
          <span className="text-[#BC13FE]">✓</span>
          <div><strong>Tidak Disimpan:</strong> Foto Anda langsung dihapus dari memori sesaat setelah diproses.</div>
        </li>
        <li className="flex gap-3">
          <span className="text-[#BC13FE]">✓</span>
          <div><strong>Enkripsi Aman:</strong> Proses transfer foto dari perangkat Anda ke sistem kami menggunakan jalur yang dienkripsi (HTTPS).</div>
        </li>
        <li className="flex gap-3">
          <span className="text-[#BC13FE]">✓</span>
          <div><strong>Tidak Ada Pelatihan AI:</strong> Kami tidak menggunakan foto-foto Anda untuk melatih atau memperbarui model kecerdasan buatan kami.</div>
        </li>
      </ul>
    </section>
  </div>
);

export const Faq = () => (
  <div className="space-y-8">
    <div>
      <div className="mb-2 text-sm text-[#DE8AFF] font-medium">Lainnya</div>
      <h1 className="text-4xl font-extrabold text-white mb-6">Tanya Jawab (FAQ)</h1>
    </div>
    <div className="space-y-4">
      <div className="bg-[#111] p-5 rounded-lg border border-[#333]">
        <h3 className="text-white font-bold mb-2">Kenapa ada wajah yang gagal disensor?</h3>
        <p className="text-gray-400 text-sm">Hal ini bisa terjadi jika wajah terhalang suatu benda, kualitas foto terlalu buram, pencahayaan sangat gelap, atau wajah menghadap terlalu menyamping dari lensa kamera.</p>
      </div>
      <div className="bg-[#111] p-5 rounded-lg border border-[#333]">
        <h3 className="text-white font-bold mb-2">Apakah saya bisa mensensor area tertentu secara manual?</h3>
        <p className="text-gray-400 text-sm">Saat ini Veil berfokus pada sistem pemindaian otomatis (AI). Namun, kami sedang mengembangkan fitur seleksi manual untuk pembaruan di masa depan.</p>
      </div>
      <div className="bg-[#111] p-5 rounded-lg border border-[#333]">
        <h3 className="text-white font-bold mb-2">Berapa ukuran foto maksimal?</h3>
        <p className="text-gray-400 text-sm">Untuk menjamin kecepatan pemrosesan, batas maksimal ukuran foto yang dapat diunggah saat ini adalah 10 MB.</p>
      </div>
    </div>
  </div>
);
