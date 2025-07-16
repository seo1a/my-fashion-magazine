import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import BrandNavigation from "../components/BrandNavigation";

gsap.registerPlugin(ScrollTrigger);

interface StreetData {
  설명: string;
  공식로고이미지링크: string[];
  브랜드컨셉사진링크: string[];
}

export default function StreetBrand() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const brandRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [brandData, setBrandData] = useState<
    Array<{ logo: string; images: string[]; description: string; name: string }>
  >([]);

  // JSON 데이터 로드
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const brands = data.스트릿.브랜드;
        setBrandData([
          {
            logo: brands.Supreme.공식로고이미지링크,
            images: [...brands.Supreme.브랜드컨셉사진링크],
            description: brands.Supreme.브랜드설명,
            name: "Supreme",
          },
          {
            logo: brands.Bape.공식로고이미지링크,
            images: [...brands.Bape.브랜드컨셉사진링크],
            description: brands.Bape.브랜드설명,
            name: "Bape",
          },
          {
            logo: brands.Carhartt.공식로고이미지링크,
            images: [...brands.Carhartt.브랜드컨셉사진링크],
            description: brands.Carhartt.브랜드설명,
            name: "Carhartt",
          },
          {
            logo: brands.Stussy.공식로고이미지링크,
            images: [...brands.Stussy.브랜드컨셉사진링크],
            description: brands.Stussy.브랜드설명,
            name: "Stussy",
          },
          {
            logo: brands.Nike.공식로고이미지링크,
            images: [...brands.Nike.브랜드컨셉사진링크],
            description: brands.Nike.브랜드설명,
            name: "Nike",
          },
          {
            logo: brands.Adidas.공식로고이미지링크,
            images: [...brands.Adidas.브랜드컨셉사진링크],
            description: brands.Adidas.브랜드설명,
            name: "Adidas",
          },
        ]);
      })
      .catch((error) => {
        console.error("Failed to load JSON data:", error);
      });
  }, []);

  // 브랜드로 스크롤 이동
  const scrollToBrand = (index: number) => {
    const track = trackRef.current;
    const brand = brandRefs.current[index];
    if (!track || !brand) return;

    const offsetLeft = brand.offsetLeft - 7 * 16;
    gsap.to(track, {
      x: -offsetLeft,
      duration: 1,
      ease: "power2.out",
      // ScrollTrigger와 충돌 방지: overwrite로 기존 애니메이션 우선 처리
      overwrite: "auto",
    });
  };

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!wrapper || !track) return;

    // 초기 위치 설정: 첫 이미지(맨 왼쪽)에서 시작
    gsap.set(track, { x: 0 });

    // 애니메이션 및 ScrollTrigger 설정
    const scrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth - 150; // Navigation 너비(150px) 제외
    const scrollLength = scrollWidth - viewportWidth;

    gsap.to(track, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${scrollLength}`,
        scrub: 0.5, // 부드러운 스크롤 감도
        pin: true,
        anticipatePin: 1,
      },
    });

    // 이미지 로딩 후 ScrollTrigger 갱신
    const images = track.querySelectorAll("img");
    const loadImages = () => {
      if (images.length && !images[images.length - 1].complete) {
        images.forEach((img) => {
          if (img.complete) return;
          img.onload = () => ScrollTrigger.refresh();
          img.onerror = () => ScrollTrigger.refresh();
        });
      } else {
        ScrollTrigger.refresh();
      }
    };
    loadImages();

    // 클린업
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Navigation 고정 */}
      <Navigation />
      {/* BrandNavigation 추가 */}
      <BrandNavigation brands={brandData.map((brand) => brand.name)} scrollToBrand={scrollToBrand} />

      <section
        ref={wrapperRef}
        className="relative h-screen w-full ml-[150px] overflow-hidden bg-black"
      >
        <div
          ref={trackRef}
          className="flex h-full w-[2150vw] gallery-track" // 트랙 너비 1500vw
        >
          {brandData.map((brand, brandIndex) => (
            <div key={brandIndex} className="flex mr-52">
              <div
                className="w-[500px] flex flex-col items-center justify-center font-noto_sans mx-28"
                ref={(el) => {
                  brandRefs.current[brandIndex] = el; // 반환값 없음
                }}
              >
                <div className="text-center text-gray-800 p-4 bg-white">
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      className="pt-10 mb-4 w-[200px] h-auto mx-auto"
                    />
                  )}
                  <p className="text-base pt-8 px-16 pb-12 z-10">{brand.description}</p>
                </div>
              </div>
              {brand.images.map((src, index) => (
                <div
                  key={`${brandIndex}-${index}`}
                  className={`w-[580px] h-auto mx-32 flex items-center justify-center ${
                    index % 2 === 0 ? "self-start" : "self-end"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Brand ${brandIndex} Image ${index}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}