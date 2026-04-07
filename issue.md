# Setup Project Backend: ElysiaJS + Drizzle ORM + MySQL

## Deskripsi Tugas
Tugas ini bertujuan untuk menginisiasi proyek backend baru di root direktori ini. Proyek ini akan menggunakan **Bun** sebagai runtime, **ElysiaJS** sebagai web framework, dan **Drizzle ORM** untuk berinteraksi dengan database **MySQL**.

Tugas ini hanya bersifat inisiasi (scaffolding) dan konfigurasi dasar, pastikan struktur dasar proyek telah disiapkan agar developer atau AI lain dapat langsung melanjutkan implementasi fitur.

## Kebutuhan (Requirements)
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **ORM**: Drizzle ORM
- **Database**: MySQL

## Instruksi Implementasi (High-Level)

### 1. Inisialisasi Proyek Bun
- Inisialisasi proyek `bun` di folder saat ini.
- Setup file `package.json` dan standar konfigurasi TypeScript (seperti `tsconfig.json`).

### 2. Instalasi Dependensi
- Tambahkan dependensi inti web framework: ElysiaJS.
- Tambahkan dependensi ORM dan driver database: Drizzle ORM dan driver MySQL (misalnya `mysql2`).
- Tambahkan dependensi development: `drizzle-kit` serta utility pendukung lain yang mungkin diperlukan untuk TypeScript.

### 3. Konfigurasi Drizzle ORM & Database
- Buat struktur direktori untuk modul database (misal: `src/db`).
- Siapkan koneksi *database* (connection setup) menggunakan driver yang dipilih.
- Definisikan file skema (schema) Drizzle sederhana sebagai _placeholder_ awal (misalnya skema tabel `users` sederhana).
- Siapkan file konfigurasi `drizzle.config.ts` untuk mengatur migrasi database.

### 4. Setup Server Elysia
- Buat _entry point_ aplikasi utama (misalnya `src/index.ts`).
- Instansiasi server Elysia.
- Integrasikan koneksi Drizzle ORM ke dalam instans Elysia.
- Sediakan minimal satu rute API (misal sebuah _healthcheck endpoint_) yang berinteraksi dengan Drizzle untuk memverifikasi koneksi database.

### 5. Setup Skrip Development
Definisikan *scripts* pada `package.json` untuk membantu proses development:
- Menjalankan server aplikasi (dengan fitur _hot-reload_ bawaan `bun`).
- Perintah untuk _generate_ migrasi database menggunakan `drizzle-kit`.
- Perintah untuk menjalankan/ _push_ migrasi ke database.

## Kriteria Penerimaan (Acceptance Criteria)
- Proyek bisa dijalankan secara lokal tanpa ada *error*.
- Rute API percobaan (termasuk query ke database) bisa diakses dan mengembalikan data yang benar.
- *Developer* hanya perlu mengisi *environment variables* (seperti `DATABASE_URL`) untuk menghubungkannya ke instans MySQL milik mereka sendiri.
