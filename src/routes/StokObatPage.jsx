import React, { useEffect, useState, useRef } from "react"
import { Search, Plus, Filter, ChevronDown } from "lucide-react"
import ObatCard from "../components/ObatCard"
import ObatDetailModal from "../components/ObatDetailModal"
import TambahObatModal from "../components/TambahObatModal"
import RiwayatStokModal from "../components/RiwayatStokModal"

const categories = [
  "Semua",
  "Antibiotik",
  "Analgesik/Antipiretik",
  "Anti Virus",
  "Obat Pencernaan",
  "Obat Topikal",
  "Obat Saraf",
  "Obat Tetes",
  "Anti Inflamasi/Alergi",
  "Obat Pernafasan/Flu",
  "Obat Diuretik",
  "Obat Injeksi",
  "Anti Hipertensi/Jantung",
  "Obat Persendian",
]

const StokObatPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedObat, setSelectedObat] = useState(null)
  const [isTambahOpen, setIsTambahOpen] = useState(false)
  const [isRiwayatOpen, setIsRiwayatOpen] = useState(false)
  const [medicines, setMedicines] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  const filterRef = useRef()

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

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowCategoryDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter data obat sesuai kategori dan search term
  const filteredMedicines = medicines.filter((obat) => {
    const matchSearch = obat.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory =
      selectedCategory === "Semua" || obat.kategori === selectedCategory
    return matchSearch && matchCategory
  })

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
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Filter button dan dropdown kategori */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowCategoryDropdown((prev) => !prev)}
            className="flex items-center border rounded-md px-4 py-2 text-gray-700"
          >
            <Filter size={18} className="mr-2" />
            {selectedCategory}
            <ChevronDown size={18} className="ml-2" />
          </button>

          {showCategoryDropdown && (
            <ul className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-auto">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setShowCategoryDropdown(false)
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-[#9747ff] hover:text-white ${
                    selectedCategory === cat ? "bg-[#9747ff] text-white" : ""
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
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
