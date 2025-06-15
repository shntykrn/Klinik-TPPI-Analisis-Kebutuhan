import React, { useEffect, useState } from "react"
import { Search, Plus, Filter, ChevronDown } from "lucide-react"
import ObatCard from "../components/ObatCard"
import ObatDetailModal from "../components/ObatDetailModal"
import TambahObatModal from "../components/TambahObatModal"
import RiwayatStokModal from "../components/RiwayatStokModal"

const StokObatPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedObat, setSelectedObat] = useState(null)
  const [isTambahOpen, setIsTambahOpen] = useState(false)
  const [isRiwayatOpen, setIsRiwayatOpen] = useState(false)
  const [medicines, setMedicines] = useState([])

  // Ambil data obat dari backend
  const fetchObat = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/obat")
      const data = await res.json()
      setMedicines(data)
    } catch (err) {
      console.error("Gagal fetch obat:", err)
    }
  }

  useEffect(() => {
    fetchObat()
  }, [])

  const filteredMedicines = medicines.filter((obat) =>
    obat.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stok Obat</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRiwayatOpen(true)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            Riwayat
          </button>
          <button
            onClick={() => setIsTambahOpen(true)}
            className="bg-[#9747ff] text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Tambah Obat
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari obat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9747ff]"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="flex items-center border rounded-md px-4 py-2 text-gray-700">
          <Filter size={18} className="mr-2" />
          Filter
          <ChevronDown size={18} className="ml-2" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMedicines.map((obat) => (
          <ObatCard
            key={obat.id}
            obat={obat}
            onClick={() => setSelectedObat(obat)}
          />
        ))}
      </div>

      {/* MODALS */}
      {selectedObat && (
        <ObatDetailModal
          obat={selectedObat}
          onClose={() => setSelectedObat(null)}
        />
      )}
      {isTambahOpen && (
        <TambahObatModal
          onClose={() => {
            setIsTambahOpen(false)
            fetchObat()
          }}
        />
      )}
      {isRiwayatOpen && (
        <RiwayatStokModal onClose={() => setIsRiwayatOpen(false)} />
      )}
    </div>
  )
}

export default StokObatPage
