
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Options from './pages/option'

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