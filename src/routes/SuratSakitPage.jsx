import React from "react"
import { useState } from "react"
import { Search, Plus, Filter, ChevronDown, Download, Printer, Eye } from "lucide-react"

const SuratSakitPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample data - in a real app, this would come from an API
  const sickLetters = [
    {
      id: 1,
      patientName: "Ahmad Fauzi",
      medicalRecordNumber: "MR-2023-001",
      issueDate: "2023-05-15",
      startDate: "2023-05-15",
      endDate: "2023-05-18",
      duration: 3,
      diagnosis: "Influenza",
      doctor: "Dr. Anita Wijaya",
      status: "Issued",
    },
    {
      id: 2,
      patientName: "Siti Rahayu",
      medicalRecordNumber: "MR-2023-002",
      issueDate: "2023-05-18",
      startDate: "2023-05-18",
      endDate: "2023-05-20",
      duration: 2,
      diagnosis: "Gastroenteritis",
      doctor: "Dr. Budi Santoso",
      status: "Issued",
    },
    {
      id: 3,
      patientName: "Rudi Hartono",
      medicalRecordNumber: "MR-2023-003",
      issueDate: "2023-05-20",
      startDate: "2023-05-20",
      endDate: "2023-05-25",
      duration: 5,
      diagnosis: "Acute Bronchitis",
      doctor: "Dr. Anita Wijaya",
      status: "Issued",
    },
    {
      id: 4,
      patientName: "Dewi Lestari",
      medicalRecordNumber: "MR-2023-004",
      issueDate: "2023-05-22",
      startDate: "2023-05-22",
      endDate: "2023-05-24",
      duration: 2,
      diagnosis: "Migraine",
      doctor: "Dr. Cahyo Wibowo",
      status: "Issued",
    },
  ]

  const filteredSickLetters = sickLetters.filter(
    (letter) =>
      letter.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.medicalRecordNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Surat Keterangan Sakit</h1>
        <button className="bg-[#9747ff] text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" />
          Buat Surat Sakit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari pasien atau nomor rekam medis..."
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
                  Nama Pasien
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No. Rekam Medis
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal Surat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Periode Istirahat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Diagnosis
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dokter
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSickLetters.map((letter) => (
                <tr key={letter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{letter.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{letter.medicalRecordNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{letter.issueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {letter.startDate} s/d {letter.endDate} ({letter.duration} hari)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{letter.diagnosis}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{letter.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Download size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Printer size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSickLetters.length === 0 && (
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

export default SuratSakitPage