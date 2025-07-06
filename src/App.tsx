import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Street from './pages/Street'
import './App.css'

function App() {
  
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/street" element={<Street />} />
          <Route path="/component1" element={<div>Brands Content</div>} />
          <Route path="/component2" element={<div>Items Content</div>} />
          <Route path="/component3" element={<div>Snap Content</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
