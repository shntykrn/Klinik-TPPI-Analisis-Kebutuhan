"use client"

import { useState } from "react"
import { Search, Plus, Filter, ChevronDown, Edit, Trash2, AlertTriangle } from "lucide-react"

const StokObatPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample data - in a real app, this would come from an API
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Analgesik",
      stock: 150,
      unit: "Tablet",
      minStock: 50,
      expDate: "2024-05-15",
      supplier: "PT Kimia Farma",
      location: "Rak A-1",
    },
    {
      id: 2,
      name: "Amoxicillin 500mg",
      category: "Antibiotik",
      stock: 80,
      unit: "Kapsul",
      minStock: 30,
      expDate: "2024-03-20",
      supplier: "PT Dexa Medica",
      location: "Rak A-2",
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      category: "Antasida",
      stock: 25,
      unit: "Tablet",
      minStock: 30,
      expDate: "2024-06-10",
      supplier: "PT Kalbe Farma",
      location: "Rak B-1",
    },
    {
      id: 4,
      name: "Cetirizine 10mg",
      category: "Antihistamin",
      stock: 100,
      unit: "Tablet",
      minStock: 40,
      expDate: "2024-08-05",
      supplier: "PT Kimia Farma",
      location: "Rak B-2",
    },
    {
      id: 5,
      name: "Metformin 500mg",
      category: "Antidiabetik",
      stock: 120,
      unit: "Tablet",
      minStock: 50,
      expDate: "2024-07-15",
      supplier: "PT Dexa Medica",
      location: "Rak C-1",
    },
  ]

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Stok Obat</h1>
        <button className="bg-[#9747ff] text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" />
          Tambah Obat
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#9747ff]">
          <p className="text-sm text-gray-500">Total Obat</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Stok Cukup</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Stok Menipis</p>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Stok Habis</p>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari nama obat atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9747ff]"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700">
              <Filter size={18} className="mr-2" />
              Filter
              <ChevronDown size={18} className="ml-2" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Obat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kategori
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stok
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kadaluarsa
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Supplier
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lokasi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {medicine.stock < medicine.minStock && (
                        <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          medicine.stock === 0
                            ? "text-red-600 font-medium"
                            : medicine.stock < medicine.minStock
                              ? "text-yellow-600 font-medium"
                              : "text-gray-500"
                        }`}
                      >
                        {medicine.stock} {medicine.unit}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.expDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#9747ff] hover:text-[#8a3df0] mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMedicines.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StokObatPage
