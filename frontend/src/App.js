import React from 'react';
import Options from './pages/option'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/app">
    <Routes>
    <Route path="/options" element={<Options />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
