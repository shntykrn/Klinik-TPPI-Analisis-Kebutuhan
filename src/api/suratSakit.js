// src/api/suratSakit.js

let suratSakitData = [];

export const addSuratSakit = (data) => {
  const newSurat = {
    ...data,
    id: Date.now(),
    duration: hitungDurasi(data.startDate, data.endDate),
  };
  suratSakitData.push(newSurat);
  return Promise.resolve(newSurat);
};

export const getSuratSakit = () => {
  return Promise.resolve(suratSakitData);
};

const hitungDurasi = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  return duration;
};
