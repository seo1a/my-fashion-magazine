import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import data from "../public/data.json"
import Home from './pages/Home'
import Street from './pages/Street'
import StreetBrand from './pages/StreetBrand';
import StreetItem from './pages/StreetItem';
//import Preppy
import './App.css'
import './index.css';

function App() {
  const streetItems = data.스트릿.아이템;
  
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/street" element={<Street />} />
        <Route path="/street/brand" element={<StreetBrand />} />
        <Route path="/street/item" element={<StreetItem items={streetItems}/>}/>
        <Route path="/component3" element={<div>Snap Content</div>} />


      </Routes>
    </Router>
  )
}

export default App
