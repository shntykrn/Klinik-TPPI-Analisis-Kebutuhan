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
        navigate('/surat-sakit');
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
    <div className="p-10 bg-white text-black print:w-full print:h-full print:bg-white print:text-black print:p-0">
      <div className="max-w-2xl mx-auto border border-black p-6 print:border-none">
        <h1 className="text-2xl font-bold text-center mb-6">Surat Keterangan Sakit</h1>
        <div className="space-y-3 text-lg leading-relaxed">
          <p><strong>ID Pasien:</strong> {surat.id_pasien}</p>
          <p><strong>Departemen:</strong> {surat.departemen}</p>
          <p><strong>Jenis Izin:</strong> {surat.jenis_izin}</p>
          <p><strong>Tanggal:</strong> {surat.tanggal_mulai} s.d. {surat.tanggal_selesai}</p>
          <p><strong>Alasan:</strong> {surat.alasan}</p>
          {surat.gambar_url && (
            <div className="mt-4">
              <p><strong>Lampiran:</strong></p>
              <img src={surat.gambar_url} alt="Lampiran Surat" className="max-w-xs mt-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CetakSurat;
