import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSuratSakit } from '../api/suratSakit';

const BuatSuratSakitPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientName: '',
    medicalRecordNumber: '',
    issueDate: '',
    startDate: '',
    endDate: '',
    diagnosis: '',
    doctor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSurat = addSuratSakit(form);
    if (newSurat) {
      navigate('/surat-sakit');
    } else {
      alert('Gagal menyimpan surat sakit');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Buat Surat Keterangan Sakit</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {[
          { label: 'Nama Pasien', name: 'patientName' },
          { label: 'No. Rekam Medis', name: 'medicalRecordNumber' },
          { label: 'Tanggal Surat', name: 'issueDate', type: 'date' },
          { label: 'Tanggal Mulai', name: 'startDate', type: 'date' },
          { label: 'Tanggal Selesai', name: 'endDate', type: 'date' },
          { label: 'Diagnosis', name: 'diagnosis' },
          { label: 'Nama Dokter', name: 'doctor' },
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9747ff]"
            />
          </div>
        ))}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#9747ff] text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuatSuratSakitPage;
