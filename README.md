 # Veil Frontend Web
    
## Deskripsi Singkat
Veil Frontend ini adalah aplikasi web yang nge-handle antarmuka (*User Interface*) buat ngelindungin privasi di foto. Sistem ini dibikin biar *user* bisa milih area sensitif yang udah dideteksi (kayak wajah, plat
  nomor, atau kartu identitas), terus menyensornya pakai opsi seperti *Blur*, Mozaic, Blok Hitam/Putih, sampai pakai Gambar Kustom. Biar privasi bener-bener aman, semua proses manipulasi dan sensor gambar dijalanin
  100% secara lokal langsung di peramban (*browser* / *client-side*), jadi nggak ada gambar yang dikirim atau disimpen di server.
    
## Teknologi (Stack) yang Digunakan
- Frontend ini dibangun pakai ekosistem React dan beberapa *library*, yaitu:
- **Next.js**: Framework utama berbasis React buat bikin aplikasi web-nya.
- **TypeScript**: Dipake biar nulis kodenya lebih aman, rapi, dan gampang *debug*-nya.
- **Tailwind CSS**: Framework CSS *utility-first* buat bikin tampilannya rapi dan responsif.
- **shadcn/ui & Radix UI**: Dipakai buat ngebangun komponen UI biar tampilannya modern dan interaktif.
- **Lucide React**: Kumpulan ikon yang dipakai di seluruh tampilan web.
- **Native Canvas API**: Dipakai buat nge-gambar ulang foto, nerapin filter sensor, dan ngunduh hasilnya tanpa butuh *library* tambahan yang berat.

    ## Cara Menjalankan Frontend (Lokal)
    Ikuti langkah-langkah ini kalau mau ngejalanin server frontend-nya di komputer lokal:

    1. **Pastikan Node.js udah terinstall** di komputer kamu.
    2. Buka terminal atau command prompt, terus masuk ke folder *repository* frontend-nya.
    3. **Install semua *library* / *dependencies*** yang dibutuhin:
       ```bash
       npm install

  4. Jalanin server frontend-nya (mode development):
    npm run dev

  5. Frontend bakal jalan di port 3000, bisa cek dan buka aplikasinya lewat browser:
      • Local URL: http://localhost:3000


  ## Informasi Akun Demo

  Tidak ada fitur login, sehingga tidak ada akun demo. Semua fitur bisa langsung dipakai dari halaman utama.
