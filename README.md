# Actlink

Proyek ini terdiri dari backend (Elysia.js + Bun), frontend (React + Vite), dan database (MySQL 8). Semua telah dikonfigurasi untuk dapat berjalan di dalam kontainer menggunakan Docker Compose.

## 🚀 Cara Setup dan Menjalankan Proyek (Menggunakan Docker)

Cara termudah untuk menjalankan proyek ini adalah menggunakan Docker:

1. **Pastikan Docker dan Docker Compose telah terinstall** di sistem Anda.
2. **Siapkan Environment Variables**:
   Duplikat atau ganti nama file `.env.example` (jika ada) menjadi `.env`.
   ```bash
   cp .env.example .env
   ```
3. **Bangun dan Jalankan Kontainer**:
   Gunakan perintah berikut untuk membangun *image* dan menjalankan frontend, backend, serta database di latar belakang (`-d` atau detached mode).
   ```bash
   docker compose up -d --build
   ```
4. **Sukses! Akses Aplikasinya**:
   - **Frontend UI** dapat diakses melalui browser di: `http://localhost` (port 80)
   - **Backend API** dapat diakses melalui: `http://localhost:3000`
   - **Database MySQL** terekspos di host Anda pada: `localhost:3310`

Jika Anda ingin menghentikan aplikasi, cukup jalankan:
```bash
docker compose down
```

## 🛠️ Pengembangan Lokal Tanpa Docker

Jika Anda ingin melakukan proses pengembangan secara lokal menggunakan Bun, ikuti langkah-langkah berikut (pastikan MySQL sudah berjalan):

1. **Install Dependencies** di kedua direktori:
   ```bash
   # Backend
   bun install

   # Frontend
   cd frontend
   bun install
   ```

2. **Jalankan Aplikasi:**
   - **Untuk Database:**
     Pastikan Anda memiliki server MySQL lokal yang menyala atau setidaknya menggunakan kontainer db terpisah.
   - **Untuk Backend:**
     ```bash
     bun run dev
     ```
   - **Untuk Frontend:**
     ```bash
     cd frontend
     bun run dev
     ```

## 🗄️ Database Migrations

Proyek ini menggunakan Drizzle ORM. Untuk melakukan generate skema atau push tabel baru ke database lokal Anda, gunakan:
```bash
bun run db:generate
bun run db:push
```
