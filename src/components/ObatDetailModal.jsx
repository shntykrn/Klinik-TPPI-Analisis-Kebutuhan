import React from "react";
import { X } from "lucide-react";

export default function ObatDetailModal({ obat, onClose }) {
  if (!obat) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose} // Klik di luar modal = tutup modal
      style={{ cursor: "pointer" }}
    >
      <div
        className="bg-white rounded-lg shadow-md w-11/12 max-w-lg p-4 relative"
        onClick={(e) => e.stopPropagation()} // Cegah klik di dalam modal menutup modal
        style={{ cursor: "default" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <img
          src={
            obat.gambar
              ? `http://localhost:5000/public/uploads/${obat.gambar}`
              : "/images/default.jpg"
          }
          alt={obat.nama_obat}
          className="w-full h-40 object-contain mb-4"
        />

        <h2 className="text-xl font-bold mb-2">{obat.nama_obat}</h2>
        <p className="text-gray-700 mb-4">{obat.deskripsi}</p>

        <table className="w-full text-sm border mt-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Deskripsi</th>
              <th className="p-2 border">Stok</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Exp. Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">{obat.deskripsi}</td>
              <td className="p-2 border">{obat.stok}</td>
              <td className="p-2 border">{obat.satuan}</td>
              <td className="p-2 border">
                {obat.tanggal_kadaluarsa
                  ? obat.tanggal_kadaluarsa.slice(0, 7)
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
