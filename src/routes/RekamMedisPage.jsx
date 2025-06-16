import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

const RekamMedisPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("riwayat");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [riwayatPemeriksaan, setRiwayatPemeriksaan] = useState([]);
import { useState } from "react"
import { Search, ChevronDown, ChevronRight } from "lucide-react"

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nik.includes(searchTerm) ||
      p.rekam.includes(searchTerm)
  );

  const fetchRiwayat = async (rekamId) => {
    try {
      const res = await axios.get(`/api/rekam-medis/${rekamId}`);
      setRiwayatPemeriksaan(res.data);
    } catch (err) {
      console.error("Gagal mengambil rekam medis:", err);
      setRiwayatPemeriksaan([]);
    }
  };

  )

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
                <th className="px-4 py-2">No. Rekam Medis</th>
                <th className="px-4 py-2">NIK</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Riwayat Pemeriksaan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{p.rekam}</td>
                  <td className="px-4 py-2">{p.nik}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedPatient(p);
                        fetchRiwayat(p.rekam);
                      }}
                      onClick={() => setSelectedPatient(p)}
                      className="bg-[#cfc3ea] text-xs px-3 py-1 rounded-md"
                    >
                      LIHAT
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
                activeTab === "riwayat" ? "border-[#3b2772] font-semibold" : "border-transparent"
              }`}
              onClick={() => setActiveTab("riwayat")}
            >
              RIWAYAT
            </button>
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "catat" ? "border-[#3b2772] font-semibold" : "border-transparent"
              }`}
              onClick={() => setActiveTab("catat")}
            >
              CATAT
            </button>
          </div>

          {activeTab === "riwayat" && (
            <div className="space-y-2">
              {riwayatPemeriksaan.length === 0 ? (
                <p className="text-center text-gray-600">Belum ada data rekam medis.</p>
              ) : (
                riwayatPemeriksaan.map((visit, index) => (
                  <div key={index}>
                    <button
                      className="w-full flex justify-between items-center bg-gray-300 px-4 py-3"
                      onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
                    >
                      <span>{visit.tanggal}</span>
                      {expandedIndex === index ? <ChevronDown /> : <ChevronRight />}
                    </button>
                    {expandedIndex === index && (
                      <div className="bg-[#3b2772] text-white p-4 text-sm">{visit.keterangan}</div>
                    )}
                  </div>
                ))
              )}
              {sampleVisits.map((visit, index) => (
                <div key={index}>
                  <button
                    className="w-full flex justify-between items-center bg-gray-300 px-4 py-3"
                    onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
                  >
                    <span>{visit.date}</span>
                    {expandedIndex === index ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  {expandedIndex === index && (
                    <div className="bg-[#3b2772] text-white p-4 text-sm">{visit.detail}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "catat" && (
            <form className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">TANGGAL PEMERIKSAAN :</label>
                <input className="col-span-3 border p-2" type="date" />
              </div>
              <div className="grid grid-cols-5 items-start gap-2">
                <label className="col-span-2">KELUHAN :</label>
                <textarea className="col-span-3 border p-2 h-24"></textarea>
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">TENSI :</label>
                <input className="col-span-1 border p-2" />/
                <input className="col-span-1 border p-2" /> mmHg
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">TEMPERATUR :</label>
                <input className="col-span-1 border p-2" /> °C
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">NADI :</label>
                <input className="col-span-1 border p-2" /> kali/menit
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <label className="col-span-2">RESPIRASI :</label>
                <input className="col-span-1 border p-2" /> kali/menit
              </div>
              <button className="bg-gray-300 w-full py-2 text-center font-semibold text-[#3b2772] mt-4">
                SUBMIT
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default RekamMedisPage;
  )
}

export default RekamMedisPage
