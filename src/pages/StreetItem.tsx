import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import Navigation from '../components/Navigation';
import '../styles/SwiperStyles.css';

// Swiper CSS import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 아이템 옵션 인터페이스 정의
interface ItemOption {
  색상: string;
  모델이미지링크: string;
  상세이미지링크: string[];
}

// 색상 이름을 실제 색상 코드로 매핑하는 객체
const colorMap: Record<string, string> = {
  // 기본 색상
  'white': '#FFFFFF',
  'black': '#000000',
  'gray': '#808080',
  'grey': '#808080',
  'yellow': '#FFD700',
  'navy': '#000080',
  'blue': '#0000FF',
  'pink': '#FFC0CB',
  
  'camo': '#4A4A3A', 
  'Grey Silver Metallic': '#C0C0C0', 
  'flax': '#af7a44',
  
};

// 조합 색상을 두 가지 색상으로 매핑하는 객체
// [왼쪽 색상, 오른쪽 색상] 형태로 정의
const splitColorMap: Record<string, [string, string]> = {
  'white pink': ['#FFFFFF', '#e04c76'],
  'black pink': ['#000000', '#FF69B4'],
  'navy pink': ['#000080', '#FF69B4'],
  'white blue': ['#FFFFFF', '#0066FF'],
  'black blue': ['#000000', '#0066FF'],
};

// 아이템 인터페이스 정의
interface Item {
  제품명: string;
  옵션: ItemOption[];
}

// 컴포넌트 props 인터페이스 정의
interface StreetBrandProps {
  items: Item[];
}

// StreetItem 컴포넌트: Swiper.js를 사용한 스트릿 패션 아이템 슬라이더
export default function StreetItem({ items = [] }: StreetBrandProps) {
  // 아이템 데이터가 없으면 에러 메시지 표시
  if (!items.length) {
    return <div className="text-center text-red-500">아이템 데이터가 없습니다.</div>;
  }

  const [selectedItem, setSelectedItem] = useState<Item>(items[0]);
  const [selectedColor, setSelectedColor] = useState<ItemOption>(items[0].옵션[0]);
  const swiperRef = useRef<any>(null);

  // 색상 변경 핸들러
  const handleColorChange = (option: ItemOption) => {
    setSelectedColor(option);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // 색상 변경 시 첫 슬라이드로 이동
    }
  };

  // selectedColor 변경 시 Swiper 업데이트
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update(); // Swiper를 업데이트하여 새 이미지를 반영
    }
  }, [selectedColor]);

  // GSAP로 페이드 애니메이션 설정
  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;

      // 슬라이드 전환 시작 시 페이드 효과
      swiper.on('slideChangeTransitionStart', () => {
        gsap.to('.swiper-slide', {
          opacity: 0.3,
          duration: 0.8,
          ease: 'power2.inOut',
        });
        gsap.to('.swiper-slide-active', {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        });
      });
    }

    // 컴포넌트 언마운트 시 이벤트 정리
    return () => {
      if (swiperRef.current) {
        swiperRef.current.off('slideChangeTransitionStart');
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black font-noto_sans text-white pt-16 sm:pt-20 md:pt-24">
      <Navigation />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">

        <p className='text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-poppins font-bold mt-2 sm:mt-4 mb-8 sm:mb-12 md:mb-20 tracking-wider'>
          Recommended items for your <span className="text-myGreen text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-aftermath font-light tracking-widest">cool</span> street fashion
        </p>
        {/* 아이템 선택 버튼 */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-2 sm:mt-4 mb-2 sm:mb-4">
          {items.map((item) => (
            <button
              key={item.제품명}
              onClick={() => {
                setSelectedItem(item);
                setSelectedColor(item.옵션[0]);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedItem.제품명 === item.제품명
                  ? 'bg-white text-black'
                  : 'bg-myGreen text-black hover:bg-gray-300'
              }`}
            >
              {item.제품명}
            </button>
          ))}
        </div>

        {/* 아이템 상세: Swiper 슬라이더 */}
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <div className="w-full max-w-4xl">
            <Swiper
              modules={[SwiperNavigation, Pagination]}
              navigation
              pagination={{ 
                clickable: true
              }}
              spaceBetween={20}
              slidesPerView={1}
              speed={800}
              className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] mt-8 sm:mt-12 md:mt-20 swiper-pagination-custom"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {selectedColor.상세이미지링크.map((img, index) => (
                <SwiperSlide key={index} className="transition-opacity duration-300 ease-in-out relative group">
                  <div className="inline-flex overflow-hidden w-full justify-center">
                    <div className="relative flex h-full w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] select-none items-center justify-center bg-transparent">
                      <img
                        src={img}
                        alt={`${selectedItem.제품명} - ${selectedColor.색상} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-myGreen text-center text-sm sm:text-base md:text-lg font-bold">{selectedItem.제품명}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 색상 옵션 버튼 */}
            {selectedItem.옵션.length > 1 && (
              <div className="flex justify-center gap-2 sm:gap-3 mt-2 sm:mt-4">
                {selectedItem.옵션.map((option) => {
                  // 조합 색상인지 확인
                  const splitColors = splitColorMap[option.색상];
                  const isSplitColor = !!splitColors;
                  
                  // 단일 색상인 경우
                  const actualColor = colorMap[option.색상] || option.색상;
                  
                  return (
                    <button
                      key={option.색상}
                      onClick={() => handleColorChange(option)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border transition-all overflow-hidden relative ${
                        selectedColor.색상 === option.색상
                          ? 'border-white scale-110'
                          : 'border-gray-500 hover:border-gray-300'
                      }`}
                      style={
                        isSplitColor
                          ? {
                              background: `linear-gradient(to right, ${splitColors[0]} 0%, ${splitColors[0]} 50%, ${splitColors[1]} 50%, ${splitColors[1]} 100%)`
                            }
                          : { backgroundColor: actualColor }
                      }
                      title={option.색상}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
