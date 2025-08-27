import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation(); // 현재 URL 경로 가져오기

  // 현재 경로와 Link의 to 경로를 비교해 활성화 여부 결정
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 w-[150px] h-full z-50 bg-gray-600 flex flex-col items-center justify-center p-4 font-noto_sans">
      <Link
        to="/"
        className={`w-3/4 bg-white text-center border border-black py-4 mb-2 cursor-pointer block ${
          isActive('/') ? 'bg-gray-400' : 'hover:bg-gray-400'
        }`}
      >
        Home
      </Link>
      <Link
        to="/street"
        className={`w-3/4 bg-white text-center border border-black py-4 mb-2 cursor-pointer block ${
          isActive('/street') ? 'bg-gray-400' : 'hover:bg-gray-400'
        }`}
      >
        Style
      </Link>
      <Link
        to="/street/brand"
        className={`w-3/4 bg-white text-center border border-black py-4 mb-2 cursor-pointer block ${
          isActive('/street/brand') ? 'bg-gray-400' : 'hover:bg-gray-400'
        }`}
      >
        Brands
      </Link>
      <Link
        to="/street/item"
        className={`w-3/4 bg-white text-center border border-black py-4 mb-2 cursor-pointer block ${
          isActive('/street/item') ? 'bg-gray-400' : 'hover:bg-gray-400'
        }`}
      >
        Items
      </Link>
      <Link
        to="/street/snap"
        className={`w-3/4 bg-white text-center border border-black py-4 mb-2 cursor-pointer block ${
          isActive('/street/snap') ? 'bg-gray-400' : 'hover:bg-gray-400'
        }`}
      >
        Snap
      </Link>
    </div>
  );
}