import React from 'react';
import ReactDom from 'react-dom/client';
import bgImage from './assets/bg-tppi.png';
import logoImage from './assets/logo-tppi.png';
import LandingRegister from './src/routes/LandingRegister.lazy';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LandingRegister />
  </React.StrictMode>
);