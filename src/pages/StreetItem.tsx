import React, { useState, useEffect, useRef } from 'react';
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
    <div className="w-full min-h-screen bg-black text-black font-noto_sans flex">
      {/* Navigation 컴포넌트: 고정 너비 150px */}
      <Navigation />
      <div className="flex-1 ml-[150px] px-4 py-16">

        {/* 아이템 선택 버튼 */}
        <div className="flex justify-center mb-8">
          {items.map((item) => (
            <button
              key={item.제품명}
              onClick={() => {
                setSelectedItem(item);
                setSelectedColor(item.옵션[0]);
              }}
              className={`mx-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedItem.제품명 === item.제품명
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {item.제품명}
            </button>
          ))}
        </div>

        {/* 아이템 상세: Swiper 슬라이더 */}
        <div className="flex justify-center mb-40">
          <div className="w-full max-w-4xl">
            <Swiper
              modules={[SwiperNavigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              speed={800}
              className="w-full h-[60vh] md:h-[70vh] mobile:w-[60vw]"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {selectedColor.상세이미지링크.map((img, index) => (
                <SwiperSlide key={index} className="transition-opacity duration-300 ease-in-out relative group">
                  <div className="inline-flex overflow-hidden w-full justify-center">
                    <div className="relative flex h-full w-full max-w-[629px] select-none items-center justify-center bg-transparent">
                      <img
                        src={img}
                        alt={`${selectedItem.제품명} - ${selectedColor.색상} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-center text-lg font-bold">{selectedItem.제품명}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 색상 옵션 버튼 (Announcing T-Shirt 전용) */}
            {selectedItem.옵션.length > 1 && (
              <div className="flex justify-center gap-2">
                {selectedItem.옵션.map((option) => (
                  <button
                    key={option.색상}
                    onClick={() => handleColorChange(option)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.색상 === option.색상
                        ? 'border-black'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: option.색상 }}
                    title={option.색상}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
