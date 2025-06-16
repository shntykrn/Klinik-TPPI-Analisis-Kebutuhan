import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Printer } from 'lucide-react';

const LihatSurat = () => {
  const [daftarSurat, setDaftarSurat] = useState([]);
  const [kataKunci, setKataKunci] = useState('');
  const pindahHalaman = useNavigate();

  useEffect(() => {
    const ambilData = async () => {
      try {
        const respon = await fetch('/api/surat-sakit');
        const data = await respon.json();
        setDaftarSurat(data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    ambilData();
  }, []);

  const hasilFilter = daftarSurat.filter((surat) =>
    surat.nama.toLowerCase().includes(kataKunci.toLowerCase()) ||
    surat.nik.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Surat Izin</h1>
        <button
          onClick={() => pindahHalaman('/buat-surat')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buat Baru
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <input
          type="text"
          placeholder="Cari nama atau NIK..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">NIK</th>
              <th className="px-6 py-3 text-left">Departemen</th>
              <th className="px-6 py-3 text-left">Jenis Izin</th>
              <th className="px-6 py-3 text-left">Periode</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hasilFilter.map((surat) => (
              <tr key={surat._id}>
                <td className="px-6 py-4">{surat.nama}</td>
                <td className="px-6 py-4">{surat.nik}</td>
                <td className="px-6 py-4">{surat.departemen}</td>
                <td className="px-6 py-4">{surat.jenisIzin}</td>
                <td className="px-6 py-4">
                  {new Date(surat.tanggalMulai).toLocaleDateString()} -{' '}
                  {new Date(surat.tanggalSelesai).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => pindahHalaman(`/unduh-surat/${surat._id}`)}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Unduh"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => pindahHalaman(`/cetak-surat/${surat._id}`)}
                      className="text-gray-600 hover:text-gray-800 p-1"
                      title="Cetak"
                    >
                      <Printer size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LihatSurat;
