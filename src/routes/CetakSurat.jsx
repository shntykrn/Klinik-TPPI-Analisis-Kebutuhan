import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CetakSurat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/surat-sakit/${id}`);
        const data = await res.json();
        setSurat(data);
        setLoading(false);

        setTimeout(() => {
          window.print();
          setTimeout(() => navigate('/surat-sakit'), 500);
        }, 500);
      } catch (err) {
        console.error('Gagal mengambil data surat:', err);
        alert('Gagal mengambil surat untuk dicetak.');
        navigate('/lihat-surat');
      }
    };

    fetchSurat();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-semibold">Menyiapkan surat untuk dicetak...</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-serif w-[21cm] h-[29.7cm] mx-auto p-16 print:p-16 print:m-0 print:shadow-none print:bg-white print:text-black">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold">PT. Contoh Sejahtera</h2>
        <p className="text-sm">Jl. Mawar No. 123, Surabaya</p>
      </div>

      <h1 className="text-center font-bold underline mb-4">SURAT KETERANGAN SAKIT</h1>
      <p className="text-center mb-6">Nomor: .../SKS/2025</p>

      <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan bahwa:</p>

      <div className="ml-4 space-y-2 mb-6 text-[15px]">
        <div className="flex">
          <div className="w-36">Nama</div>
          <div>: {surat.nama}</div>
        </div>
        <div className="flex">
          <div className="w-36">NIK</div>
          <div>: {surat.id_pasien}</div>
        </div>
        <div className="flex">
          <div className="w-36">Departemen</div>
          <div>: {surat.departemen}</div>
        </div>
        <div className="flex">
          <div className="w-36">Jenis Izin</div>
          <div>: {surat.jenis_izin}</div>
        </div>
      </div>

      <p className="mb-4">
        Telah diberikan izin sakit dari tanggal {surat.tanggal_mulai} sampai {surat.tanggal_selesai}.
      </p>

      <p className="mb-10">
        Demikian surat ini dibuat untuk digunakan sebagaimana mestinya.
      </p>

      <div className="text-right space-y-20">
        <p>Surabaya, {new Date().toLocaleDateString('id-ID')}</p>
        <p className="border-t border-black w-56 text-center ml-auto">Petugas HRD / Dokter</p>
      </div>
    </div>
  );
};

export default CetakSurat;
