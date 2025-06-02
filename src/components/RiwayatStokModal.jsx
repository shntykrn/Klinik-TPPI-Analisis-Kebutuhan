// components/RiwayatStokModal.jsx
import { X } from "lucide-react"

export default function RiwayatStokModal({ onClose }) {
  // Dummy data riwayat
  const riwayat = [
    { id: 1, name: "Dapyrin 500mg", jumlah: 10, unit: "Tablet", pasien: "John Doe", tanggal: "2025-05-01" },
    { id: 2, name: "Amoxicillin 500mg", jumlah: 5, unit: "Kapsul", pasien: "Jane Smith", tanggal: "2025-05-02" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md w-11/12 max-w-2xl p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Riwayat Stok Obat</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nama Obat</th>
              <th className="p-2 border">Jumlah</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Pasien</th>
              <th className="p-2 border">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.jumlah}</td>
                <td className="p-2 border">{item.unit}</td>
                <td className="p-2 border">{item.pasien}</td>
                <td className="p-2 border">{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
