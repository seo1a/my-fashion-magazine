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
      <div className="mx-auto flex max-w-8xl items-center justify-between px-56 py-6 font-noto_sans text-myGreen">
        <span className="text-3xl font-aftermath tracking-[0.35em]">
          STREET
        </span>
        <div className="flex items-center gap-12">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-lg font-poppins_black transition-colors ${
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