import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function RiwayatStokModal({ onClose }) {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/riwayat-obat");
        if (!res.ok) throw new Error("Gagal memuat riwayat");
        const data = await res.json();
        setRiwayat(data);
      } catch (err) {
        setError("Gagal mengambil data riwayat obat");
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md w-11/12 max-w-3xl p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Riwayat Stok Obat</h2>

        {loading ? (
          <p className="text-center text-gray-600">Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : riwayat.length === 0 ? (
          <p className="text-center text-gray-600">Belum ada riwayat</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Nama Obat</th>
                <th className="p-2 border">Jumlah</th>
                <th className="p-2 border">Unit</th>
                <th className="p-2 border">Jenis</th>
                <th className="p-2 border">Keterangan</th>
                <th className="p-2 border">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.jumlah}</td>
                  <td className="p-2 border">{item.unit}</td>
                  <td className="p-2 border capitalize">{item.jenis}</td>
                  <td className="p-2 border">{item.keterangan}</td>
                  <td className="p-2 border">{item.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
