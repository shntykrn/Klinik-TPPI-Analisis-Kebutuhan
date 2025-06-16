import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Printer, Eye } from 'lucide-react';

const LihatSurat = () => {
  const [daftarSurat, setDaftarSurat] = useState([]);
  const [kataKunci, setKataKunci] = useState('');
  const [suratDipilih, setSuratDipilih] = useState(null);
  const pindahHalaman = useNavigate();

  useEffect(() => {
    const ambilData = async () => {
      try {
        const respon = await fetch('http://localhost:5000/api/surat-sakit');
        const data = await respon.json();
        setDaftarSurat(data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    ambilData();
  }, []);

  const formatTanggal = (tanggal) =>
    new Date(tanggal).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

  const hasilFilter = daftarSurat.filter((surat) =>
    surat.nama?.toLowerCase().includes(kataKunci.toLowerCase()) ||
    surat.nik?.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lihat Surat Izin</h1>
      </div>

      {/* Surat cards */}
      <div className="grid gap-6">
        {hasilFilter.map((surat) => (
          <div key={surat.id} className="bg-white shadow-lg rounded p-6 border relative">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">PT. Contoh Sejahtera</h2>
              <p>Jl. Mawar No. 123, Surabaya</p>
              <hr className="my-2 border-black" />
              <h3 className="text-lg font-semibold underline">SURAT KETERANGAN SAKIT</h3>
              <p>Nomor: {surat.nomor_surat || '.../SKS/2025'}</p>
            </div>
            <div className="leading-7 text-sm sm:text-base">
              <p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
              <div className="ml-4 mt-2">
                <p><strong>Nama:</strong> {surat.nama}</p>
                <p><strong>NIK:</strong> {surat.nik}</p>
                <p><strong>Departemen:</strong> {surat.departemen}</p>
                <p><strong>Jenis Izin:</strong> {surat.jenis_izin}</p>
              </div>
              <p className="mt-4">
                Telah diberikan izin sakit dari tanggal{' '}
                <strong>{formatTanggal(surat.tanggal_mulai)}</strong> sampai{' '}
                <strong>{formatTanggal(surat.tanggal_selesai)}</strong>.
              </p>
              <p className="mt-4">Demikian surat ini dibuat untuk digunakan sebagaimana mestinya.</p>
            </div>
            <div className="text-right mt-8">
              <p>Surabaya, {formatTanggal(surat.dibuat_pada || new Date())}</p>
              <p className="mt-12">_________________________</p>
              <p className="italic text-sm">Petugas HRD / Dokter</p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setSuratDipilih(surat)}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Eye size={16} /> Detail
              </button>
              <button
                onClick={() => pindahHalaman(`/unduh-surat/${surat.id}`)}
                className="text-green-600 hover:underline flex items-center gap-1"
              >
                <Download size={16} /> Unduh
              </button>
              <button
                onClick={() => pindahHalaman(`/cetak-surat/${surat.id}`)}
                className="text-gray-600 hover:underline flex items-center gap-1"
              >
                <Printer size={16} /> Cetak
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {suratDipilih && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50"
          onClick={() => setSuratDipilih(null)}
        >
          <div
            className="bg-white p-6 w-full max-w-2xl rounded shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSuratDipilih(null)}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-lg font-bold"
            >
              ×
            </button>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">PT. Contoh Sejahtera</h2>
              <p>Jl. Mawar No. 123, Surabaya</p>
              <hr className="my-2 border-black" />
              <h3 className="text-lg font-semibold underline">SURAT KETERANGAN SAKIT</h3>
              <p>Nomor: {suratDipilih.nomor_surat || '.../SKS/2025'}</p>
            </div>
            <div className="leading-7">
              <p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
              <div className="ml-4 mt-2">
                <p><strong>Nama:</strong> {suratDipilih.nama}</p>
                <p><strong>NIK:</strong> {suratDipilih.nik}</p>
                <p><strong>Departemen:</strong> {suratDipilih.departemen}</p>
                <p><strong>Jenis Izin:</strong> {suratDipilih.jenis_izin}</p>
              </div>
              <p className="mt-4">
                Telah diberikan izin sakit dari tanggal{' '}
                <strong>{formatTanggal(suratDipilih.tanggal_mulai)}</strong> sampai{' '}
                <strong>{formatTanggal(suratDipilih.tanggal_selesai)}</strong>.
              </p>
              <p className="mt-4">Demikian surat ini dibuat untuk digunakan sebagaimana mestinya.</p>
            </div>
            <div className="text-right mt-8">
              <p>Surabaya, {formatTanggal(suratDipilih.dibuat_pada || new Date())}</p>
              <p className="mt-12">_________________________</p>
              <p className="italic text-sm">Petugas HRD / Dokter</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LihatSurat;
