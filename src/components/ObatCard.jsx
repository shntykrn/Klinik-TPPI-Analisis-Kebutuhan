// components/ObatCard.jsx
export default function ObatCard({ obat, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={obat.image || "/images/default.jpg"}
        alt={obat.name}
        className="w-full h-32 object-contain mb-2"
      />
      <h2 className="text-lg font-semibold">{obat.name}</h2>
      <p className="text-sm text-gray-500">Stok: {obat.stock} {obat.unit}</p>
      <p className="text-xs text-gray-400">Exp: {obat.expDate}</p>
    </div>
  )
}
