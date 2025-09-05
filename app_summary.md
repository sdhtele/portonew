### Konsep & Alur Aplikasi 🚀

Secara sederhana, aplikasi Anda akan memiliki dua sisi: sisi publik yang dilihat oleh pengunjung dan sisi admin yang hanya bisa Anda akses setelah login.



1.  **Alur Pengunjung (Publik):**
    * Pengunjung membuka website Anda (`www.domainanda.com`).
    * Mereka akan disambut dengan **Halaman Utama (Homepage)** yang menampilkan ringkasan profil Anda, proyek-proyek unggulan, dan *call-to-action* untuk menghubungi Anda.
    * Pengunjung dapat menjelajahi halaman lain seperti **"Tentang Saya"**, **"Proyek"** (daftar semua portofolio), dan **"Kontak"**.
    * Saat mengklik sebuah proyek, mereka akan diarahkan ke halaman **Detail Proyek** yang berisi deskripsi lengkap, teknologi yang digunakan, dan galeri gambar/video.
    * Mereka tidak bisa mengubah atau menghapus konten apa pun.

2.  **Alur Admin (Anda):**
    * Anda mengakses halaman login khusus (misalnya, `www.domainanda.com/admin` atau `/login`).
    * Anda memasukkan **username** dan **password**.
    * Sistem memverifikasi data Anda. Jika berhasil, Anda akan diarahkan ke **Dashboard Admin**.
    * Di Dashboard, Anda memiliki akses penuh (CRUD - Create, Read, Update, Delete) untuk mengelola konten portofolio:
        * **Menambah Proyek Baru:** Mengisi form yang berisi judul, deskripsi, gambar, link, dll.
        * **Mengedit Proyek:** Memperbarui informasi proyek yang sudah ada.
        * **Menghapus Proyek:** Menghapus portofolio dari website.
    * Setelah selesai, Anda bisa **Logout** untuk keluar dari sesi admin.

---

### Rincian Fitur Fullstack

Berikut adalah pemecahan fitur dari sisi frontend, backend, hingga database.

#### Frontend (Sisi Klien)
* **Dibangun dengan:** **Next.js** (Sangat direkomendasikan untuk berpasangan dengan Tailwind dan shadcn/ui), Tailwind CSS, dan shadcn/ui.
* **Halaman Publik:**
    * **Homepage:** Tampilan utama yang menarik dengan animasi halus, menampilkan proyek terbaik.
    * **Halaman Proyek:** Galeri semua proyek dengan filter berdasarkan kategori atau teknologi.
    * **Halaman Detail Proyek:** Tampilan mendalam untuk setiap proyek.
    * **Halaman Kontak:** Form kontak yang fungsional (dapat dihubungkan ke API backend).
* **Antarmuka Admin (Terproteksi):**
    * **Halaman Login:** Form sederhana dan aman untuk otentikasi.
    * **Dashboard Admin:** Halaman utama setelah login, menampilkan ringkasan proyek dan tombol aksi cepat (seperti "Tambah Proyek Baru").
    * **Manajemen Proyek:** Tabel yang menampilkan semua proyek dengan tombol untuk **Edit** dan **Hapus**.
    * **Form Editor:** Form canggih untuk menambah/mengedit proyek, mungkin menggunakan editor teks kaya (rich text editor) untuk deskripsi.
* **Desain & UX:**
    * **Desain Responsif:** Tampilan sempurna di semua perangkat (desktop, tablet, mobile) berkat Tailwind CSS.
    * **Komponen UI Modern:** Menggunakan komponen siap pakai dari **shadcn/ui** yang bisa dikustomisasi penuh, memberikan kesan mewah dan konsisten.
    * **Animasi & Transisi Halus:** Efek *hover*, *fade-in*, dan transisi antar halaman untuk pengalaman pengguna yang dinamis (bisa menggunakan `framer-motion`).

#### Backend (Sisi Server)
* **Dibangun dengan:** **Node.js** dengan framework **Express.js** atau **Fastify** untuk kecepatan.
* **API (Application Programming Interface):**
    * **RESTful API:** Menyediakan *endpoints* yang jelas untuk setiap aksi. Contoh:
        * `GET /api/projects`: Mengambil semua data proyek (untuk publik).
        * `GET /api/projects/:id`: Mengambil detail satu proyek.
        * `POST /api/auth/login`: Memproses login admin.
        * `POST /api/projects`: Membuat proyek baru (membutuhkan otentikasi).
        * `PUT /api/projects/:id`: Memperbarui proyek (membutuhkan otentikasi).
        * `DELETE /api/projects/:id`: Menghapus proyek (membutuhkan otentikasi).
* **Otentikasi & Otorisasi:**
    * **JWT (JSON Web Tokens):** Saat admin berhasil login, server akan memberikan sebuah *token* JWT. Token ini harus disertakan di setiap permintaan ke *endpoint* yang terproteksi.
    * **Password Hashing:** Kata sandi admin tidak disimpan sebagai teks biasa, melainkan di-*hash* menggunakan `bcrypt` untuk keamanan maksimal.
    * **Middleware:** Fungsi perantara di Express.js untuk memeriksa apakah permintaan yang masuk memiliki token JWT yang valid sebelum mengizinkan akses ke data sensitif.
* **Logika Bisnis:**
    * **Validasi Input:** Memastikan data yang dikirim dari form (misalnya, judul tidak boleh kosong) valid sebelum disimpan ke database (menggunakan library seperti `zod`).
    * **Manajemen Upload File:** Logika untuk menangani unggahan gambar proyek, menyimpannya di server atau layanan cloud (seperti Cloudinary), dan menyimpan URL-nya di database.

#### Database & ORM
* **Database:** **PostgreSQL**, sebuah sistem database relasional yang kuat dan andal.
* **ORM (Object-Relational Mapper):** **Drizzle ORM**.
* **Struktur Tabel (Schema):**
    * **`users`**: Menyimpan data admin (misalnya: `id`, `username`, `password_hash`).
    * **`projects`**: Menyimpan semua detail portofolio (misalnya: `id`, `title`, `description`, `image_url`, `project_link`, `created_at`).
    * **`technologies`**: (Opsional) Tabel untuk menyimpan teknologi yang Anda kuasai.
    * **`project_technologies`**: (Opsional) Tabel penghubung untuk relasi *many-to-many* antara proyek dan teknologi.
* **Fungsi Drizzle:**
    * **Skema Type-Safe:** Mendefinisikan struktur tabel langsung di dalam kode TypeScript, yang mengurangi risiko kesalahan.
    * **Query Builder:** Menulis query SQL dengan cara yang aman dan modern menggunakan TypeScript.
    * **Migrasi:** Mengelola perubahan skema database secara terstruktur saat aplikasi Anda berkembang.

---

### Penerapan dengan Docker 🐳

Docker digunakan untuk "mengemas" aplikasi Anda (frontend, backend, dan database) ke dalam *container* yang terisolasi. Ini membuat proses pengembangan dan *deployment* menjadi sangat mudah dan konsisten di mana saja.



* **`Dockerfile`:** Sebuah file resep untuk membangun *image* aplikasi Node.js Anda. Isinya berupa instruksi seperti: "gunakan Node.js versi 20, salin kode aplikasi, install dependensi, dan jalankan server".
* **`docker-compose.yml`:** Sebuah file konfigurasi untuk menjalankan beberapa *container* sekaligus.
    * **Layanan `app`:** Menjalankan container dari `Dockerfile` aplikasi Node.js Anda.
    * **Layanan `db`:** Menjalankan container resmi PostgreSQL, lengkap dengan pengaturan volume untuk menyimpan data secara permanen.
    * **Layanan `frontend`:** (Opsional, jika frontend dan backend dipisah) Menjalankan container aplikasi Next.js.

Dengan satu perintah (`docker-compose up`), Anda bisa menjalankan seluruh tumpukan aplikasi (database + backend + frontend) di lingkungan lokal Anda dengan mudah.