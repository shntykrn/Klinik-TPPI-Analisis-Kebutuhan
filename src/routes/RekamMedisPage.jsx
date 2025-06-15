import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const RekamMedisPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("riwayat")
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [patients, setPatients] = useState([])
  const [riwayat, setRiwayat] = useState([])

  // Form states
  const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState("")
  const [keluhan, setKeluhan] = useState("")
  const [tensiAtas, setTensiAtas] = useState("")
  const [tensiBawah, setTensiBawah] = useState("")
  const [suhu, setSuhu] = useState("")
  const [nadi, setNadi] = useState("")
  const [respirasi, setRespirasi] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/pasien")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Gagal fetch pasien", err))
  }, [])

  const filtered = patients.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nik.includes(searchTerm)
  )

  const fetchRiwayat = (id) => {
    fetch("http://localhost:5000/api/rekam-medis/get")
      .then((res) => res.json())
      .then((data) =>
        setRiwayat(data.filter((item) => item.id_pasien === id))
      )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedPatient || !tanggalPemeriksaan) {
      alert("Mohon lengkapi data")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/rekam-medis/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pasien: selectedPatient.id,
          tanggal_pemeriksaan: tanggalPemeriksaan,
          keluhan,
          tensi: `${tensiAtas}/${tensiBawah}`,
          suhu,
          nadi,
          respirasi,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        alert("Rekam medis berhasil disimpan")
        setTanggalPemeriksaan("")
        setKeluhan("")
        setTensiAtas("")
        setTensiBawah("")
        setSuhu("")
        setNadi("")
        setRespirasi("")
        setActiveTab("riwayat")
        fetchRiwayat(selectedPatient.id)
      } else {
        alert(data.error || "Gagal menyimpan")
      }
    } catch (err) {
      alert("Error: " + err.message)
    }
  }

  const handleDeletePasien = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pasien ini?")) return
    try {
      const res = await fetch(`http://localhost:5000/api/pasien/delete/${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (res.ok) {
        alert("Pasien berhasil dihapus")
        setPatients(patients.filter((p) => p.id !== id))
      } else {
        alert(data.error || "Gagal menghapus pasien")
      }
    } catch (err) {
      alert("Gagal menghapus pasien: " + err.message)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-center text-2xl font-semibold mb-6">PASIEN</h1>

      {!selectedPatient ? (
        <>
          <input
            className="border px-4 py-2 rounded w-full mb-4"
            placeholder="Cari pasien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">NIK</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{p.nik}</td>
                  <td className="px-4 py-2">{p.nama}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedPatient(p)
                        fetchRiwayat(p.id)
                      }}
                      className="bg-[#cfc3ea] text-xs px-3 py-1 rounded-md"
                    >
                      LIHAT
                    </button>
                    <button
                      onClick={() => handleDeletePasien(p.id)}
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded-md"
                    >
                      HAPUS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2 className="text-center text-xl font-semibold mb-4">REKAM MEDIS</h2>
          <div className="flex justify-center gap-8 border-b mb-6">
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "riwayat"
                  ? "border-[#3b2772] font-semibold"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("riwayat")}
            >
              RIWAYAT
            </button>
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "catat"
                  ? "border-[#3b2772] font-semibold"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("catat")}
            >
              CATAT
            </button>
          </div>

          {activeTab === "riwayat" && (
            <div className="space-y-2">
              {riwayat.map((visit, index) => (
                <div key={index}>
                  <button
                    className="w-full flex justify-between items-center bg-gray-300 px-4 py-3"
                    onClick={() =>
                      setExpandedIndex(index === expandedIndex ? null : index)
                    }
                  >
                    <span>{visit.tanggal_pemeriksaan}</span>
                    {expandedIndex === index ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  {expandedIndex === index && (
                    <div className="bg-[#3b2772] text-white p-4 text-sm">
                      <p><b>Keluhan:</b> {visit.keluhan}</p>
                      <p><b>Tensi:</b> {visit.tensi} mmHg</p>
                      <p><b>Suhu:</b> {visit.suhu} °C</p>
                      <p><b>Nadi:</b> {visit.nadi} kali/menit</p>
                      <p><b>Respirasi:</b> {visit.respirasi} kali/menit</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "catat" && (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">TANGGAL PEMERIKSAAN :</label>
                <input
                  className="col-span-3 border p-2"
                  type="date"
                  value={tanggalPemeriksaan}
                  onChange={(e) => setTanggalPemeriksaan(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-5 items-start gap-2">
                <label className="col-span-2">KELUHAN :</label>
                <textarea
                  className="col-span-3 border p-2 h-24"
                  value={keluhan}
                  onChange={(e) => setKeluhan(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">TENSI :</label>
                <input
                  className="col-span-1 border p-2"
                  value={tensiAtas}
                  onChange={(e) => setTensiAtas(e.target.value)}
                />
                /
                <input
                  className="col-span-1 border p-2"
                  value={tensiBawah}
                  onChange={(e) => setTensiBawah(e.target.value)}
                />{" "}
                mmHg
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">TEMPERATUR :</label>
                <input
                  className="col-span-1 border p-2"
                  value={suhu}
                  onChange={(e) => setSuhu(e.target.value)}
                />{" "}
                °C
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">NADI :</label>
                <input
                  className="col-span-1 border p-2"
                  value={nadi}
                  onChange={(e) => setNadi(e.target.value)}
                />{" "}
                kali/menit
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">RESPIRASI :</label>
                <input
                  className="col-span-1 border p-2"
                  value={respirasi}
                  onChange={(e) => setRespirasi(e.target.value)}
                />{" "}
                kali/menit
              </div>
              <button
                type="submit"
                className="bg-gray-300 w-full py-2 text-center font-semibold text-[#3b2772] mt-4"
              >
                SUBMIT
              </button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default RekamMedisPage
