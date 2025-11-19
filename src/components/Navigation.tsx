import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation(); // 현재 URL 경로 가져오기

  const links = [
    { path: "/", label: "Style" },
    { path: "/street/brand", label: "Brands" },
    { path: "/street/item", label: "Items" },
    { path: "/street/snap", label: "Snap" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56 py-3 sm:py-4 md:py-6 font-noto_sans text-myGreen">
        <Link to="/" className="cursor-pointer">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-aftermath tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.35em]">
            STREET
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12">
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
      </div>
    </nav>
  );
}