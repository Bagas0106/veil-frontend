
    # 🛡️ Veil - Proteksi Privasi Foto Cerdas
    
    ## 📖 Deskripsi Singkat Website
    **Veil** adalah aplikasi berbasis web yang dirancang untuk melindungi privasi dan keamanan identitas seseorang di dalam sebuah foto. Sistem dapat memproses area sensitif (seperti wajah, plat nomor kendaraan, atau     kartu identitas), lalu memberikan pengguna kebebasan untuk menyensor area tersebut menggunakan berbagai pilihan mode: *Blur Halus*, *Mozaic*, *Blok Hitam/Putih*, hingga menyensor menggunakan *Gambar Kustom*.          Untuk menjamin 100% privasi pengguna, seluruh proses pengolahan, penyensoran, dan penyimpanan gambar dilakukan secara lokal di perangkat Anda (*client-side*). Gambar tidak akan pernah dikirimkan atau disimpan         diserver kami.
    
    ## 💻 Teknologi (Stack) yang Digunakan
    Website ini dibangun dengan menggunakan arsitektur modern dan teknologi berikut:
    - **Framework Utama:** [Next.js](https://nextjs.org/) (React)
    - **Bahasa Pemrograman:** TypeScript
    - **Styling:** Tailwind CSS
    - **Komponen Antarmuka (UI):** shadcn/ui & Radix UI
    - **Ikonografi:** Lucide React
    - **Pemrosesan Gambar:** Native HTML5 Canvas API (Tanpa bantuan library pihak ketiga yang rentan untuk merender filter secara *native*)
    ## 🚀 Cara / Panduan Menjalankan Website
    
    Berikut adalah panduan langkah demi langkah untuk menjalankan aplikasi **Veil** di mesin lokal (*localhost*) Anda:

    1. **Clone Repository**  
       Buka terminal/CMD Anda dan jalankan perintah berikut untuk mengkloning repositori ini:
       ```bash
       git clone <masukkan-link-repository-github-anda-disini>
       cd <masukkan-nama-folder-repo-disini>

    2. Install Dependencies
    Pastikan perangkat Anda sudah terinstal Node.js https://nodejs.org/. Kemudian, jalankan perintah di bawah ini untuk menginstal semua dependensi yang dibutuhkan:
      npm install
  
    3. Jalankan Server Development
    Setelah instalasi paket selesai, jalankan server mode lokal:
      npm run dev
  
    4. Buka Aplikasi
    Buka peramban (browser) favorit Anda dan kunjungi tautan berikut:
    http://localhost:3000
