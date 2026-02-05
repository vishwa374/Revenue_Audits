import React from 'react';
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelAudit from './components/HotelAudit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelAudit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;