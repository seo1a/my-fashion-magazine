import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import BrandNavigation from "../components/BrandNavigation";

gsap.registerPlugin(ScrollTrigger);

interface Media {
  type: "image" | "video";
  url: string;
}
interface Brand {
  logo: string;
  images: Media[];
  description: string;
  name: string;
}

export default function StreetBrand() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const brandRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [brandData, setBrandData] = useState<Brand[]>([]);
  const navigate = useNavigate();

  // 🔧 끝을 살짝 더 보여주기 위한 패딩(px)
  const END_PAD = 100;
  const navigatedRef = useRef(false);

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((data) => {
        const brands = data.스트릿.브랜드;
        const extract = (name: string) => {
          const b = brands[name];
          return {
            logo: b.공식로고이미지링크,
            images: b.브랜드컨셉사진링크,
            description: b.브랜드설명,
            name,
          };
        };
        setBrandData([
          extract("Supreme"),
          extract("Bape"),
          extract("Carhartt"),
          extract("Stussy"),
          extract("Nike"),
          extract("Adidas"),
        ]);
      })
      .catch((e) => console.error("Failed to load JSON data:", e));
  }, []);

  // ▶ 네비 버튼 클릭 시: 트랙 내 해당 브랜드 위치로 스크롤 이동
  const scrollToBrand = (index: number) => {
    const track = trackRef.current;
    const brand = brandRefs.current[index];
    if (!track || !brand) {
      console.warn("scrollToBrand 실패:", { track: !!track, brand: !!brand, index });
      return;
    }

    const marginLeft = 0;
    const scrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth - marginLeft;

    const scrollLength = scrollWidth - viewportWidth;          // 가로 실제 이동 길이
    const totalScrollLength = scrollLength + END_PAD;          // 세로 스크롤 길이(패드 포함)

    const brandLeft = brand.offsetLeft - marginLeft;           // 왼쪽 기준선 보정
    const ratio = Math.max(0, Math.min(1, brandLeft / scrollLength));
    const targetScrollTop = ratio * totalScrollLength;

    console.log("scrollToBrand 실행:", { index, brandLeft, ratio, targetScrollTop });
    window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  // 이미지 hover 효과 설정
  useEffect(() => {
    if (brandData.length === 0) return;

    const ctx = gsap.context(() => {
      brandData.forEach((brand, brandIndex) => {
        brand.images.forEach((media, imageIndex) => {
          const element = document.getElementById(`brand-image-${brandIndex}-${imageIndex}`);
          if (!element) return;

          const mediaElement = element.querySelector('img, video');
          if (!mediaElement) return;

          // mouseenter: 이미지 확대
          element.addEventListener('mouseenter', () => {
            gsap.to(mediaElement, {
              scale: 1.3,
              duration: 0.6,
              ease: 'power2.out',
            });
          });

          // mouseleave: 이미지 원래 크기로
          element.addEventListener('mouseleave', () => {
            gsap.to(mediaElement, {
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            });
          });
        });
      });
    });

    return () => ctx.revert();
  }, [brandData]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || brandData.length === 0) return;

    // 기존 ScrollTrigger 정리
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars?.trigger === wrapper) {
        trigger.kill();
      }
    });

    const marginLeft = 0;
    const scrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth - marginLeft;
    const scrollLength = scrollWidth - viewportWidth;

    // 디버깅: 값 확인
    console.log("ScrollTrigger 초기화:", { scrollWidth, viewportWidth, scrollLength });

    const tween = gsap.to(track, {
      x: -scrollLength,
      ease: "none",
    });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      animation: tween,
      start: "top top",
      end: `+=${scrollLength + END_PAD}`, // 패딩 포함
      scrub: 0.5,
      pin: true,
      anticipatePin: 1,
      markers: true, // true로 유지하되 CSS로 숨김

      // ✅ onLeave 대신: 끝에 도달(prog≈1) & 앞으로 스크롤일 때 한 번만 이동
      onUpdate: (self) => {
        if (!navigatedRef.current && self.direction === 1 && self.progress > 0.98) {
          navigatedRef.current = true;
          navigate("/street/item");
        }
      },

      // 뒤로 당겼을 땐 다시 활성화 (필요 시)
      onEnterBack: () => {
        navigatedRef.current = false;
      },
    });

    // ScrollTrigger가 제대로 작동하는지 확인
    console.log("ScrollTrigger 상태:", {
      isActive: st.isActive,
      start: st.start,
      end: st.end,
      progress: st.progress,
      direction: st.direction,
      animation: st.animation
    });

    // 약간의 지연 후 refresh (레이아웃 안정화 대기)
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      console.log("ScrollTrigger refresh 후:", {
        isActive: st.isActive,
        progress: st.progress,
        animation: st.animation?.progress()
      });
    }, 100);

    // 리사이즈 시에도 길이 재계산(옵션)
    const onResize = () => {
      st.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", onResize);
      st.kill();
      tween.kill();
    };
  }, [navigate, brandData]);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      <Navigation />
      <BrandNavigation
        brands={brandData.map((b) => b.name)}
        scrollToBrand={scrollToBrand}
      />
      <section
        ref={wrapperRef}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: 'calc(100vh - 64px)' }} // 모바일 네비게이션 높이
      >
        <div ref={trackRef} className="flex h-full w-[2150vw] gallery-track">
          {brandData.map((brand, brandIndex) => (
            <div key={brandIndex} className="flex mr-8 sm:mr-16 md:mr-32 lg:mr-52">
              <div
                className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] flex flex-col items-center justify-center font-noto_sans mx-4 sm:mx-8 md:mx-16 lg:mx-28"
                ref={(el) => {
                  brandRefs.current[brandIndex] = el
                }}
              >
                <div className="text-center text-gray-800 p-2 sm:p-4 bg-black">
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      className="pt-4 sm:pt-6 md:pt-10 mb-2 sm:mb-4 w-[100px] sm:w-[150px] md:w-[200px] h-auto mx-auto"
                    />
                  )}
                  <p className="text-xs sm:text-sm md:text-base text-white pt-4 sm:pt-6 md:pt-8 px-4 sm:px-8 md:px-12 lg:px-16 pb-6 sm:pb-8 md:pb-12 z-10">
                    {brand.description}
                  </p>
                </div>
              </div>
              {brand.images.map((media, index) => (
                <div
                  key={`${brandIndex}-${index}`}
                  id={`brand-image-${brandIndex}-${index}`}
                  className={`w-[200px] sm:w-[300px] md:w-[400px] lg:w-[580px] h-auto mx-4 sm:mx-8 md:mx-16 lg:mx-32 flex items-center justify-center overflow-hidden cursor-pointer ${
                    index % 2 === 0 ? "self-start" : "self-end"
                  }`}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`Brand ${brandIndex} Image ${index}`}
                      className="w-full h-auto object-cover transition-transform duration-300"
                      onError={(e) => {
                        console.warn("이미지 로딩 실패:", media.url);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      src={media.url}
                      controls
                      className="w-full h-auto object-cover transition-transform duration-300"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
