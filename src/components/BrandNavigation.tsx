import { type FC, useState, useEffect, useRef } from "react";
import brandNavImg2 from "../assets/brandNav2.png";
import gsap from "gsap";
import ReactGA from "react-ga4";

interface BrandNavigationProps {
  brands: string[];
  scrollToBrand: (index: number) => void;
}

const BrandNavigation: FC<BrandNavigationProps> = ({ brands, scrollToBrand }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 6개 버튼 생성, 브랜드 데이터가 없으면 빈 버튼 표시
  const brandNames = [
    ...brands,
    ...Array(6 - brands.length).fill("Placeholder"),
  ].slice(0, 6);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 슬라이딩 애니메이션
  useEffect(() => {
    if (!isMobile || !menuRef.current) return;

    if (isMenuOpen) {
      gsap.fromTo(menuRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isMenuOpen, isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBrandClick = (index: number) => {
    ReactGA.event("brand_nav_click", {
      brand_index: index,
      brand_name: brandNames[index],
      device: "mobile",
    });
    
    scrollToBrand(index);
    // 이동 완료 후 메뉴 닫기
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 500);
  };

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* PC: 기존 메뉴 (sm 이상에서만 표시) */}
      <div className="hidden sm:flex fixed top-16 sm:top-20 md:top-24 right-2 sm:right-4 md:right-8 space-x-1 sm:space-x-2 md:space-x-4 z-20">
        {brandNames.map((name, index) => (
          <button
            key={index}
            onClick={() => {
              ReactGA.event("brand_nav_click", {
                brand_index: index,
                brand_name: brandNames[index],
                device: "pc",
              });
              scrollToBrand(index)
            }}
            disabled={name === "Placeholder"}
            className={`w-4 h-6 sm:w-5 sm:h-7 md:w-6 md:h-8 flex items-center justify-center
              text-myGreen text-sm sm:text-base md:text-xl lg:text-2xl font-poppins_black
              transition-all duration-300
              ${
                name === "Placeholder"
                  ? "opacity-40 cursor-default"
                  : "hover:text-white"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* 모바일: 좌측 하단 고정 메뉴 */}
      {isMobile && (
        <>
          {/* 오버레이 (메뉴 열렸을 때 배경 클릭 시 닫기) */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/20 z-30 sm:hidden"
              onClick={handleOverlayClick}
            />
          )}

          {/* 메인 버튼 (brandNavImg2) */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="sm:hidden fixed bottom-6 left-6 z-40 w-10 h-10 flex items-center justify-center"
          >
            <img src={brandNavImg2} alt="브랜드 메뉴" className="w-[full] h-full object-contain" />
          </button>

          {/* 슬라이딩 메뉴 (브랜드 버튼들) */}
          <div
            ref={menuRef}
            className={`sm:hidden fixed bottom-20 left-4 z-40 flex flex-col space-y-2 ${
              isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{ opacity: isMenuOpen ? 1 : 0 }}
          >
            {brandNames.map((name, index) => (
              <button
                key={index}
                onClick={() => handleBrandClick(index)}
                disabled={name === "Placeholder"}
                className={`w-10 h-10 flex items-center justify-center
                  text-myGreen text-lg font-poppins_black
                  transition-all duration-300
                  ${
                    name === "Placeholder"
                      ? "opacity-40 cursor-default"
                      : "hover:text-white active:scale-95"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default BrandNavigation;