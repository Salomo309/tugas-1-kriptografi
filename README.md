<!-- PROJECT SHIELDS -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="doc/bazo.png" alt="Logo" width="200" height="175">
  </a>

  <h1 align="center">CipherWeb</h1>

  <p align="center">
    Website untuk melakukan enkripsi dan dekripsi dengan berbagai algoritma cipher
  </p>
</div>

> Dibuat untuk memenuhi Tugas 1 IF4020 Kriptografi

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#how-to-run">How to Run</a></li>
      </ul>
    </li>
    <li><a href="#team-members">Team Members</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Website ini dibuat dengan mengimplementasikan berbagai jenis cipher sebagai berikut.

- Vigenere Cipher standard (26 huruf alfabet)
- Varian Vigenere Cipher standard (26 huruf alfabet): Auto-Key Vigenere Cipher
- Extended Vigenere Cipher (256 karakter ASCII)
- Playfair Cipher (26 huruf alfabet)
- Affine Cipher (26 huruf alfabet)
- Hill Cipher (26 huruf alfabet)
- Super enkripsi: gabungan Extended Vigenere Cipher dan cipher transposisi (metode
  kolom)

Website dapat menerima masukan plaintext maupun file, lalu mengenkripsi dengan pilihan algoritma cipher yang ada, dan juga mendekripsinya kembali.

## Built With

Aplikasi CipherWeb dibuat dalam bahasa javascript dengan framework React.js (frontend/client) dan Express.js (backend/server)

<!-- GETTING STARTED -->

## How to Run

1. Clone the repo
   ```sh
   git clone https://github.com/Salomo309/tugas-1-kriptografi
   ```
2. Run the server (server will run at localhost:5000)
   ```sh
   cd server
   nodemon server
   ```
3. Run the client (client will run at localhost:3000)
   ```sh
   cd client
   npm start
   ```

<!-- CONTACT -->

## Team Members

| NIM      | Name                           |
| -------- | ------------------------------ |
| 13521063 | Salomo Reinhart Gregory Manalu |
| 13521071 | Margaretha Olivia Haryono      |
