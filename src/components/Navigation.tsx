import { Link } from 'react-router-dom';

export default function Navigation () {
  return (
    <div className="w-[150px] h-full bg-gray-300 flex flex-col items-center justify-center p-4">
      <Link to="/" className="w-3/4 bg-white text-center border border-black py-4 mb-2 hover:bg-gray-600 cursor-pointer block"
      style={{ cursor: 'pointer !important' }}>
        Home
      </Link>
      <Link to="/component1" className="w-3/4 bg-white text-center border border-black py-4 mb-2 hover:bg-gray-600 cursor-pointer"
      style={{ cursor: 'pointer !important' }}>
        Brands
      </Link>
      <Link to="/component2" className="w-3/4 bg-white text-center border border-black py-4 mb-2 hover:bg-gray-600 cursor-pointer block">
        Items
      </Link>
      <Link to="/component3" className="w-3/4 bg-white text-center border border-black py-4 hover:bg-gray-600 cursor-pointer block">
        Snap
      </Link>
    </div>
  );
};
