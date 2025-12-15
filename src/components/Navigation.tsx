import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import menuImg from '../assets/menu.png'

export default function Navigation() {
  const location = useLocation(); // 현재 URL 경로 가져오기
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/street/brand", label: "Brands" },
    { path: "/street/item", label: "Items" },
    { path: "/street/snap", label: "Snap" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 sm:px-8 md:px-16 lg:px-32 xl:px-56 py-4 sm:py-4 md:py-6 font-noto_sans text-myGreen">
        <Link to="/" className="cursor-pointer" onClick={closeMenu}>
          <span className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-aftermath tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.35em]">
            STRXXT
          </span>
        </Link>
        
        {/* PC: 기존 메뉴 (sm 이상에서만 표시) */}
        <div className="hidden sm:flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-xs sm:text-sm md:text-base lg:text-lg font-poppins_black transition-colors ${
                isActive(path)
                  ? "text-white border-b-2 border-myGreen pb-1"
                  : "hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* 모바일: 메뉴 버튼 (sm 미만에서만 표시) */}
        <button
          onClick={toggleMenu}
          className="sm:hidden flex flex-col justify-center items-center 
          w-8 h-8 mt-1 space-y-1.5 focus:outline-none relative z-50"
          aria-label="메뉴 열기/닫기"
        >
          <img src={menuImg} alt="메뉴" />
        </button>
      </div>

      {/* 모바일: 슬라이드 메뉴 (sm 미만에서만 표시) */}
      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 
          bg-black/50 backdrop-blur-sm border-l border-white/10 transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-20 px-6">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className={`py-4 text-base font-poppins_black transition-colors border-b border-white/10 ${
                isActive(path)
                  ? "text-white border-l-4 border-l-myGreen pl-4"
                  : "text-myGreen hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* 모바일: 메뉴 오버레이 (메뉴 열렸을 때 배경 어둡게) */}
      {isMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/80 z-30"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
}