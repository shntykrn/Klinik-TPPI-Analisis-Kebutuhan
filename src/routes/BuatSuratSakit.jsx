import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Printer } from 'lucide-react';

const BuatSuratSakit = () => {
  const [dataFormulir, aturDataFormulir] = useState({
    id_pasien: '',
    nama: '',
    nik: '',
    departemen: '',
    jenis_izin: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    alasan: '',
  });

  const [fileSurat, setFileSurat] = useState(null);
  const pindahHalaman = useNavigate();

  const ambilDataPasien = async (key) => {
  if (!key) return;
  try {
    const res = await fetch(`http://localhost:5000/api/pasien/${key}`);
    if (!res.ok) return;

    const data = await res.json();
    aturDataFormulir((prev) => ({
      ...prev,
      id_pasien: data.id_pasien,
      nama: data.nama,
      nik: data.nik,
    }));
  } catch (err) {
    console.warn('Gagal ambil data pasien:', err);
  }
};


const saatInputBerubah = (e) => {
  const { name, value } = e.target;
  aturDataFormulir((prev) => ({ ...prev, [name]: value }));

  if ((name === 'id_pasien' || name === 'nik') && value.length >= 3) {
    ambilDataPasien(value);
  }
};


const simpanSurat = async () => {
  try {
    const payload = { ...dataFormulir }; // Jangan hapus alasan ya!

    const respons = await fetch('http://localhost:5000/api/surat-sakit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log("DATA YANG DIKIRIM:", dataFormulir);

    if (!respons.ok) {
      const errorText = await respons.text();
      console.error('RESPON ERROR:', errorText);
      throw new Error('Gagal menyimpan surat');
    }

    const hasil = await respons.json();
    return hasil.id;
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    alert('Gagal menyimpan surat. Silakan periksa koneksi atau server Anda.');
    return null;
  }
};


  const kirimFormulir = async (e) => {
    e.preventDefault();
    const id = await simpanSurat();
    if (id) {
      alert('Surat berhasil dibuat!');
      pindahHalaman(`/lihat-surat/${id}`);
    }
  };

  // const simpanDanCetak = async () => {
  //   const id = await simpanSurat();
  //   if (id) {
  //     alert('Surat berhasil dibuat!');
  //     pindahHalaman(`/cetak-surat/${id}`);
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Buat Surat Izin</h1>

      <form onSubmit={kirimFormulir}>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block mb-1">ID Pasien</label>
            <input
              type="text"
              name="id_pasien"
              value={dataFormulir.id_pasien}
              onChange={saatInputBerubah}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">NIK</label>
            <input
              type="text"
              name="nik"
              value={dataFormulir.nik}
              onChange={saatInputBerubah}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={dataFormulir.nama}
              onChange={saatInputBerubah}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Departemen</label>
              <input
                type="text"
                name="departemen"
                value={dataFormulir.departemen}
                onChange={saatInputBerubah}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Jenis Izin</label>
              <select
                name="jenis_izin"
                value={dataFormulir.jenis_izin}
                onChange={saatInputBerubah}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Pilih Jenis Izin</option>
                <option value="Pulang sebelum waktunya">Pulang sebelum waktunya</option>
                <option value="Datang terlambat">Datang terlambat</option>
                <option value="Keluar lingkungan kantor">Keluar lingkungan kantor</option>
                <option value="Tidak masuk kerja">Tidak masuk kerja</option>
                <option value="Keluar kota pada hari libur">Keluar kota pada hari libur</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Tanggal Mulai</label>
              <input
                type="date"
                name="tanggal_mulai"
                value={dataFormulir.tanggal_mulai}
                onChange={saatInputBerubah}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Tanggal Selesai</label>
              <input
                type="date"
                name="tanggal_selesai"
                value={dataFormulir.tanggal_selesai}
                onChange={saatInputBerubah}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Alasan</label>
            <textarea
              name="alasan"
              value={dataFormulir.alasan}
              onChange={saatInputBerubah}
              required
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          {/* <div>
            <label className="block mb-1">Unggah File Surat</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFileSurat(e.target.files[0])}
              required
              className="w-full p-2 border rounded"
            />
          </div> */}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => pindahHalaman('/lihat-surat')}
            className="px-4 py-2 border rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded"
          >
            <Save className="mr-2" size={16} /> Simpan
          </button>
          {/* <button
            type="button"
            onClick={simpanDanCetak}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded"
          >
            <Printer className="mr-2" size={16} /> Simpan & Cetak
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default BuatSuratSakit;
