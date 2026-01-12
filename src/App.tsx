import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import data from "../public/data.json"
import Street from './pages/Street';
import StreetBrand from './pages/StreetBrand';
import StreetItem from './pages/StreetItem';
import StreetSnap from './pages/StreetSnap';
import './App.css'
import './index.css';
import ReactGA from "react-ga4";
import PageTracker from './PageTracker';

ReactGA.initialize(import.meta.env.VITE_GA_ID);

function App() {
  const streetItems = data.스트릿.아이템;
  
  return (
    <Router>
      <PageTracker />
      <Routes>
        <Route path="/" element={<Street />} />
        <Route path="/street/brand" element={<StreetBrand />} />
        <Route path="/street/item" element={<StreetItem items={streetItems}/>}/>
        <Route path="/street/snap" element={<StreetSnap />} />
      </Routes>
    </Router>
  )
}

export default App
