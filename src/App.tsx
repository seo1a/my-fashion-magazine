import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Street from './pages/Street'
import StreetBrand from './pages/StreetBrand';
import './App.css'
import './index.css';

function App() {
  
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/street" element={<Street />} />
        <Route path="/street/brand" element={<StreetBrand />} />
        <Route path="/component2" element={<div>Items Content</div>} />
        <Route path="/component3" element={<div>Snap Content</div>} />
      </Routes>
    </Router>
  )
}

export default App
