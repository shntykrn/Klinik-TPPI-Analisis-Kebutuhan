import React from 'react';
import ReactDom from 'react-dom/client';
import bgImage from './assets/bg-tppi.png';
import logoImage from './assets/logo-tppi.png';
import LandingRegister from './src/routes/LandingRegister.lazy';
import StockObatPage from './src/routes/StokObatPage.lazy';
import RekamMedisPage from './src/routes/RekamMedisPage.lazy';
import SuratSakitPage from './src/routes/SuratSakitPage.lazy';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LandingRegister />
    <StockObatPage />
    <RekamMedisPage />
    <SuratSakitPage />
  </React.StrictMode>
);