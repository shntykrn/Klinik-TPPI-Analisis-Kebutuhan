import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Download,
  Printer,
  Eye,
} from "lucide-react"

const SuratSakitPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredData = sickLetters.filter(
    (item) =>
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medicalRecordNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Surat Keterangan Sakit
        </h1>
        <button
          className="bg-[#9747ff] text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => navigate("/surat-sakit/baru")}
        >
          <Plus size={18} className="mr-2" />
          Buat Surat Sakit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari pasien atau nomor rekam medis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9747ff]"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <div>
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
                {[
                  "Nama Pasien",
                  "No. Rekam Medis",
                  "Tanggal Surat",
                  "Periode Istirahat",
                  "Diagnosis",
                  "Dokter",
                  "Aksi",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.patientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.medicalRecordNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.issueDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.startDate} s/d {item.endDate} ({item.duration} hari)
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.diagnosis}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.doctor}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => navigate(`/surat-sakit/${item.id}`)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          onClick={() => navigate(`/surat-sakit/${item.id}/unduh`)}
                        >
                          <Download size={18} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => navigate(`/surat-sakit/${item.id}/cetak`)}
                        >
                          <Printer size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    Tidak ada data ditemukan.
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
