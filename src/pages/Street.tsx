import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '../components/Navigation';
import streetImg1 from "../assets/street_img1.png";

export default function Street() {
  const brands = [
    'Supreme', 'Nike', 'Adidas', 'Off-White', 'Bape', 'Carhartt', 'Stussy',
  ] as const;

  const brandRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = brandRowRef.current;
    if (!row) return;

    const totalWidth = row.scrollWidth;
    gsap.to(row, {
      x: () => -totalWidth + window.innerWidth,
      ease: 'linear',
      duration: 40,
      repeat: -1,
      onRepeat: () => {
        gsap.set(row, { x: 0 });
      },
    });
  }, []);

  const renderBrandRow = () => (
    <div className="flex space-x-8 px-2">
      {brands.map((brand, i) => (
        <span
          key={i}
          className="text-4xl font-bold text-black text-center whitespace-nowrap border border-black w-[350px] h-[200px] py-20 bg-white cursor-pointer"
        >
          {brand}
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-gray-100 flex">
      <Navigation />

      <div className="w-[30%] flex flex-col items-center justify-center font-noto_sans">
        <div className="text-center text-gray-800 p-4 bg-white rounded-lg ml-28">
          <h2 className="text-3xl font-bold pt-10 mb-4">스트릿 패션</h2>
          <p className="text-base pt-8 pb-12">
            스트릿 문화가 형성되는 ‘스트릿(Street)’은 아직 사회적으로 소속감을 가지지 못한 청소년이나 젊은 사람들이 정체성과 욕구를 실현하는 공간을 의미하며, 스트릿 패션에는 이들의 라이프 스타일이 담겨져 있다. MZ 세대가 리드하는 영컬쳐(Young Culture)의 영향으로 스트릿 패션은 그들의 개성과 가치관 그리고 니즈를 대변하며 문화 코드가 되고 있다. MZ 세대는 패션 브랜드가 주도하는 상업적이고 획일적인 유행 스타일을 거부하고, 개인의 개성과 자아를 담아 일상의 요소들을 혼합하여 형식 없이 하는 감각을 가지고 있다. 이들이 표현하는 스트릿 패션은 보는 이에게 새롭고 낯설지만 흥미를 유발하며 하이패션(High Fashion)의 신선한 디자인 영감이 되고 있다. 이러한 현대 스트릿 패션은 하이패션이 되어 젊은 세대의 이색적인 라이프 스타일 문화로 이슈가 되고, 명품 브랜드의 패션 디자인 콘셉트로서 그 영향력과 영역을 확장해 나아가고 있다.
          </p>
        </div>
      </div>

      {/* 브랜드 슬라이더와 배경 이미지 추가 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* 배경 이미지 - 오른쪽 1/3에 위치, 아래로 조정 */}
        <div
            className="absolute right-20 top-1/6 w-[40%] h-full z-0"
            style={{
                backgroundImage: `url(${streetImg1})`,
                backgroundSize: 'cover',               // ✅ cover 사용
                backgroundPosition: 'top center',      // ✅ 상체 중심
                backgroundRepeat: 'no-repeat',
                opacity: 0.7,
            }}
        />
        {/* 브랜드 슬라이더 */}
        <div
          className="absolute top-[-2%] left-0 w-full h-full"
        >
          <div
            className="absolute left-0 bottom-0 w-[120%] h-[200px] overflow-hidden"
            style={{ transform: 'rotate(-25deg)' }}
          >
            <div
              className="flex w-max"
              ref={brandRowRef}
            >
              {renderBrandRow()}
              {renderBrandRow()}
              {renderBrandRow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}