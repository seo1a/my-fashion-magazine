import { Link } from 'react-router-dom';

export default function Navigation () {
  return (
    <div className="fixed top-0 left-0 w-[150px] h-full z-50 bg-gray-800 flex flex-col items-center justify-center p-4 opacity-75">
      <Link 
        to="/" 
        className="w-3/4 bg-white text-center border border-black py-4 mb-2 hover:bg-gray-400 cursor-pointer block"
      >
        Home
      </Link>
      <Link 
        to="/street" 
        className="w-3/4 bg-white text-center border border-black py-4 mb-2 hover:bg-gray-400 cursor-pointer"
      >
        Style
      </Link>
      <Link 
        to="/street/brand" 
        className="w-3/4 bg-white text-center border border-black py-4 mb-2 hover:bg-gray-400 cursor-pointer"
      >
        Brands
      </Link>
      <Link to="/street/item" className="w-3/4 bg-white text-center border border-black py-4 mb-2 hover:bg-gray-400 cursor-pointer block">
        Items
      </Link>
      <Link to="/component3" className="w-3/4 bg-white text-center border border-black py-4 hover:bg-gray-400 cursor-pointer block">
        Snap
      </Link>
    </div>
  );
};
