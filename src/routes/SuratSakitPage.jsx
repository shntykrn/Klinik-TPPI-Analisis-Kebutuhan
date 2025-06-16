import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
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
  const [sickLetters, setSickLetters] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/surat-sakit")
        if (!response.ok) throw new Error("Gagal fetch data")
        const data = await response.json()
        setSickLetters(data)
      } catch (error) {
        console.error("Gagal mengambil data surat sakit:", error)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    const date = new Date(dateStr)
    return isNaN(date)
      ? "-"
      : date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
  }

  const filteredData = sickLetters.filter(
    (item) =>
      item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nik?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Surat Keterangan Sakit
        </h1>
        <button
          className="bg-[#9747ff] text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => navigate("/buat-surat")}
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
              placeholder="Cari nama atau NIK..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pasien
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Surat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periode Istirahat
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.nik}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(item.dibuat_pada)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
  {item.tanggal_mulai && item.tanggal_selesai
    ? `${formatDate(item.tanggal_mulai)} s/d ${formatDate(item.tanggal_selesai)}`
    : "-"}
</td>


                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => navigate(`/lihat-surat/${item.id}`)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          onClick={() => navigate(`/unduh-surat/${item.id}`)}
                        >
                          <Download size={18} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => navigate(`/cetak-surat/${item.id}`)}
                        >
                          <Printer size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
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
