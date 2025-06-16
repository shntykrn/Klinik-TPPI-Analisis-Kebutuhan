import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UnduhSurat = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const pindahHalaman = useNavigate(); // Untuk navigasi halaman

  useEffect(() => {
    const prosesUnduhSurat = async () => {
      try {
        console.log(`Mengunduh surat dengan ID: ${id}`);

        // Simulasi jeda sebelum unduh (misalnya menunggu proses backend)
        await new Promise((selesai) => setTimeout(selesai, 1000));

        // Simulasi: Anda bisa menambahkan logika unduh file di sini,
        // misalnya window.location.href = `/api/unduh/${id}`;

        // Kembali ke halaman lihat surat setelah selesai
        pindahHalaman('/lihat-surat');
      } catch (error) {
        console.error('Gagal mengunduh surat:', error);
        alert('Terjadi kesalahan saat mengunduh surat.');
      }
    };

    prosesUnduhSurat();
  }, [id, pindahHalaman]);

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-lg font-semibold">Sedang mempersiapkan unduhan surat...</p>
    </div>
  );
};

export default UnduhSurat;
