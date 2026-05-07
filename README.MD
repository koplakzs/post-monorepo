# Monorepo Post Management System

Repositori ini adalah implementasi sistem manajemen postingan berbasis monorepo yang memisahkan antara **Frontend (Next.js)** dan **Backend (Laravel API)**. Proyek ini dirancang untuk skalabilitas dan efisiensi manajemen state menggunakan teknologi modern.

---

## 🛠️ Stack Teknologi

| Stack        | Teknologi                                                                               |
| ------------ | --------------------------------------------------------------------------------------- |
| **Frontend** | Next.js 15 (App Router), Tailwind CSS, DaisyUI, TanStack Query v5, Zod, React Hook Form |
| **Backend**  | Laravel 11, RESTful API, MySQL                                                          |
| **Auth**     | Cookie-based Authentication                                                             |

---

## 🚀 Cara Menginstal dan Menjalankan

### 1. Persiapan Database

Pastikan Anda memiliki server database MySQL yang berjalan dan buatlah satu database kosong bernama `monorepo_post`.

### 2. Backend (Laravel API)

1.  **Masuk ke direktori backend:**
    ```bash
    cd laravel
    ```
2.  **Instal dependensi Composer:**
    ```bash
    composer install
    ```
3.  **Instal dependensi NPM:**
    ```bash
    npm install
    ```
4.  **Konfigurasi Environment:**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    _Buka file `.env` dan sesuaikan bagian `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD`._
5.  **Jalankan Migrasi Database:**
    ```bash
    php artisan migrate
    ```
6.  **Jalankan Server API:**
    ```bash
    composer run dev
    ```
    _API akan berjalan secara default di: http://127.0.0.1:8000_

### 3. Frontend (Next.js)

1.  **Masuk ke direktori frontend:**
    ```bash
    cd next
    ```
2.  **Instal dependensi NPM:**
    ```bash
    npm install
    ```
3.  **Konfigurasi Environment:**
    Buat file `.env` di root folder `next`:
    ```env
    NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
    ```
4.  **Jalankan Server Development:**
    ```bash
    npm run dev
    ```
    _Aplikasi web akan berjalan di: http://localhost:3000_

---

## 📌 Catatan Teknis & Keputusan Arsitektur

### 1. Arsitektur Monorepo

Proyek ini menggunakan pendekatan monorepo untuk menyatukan ekosistem frontend dan backend dalam satu repositori. Hal ini mempermudah sinkronisasi antara perubahan skema di API dengan tampilan di Frontend.

### 2. State Management & Data Fetching

Kami menggunakan **TanStack Query (React Query) v5**:

- **Query Keys:** Menggunakan array key dinamis seperti `['posts', { page }]`. Saat halaman berubah, React Query otomatis melakukan fetch ulang.
- **Invalidasi Otomatis:** Setiap kali operasi `POST`, `PUT`, atau `DELETE` berhasil, sistem memanggil `queryClient.invalidateQueries` untuk menyinkronkan data UI dengan server tanpa reload.

### 3. Keamanan & Middleware

Proteksi rute dilakukan melalui **Next.js Middleware**:

- **Protected Routes:** Halaman dashboard diproteksi. Jika `auth_token` tidak ada di cookies, user akan diarahkan ke `/login`.
- **Guest Routes:** User yang sudah login tidak dapat mengakses halaman `/login` atau `/register`.

### 4. UI/UX dengan DaisyUI

- **Skeleton Loader:** Implementasi tampilan loading yang berdenyut saat `isLoading` true untuk UX yang lebih halus.
- **ForwardRef Modals:** Modal dialog (Tambah/Edit/Hapus) menggunakan `forwardRef` untuk memisahkan kontrol state buka/tutup antara komponen induk dan modal.

### 5. Pagination Server-Side

Sistem navigasi menggunakan metadata dari Laravel API (`currentPage`, `lastPage`, `total`). Komponen `Pagination` di frontend mengontrol state halaman yang kemudian memicu re-fetch data secara otomatis.

---

## 🛡️ Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
