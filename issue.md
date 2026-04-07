# Rencana Implementasi: Fitur Registrasi Pengguna dan Pemisahan Arsitektur Route-Service

**Tujuan**: Mengimplementasikan fitur registrasi pengguna baru dan merapikan struktur proyek dengan memisahkan _routing_ (ElysiaJS) dan _business logic_ (Services).

Instruksi ini dirancang agar mudah diikuti secara bertahap oleh junior programmer atau AI. Cukup kerjakan langkah demi langkah dari Tahap 1 hingga selesai.

---

## Tahap 1: Pembuatan Tabel User di Database

Saat ini, kita menggunakan Drizzle ORM dengan MySQL. Langkah pertama adalah memastikan tabel `users` dibuat di skema database.

1. Buka file `src/db/schema.ts`.
2. Pastikan atau tambahkan definisi tabel `users`. Tabel tersebut harus memiliki setidaknya kolom berikut:
   - `id`: Primary key (serial/auto-increment)
   - `username`: varchar (unique, not null)
   - `email`: varchar (unique, not null)
   - `password`: varchar (not null, pastikan untuk menyimpan **hash** dari password, bukan plain text)
   - `createdAt`: timestamp (default now)
3. Jika tabel baru ditambahkan atau diubah, jalankan perintah migrasi Drizzle (misalnya `bun run db:generate` dan `bun run db:push` atau perintah serupa sesuai `package.json` yang ada).

---

## Tahap 2: Pembuatan Struktur Folder `routes` dan `services`

Untuk menjaga agar kode mudah dipelihara dan rapi, kita harus memisahkan antara bagian yang menerima HTTP Request (_routing_) dan bagian yang memproses logika bisnis (_services_).

1. Cek folder di dalam `src`. Jika belum ada, buat dua folder baru:
   - `src/routes/`
   - `src/services/`

---

## Tahap 3: Pembuatan Service Layer (Business Logic)

Service akan menangani proses pengecekan data, hashing password, hingga penyimpanan ke database. Framework HTTP (Elysia) **tidak boleh** masuk ke dalam service.

1. Buat file `src/services/auth.service.ts`.
2. Buat fungsi `registerUser(data)` di dalam file tersebut. Fungsi ini harus melakukan:
   - **Pengecekan Ketersediaan**: Cek apakah `email` atau `username` sudah terdaftar di database menggunakan Drizzle.
   - **Hashing Password**: Jika belum ada, hash password yang dikirim oleh user (misalnya menggunakan `Bun.password.hash` atau _library_ bcrypt).
   - **Simpan ke Database**: Masukkan data user baru (`username`, `email`, dan password yang sudah di-hash) ke dalam tabel `users`.
   - **Kembalikan Hasil**: Kembalikan data user yang berhasil didaftarkan (tanpa password) agar bisa digunakan oleh route.

---

## Tahap 4: Pembuatan Route Layer (ElysiaJS Routing)

Route akan menerima request dari _client_, melakukan validasi input, memanggil _service_, dan mengembalikan response JSON.

1. Buat file `src/routes/auth.route.ts`.
2. Gunakan `Elysia` untuk membuat instance route baru (misalnya dengan prefix `/auth`).
3. Buat endpoint `POST /register`:
   - Gunakan fitur validasi Skema TypeBox built-in dari ElysiaJS (`t.Object`) untuk memastikan _body_ request memiliki `username`, `email`, dan `password`.
   - Di dalam *handler* endpoint, panggil fungsi `registerUser(data)` yang telah dibuat di **Tahap 3**.
   - Siapkan *error handling*: Jika `registerUser` memunculkan error (misalnya karena email sudah ada), tangkap error tersebut dan kembalikan response dengan status HTTP yang sesuai (contoh: 400 Bad Request).
   - Jika sukses, kembalikan response JSON berisi `success: true` dan data user baru (tanpa dikembalikan field `password`).

---

## Tahap 5: Menyambungkan Route ke Entry Point Aplikasi

Agar endpoint yang baru dibuat bisa diakses, kita perlu mendaftarkan `auth.route.ts` ke dalam instance utama aplikasi.

1. Buka file utama aplikasi, biasanya `src/index.ts`.
2. Import module router yang telah dibuat: `import { authRoutes } from './routes/auth.route';` (sesuaikan nama export).
3. Tambahkan ke dalam rantai aplikasi Elysia dengan menggunakan `.use()`. Contoh:
   ```typescript
   const app = new Elysia()
     // ...route atau plugin lain...
     .use(authRoutes)
     .listen(3000);
   ```

---

## Tahap 6: Pengujian (Testing)

Sebelum menyelesaikan tugas, pastikan fitur ini berjalan dengan baik:
1. Jalankan server secara lokal (`bun run dev`).
2. Gunakan aplikasi seperti Postman, Insomnia, curl, atau SwaggerUI bawaan untuk mengirim request `POST` ke `/auth/register` dengan menyertakan payload `username`, `email`, dan `password`.
3. Verifikasi secara manual bahwa:
   - Request berhasil (mendapat HTTP 200 atau 201).
   - Password di database sudah dalam bentuk _hash_ atau tidak terbaca secara gamblang (_plain text_).
   - Mendaftar dengan email atau username yang sama akan mengembalikan pesan error (*400 Bad Request* atau semacamnya).
