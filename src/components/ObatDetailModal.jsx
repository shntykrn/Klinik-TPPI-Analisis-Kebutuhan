// components/ObatDetailModal.jsx
import { X } from "lucide-react"

export default function ObatDetailModal({ obat, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md w-11/12 max-w-lg p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <img src={obat.image || "/images/default.jpg"} alt={obat.name} className="w-full h-40 object-contain mb-4" />
        <h2 className="text-xl font-bold mb-2">{obat.name}</h2>
        <p className="text-gray-700 mb-4">{obat.description}</p>

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
              <td className="p-2 border">{obat.name}</td>
              <td className="p-2 border">{obat.stock}</td>
              <td className="p-2 border">{obat.unit}</td>
              <td className="p-2 border">{obat.expDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
