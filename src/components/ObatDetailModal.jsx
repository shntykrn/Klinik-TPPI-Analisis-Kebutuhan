import React, { useState } from "react";
import { X } from "lucide-react";

export default function ObatDetailModal({ obat, onClose }) {
  const [mode, setMode] = useState(""); // "" | "ambil" | "tambah"
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stokTerkini, setStokTerkini] = useState(obat.stok);

  const handleSubmit = async (jenis) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint =
        jenis === "keluar"
          ? `http://localhost:5000/api/obat/ambil/${obat.id}`
          : `http://localhost:5000/api/obat/tambah/${obat.id}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jumlah: parseInt(jumlah), keterangan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal memproses permintaan");
      } else {
        setSuccess(`Obat berhasil di${jenis === "keluar" ? "ambil" : "tambah"}!`);
        setStokTerkini((prev) =>
          jenis === "keluar"
            ? prev - parseInt(jumlah)
            : prev + parseInt(jumlah)
        );
        setJumlah("");
        setKeterangan("");

        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md w-11/12 max-w-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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

        <table className="w-full text-sm border mb-4">
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
              <td className="p-2 border">{obat.nama_obat}</td>
              <td className="p-2 border">{stokTerkini}</td>
              <td className="p-2 border">{obat.satuan}</td>
              <td className="p-2 border">
                {obat.tanggal_kadaluarsa?.slice(0, 7) || "-"}
              </td>
            </tr>
          </tbody>
        </table>

        {mode === "" && (
          <div className="flex gap-3">
            <button
              className="bg-[#9747ff] text-white px-4 py-2 rounded-md"
              onClick={() => setMode("ambil")}
            >
              Ambil Obat
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => setMode("tambah")}
            >
              Tambah Obat
            </button>
          </div>
        )}

        {mode !== "" && (
          <div className="mt-4">
            <label className="block text-sm mb-1">
              Jumlah {mode === "tambah" ? "Tambah" : "Ambil"}
            </label>
            <input
              type="number"
              min="1"
              max={mode === "ambil" ? stokTerkini : undefined}
              className="border p-2 w-full rounded mb-2"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />

            <label className="block text-sm mb-1">Keterangan</label>
            <input
              type="text"
              className="border p-2 w-full rounded mb-2"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="flex gap-2 mt-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setMode("")}
              >
                Batal
              </button>
              <button
                className="bg-[#9747ff] text-white px-4 py-2 rounded"
                onClick={() => handleSubmit(mode === "ambil" ? "keluar" : "masuk")}
                disabled={loading}
              >
                {loading ? "Memproses..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
