Instalasi sebelum penggunaan SI Pengajuan Bebras Task

1. Pastikan node.js 21.7.3 sudah terinstall, apabila node.js belum terinstall, download node 21.7.3 di https://nodejs.org/en/download
2. Pastikan postgresql 16.9 sudah terinstall, apabila belum terinstall, download postgresql 16.9 di https://www.enterprisedb.com/downloads/postgres-postgresql-downloads, buat password untuk superuser postgres, untuk port masukkan 5432
3. Pastikan pandoc 3.1.10 sudah terinstall, apabila belum, download pandoc 3.1.10 di https://github.com/jgm/pandoc/releases/tag/3.1.10, uncheck "install for all users"
4. Menggunakan stack builder, install pgAgent, masukkan password untuk superuser postgres, untuk operating system username masukan "postgres", masukkan system user password
5. Buka pgAdmin4, klik Servers, klik PostgreSQL 16, klik kanan pada Databases, klik Create, klik Database
6. Beri nama database tersebut 'bebras' dan owner adalah 'postgres'
7. Klik Query Tool
8. Pilih file querybasisdata.sql di dalam folder Query db dan Execute
9. Masukan perintah "Create extension pgagent;" di basis data bebras dan Execute
10. Buka "C:\Users\postgres\AppData\Roaming\postgresql" dan didalam file pgpass.conf (buat jika belum ada) tambahkan "localhost:5432:bebras:postgres:[password untuk superuser postgres]" di dalam file .
11. Eksekusi querypgagent.sql pada basis data bebras
12. Tekan Win + R, ketik sysdm.cpl, lalu tekan Enter. Pilih tab Advanced. Klik tombol Environment Variables, di System variables cari path dan klik edit, klik new, masukan path "C:\Program Files\PostgreSQL\16\bin" dan klik ok
13. Jalankan terminal sebagai administrator di direktori C:\Program Files\PostgreSQL\16\bin jalankan pgagent.exe INSTALL pgAgentBebras host=localhost port=5432 dbname=bebras -u postgres -p [password untuk superuser postgres]
14. masukan perintah net start pgAgentBebras
15. Tekan Win + R, ketik services.msc, lalu tekan Enter dan pastikan pgAgentBebras memiliki status "running"

Cara menjalankan aplikasi :

1. Buka folder SI-Pengajuan-Bebras-master
2. Buka terminal
3. Masukkan perintah npm install --force
4. Masukkan perintah npm run dev
5. Buka browser dan masukkan localhost:3000/signin

Username dan Password yang bisa digunakan untuk role Biro :

1. Username : budi1234 password : budi1234
2. Username : andi1234 password : andi1234
3. Username : dina1234 password : dina1234
4. Username : taylor12 password : taylor12
5. Username : aji1234 password : aji1234

Username dan Password yang bisa digunakan untuk role tim soal nasional :

1. Username : Sam1234 password : sam1234
2. Username : gina1234 password : gina1234
3. Username : tom1234 password : tom1234
4. Username : ben1234 password : ben1234
5. Username : dean1234 password : dean1234

Username dan Password yang bisa digunakan untuk role admin :

1. Username : joyce12 password : joyce12
