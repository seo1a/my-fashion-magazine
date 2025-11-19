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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);

  // 🔧 끝을 살짝 더 보여주기 위한 패딩(px)
  const END_PAD = 100;
  const navigatedRef = useRef(false);

  // 모바일/데스크톱 감지
  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);

      // 모바일/PC 전환 시 track 위치 초기화
      if (trackRef.current && wasMobile !== nowMobile) {
        if (nowMobile) {
          // PC -> 모바일: transform 제거하고 scrollLeft로 전환
          gsap.set(trackRef.current, { x: 0 });
          trackRef.current.scrollLeft = 0;
        } else {
          // 모바일 -> PC: scrollLeft 초기화
          if (trackRef.current) {
            trackRef.current.scrollLeft = 0;
          }
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

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

    if (isMobile) {
      // 모바일: track을 직접 스크롤
      const brandLeft = brand.offsetLeft;
      track.scrollTo({
        left: brandLeft,
        behavior: 'smooth'
      });
    } else {
      // PC: 세로 스크롤로 제어
      const marginLeft = 0;
      const scrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth - marginLeft;

      const scrollLength = scrollWidth - viewportWidth;
      const totalScrollLength = scrollLength + END_PAD;

      const brandLeft = brand.offsetLeft - marginLeft;
      const ratio = Math.max(0, Math.min(1, brandLeft / scrollLength));
      const targetScrollTop = ratio * totalScrollLength;

      window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }
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

  // 모바일: 터치 스와이프 처리
  useEffect(() => {
    if (!isMobile || !trackRef.current || brandData.length === 0) return;

    const track = trackRef.current;
    let scrollPosition = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      scrollPosition = track.scrollLeft;
      isScrolling.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const diffX = touchStartX.current - touchX;
      const diffY = touchStartY.current - touchY;

      // 가로 스와이프인지 확인 (가로 이동이 세로 이동보다 클 때)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        isScrolling.current = true;
        e.preventDefault(); // 세로 스크롤 방지
        track.scrollLeft = scrollPosition + diffX;
      }
    };

    const handleTouchEnd = () => {
      touchStartX.current = 0;
      touchStartY.current = 0;
    };

    // 끝에 도달했는지 확인
    const checkEnd = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 50 && !navigatedRef.current) {
        navigatedRef.current = true;
        setTimeout(() => {
          navigate("/street/item");
        }, 500);
      }
    };

    track.addEventListener('touchstart', handleTouchStart, { passive: false });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd);
    track.addEventListener('scroll', checkEnd);

    return () => {
      track.removeEventListener('touchstart', handleTouchStart);
      track.removeEventListener('touchmove', handleTouchMove);
      track.removeEventListener('touchend', handleTouchEnd);
      track.removeEventListener('scroll', checkEnd);
    };
  }, [isMobile, brandData, navigate]);

  // PC: ScrollTrigger 설정
  useLayoutEffect(() => {
    if (isMobile) return; // 모바일에서는 ScrollTrigger 사용 안 함

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

    const tween = gsap.to(track, {
      x: -scrollLength,
      ease: "none",
    });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      animation: tween,
      start: "top top",
      end: `+=${scrollLength + END_PAD}`,
      scrub: 0.5,
      pin: true,
      anticipatePin: 1,
      markers: true,

      onUpdate: (self) => {
        if (!navigatedRef.current && self.direction === 1 && self.progress > 0.98) {
          navigatedRef.current = true;
          navigate("/street/item");
        }
      },

      onEnterBack: () => {
        navigatedRef.current = false;
      },
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

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
  }, [navigate, brandData, isMobile]);

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
        style={{ height: 'calc(100vh - 64px)' }}
      >
        <div 
          ref={trackRef} 
          className={`flex h-full w-[2150vw] gallery-track ${
            isMobile ? 'overflow-x-auto overflow-y-hidden snap-x snap-mandatory' : ''
          }`}
          style={isMobile ? { 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          } : {}}
        >
          {brandData.map((brand, brandIndex) => (
            <div 
              key={brandIndex} 
              className={`flex mr-8 sm:mr-16 md:mr-32 lg:mr-52 ${
                isMobile ? 'snap-start flex-shrink-0' : ''
              }`}
            >
              <div
                className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] flex flex-col items-center justify-center font-noto_sans mx-12 sm:mx-12 md:mx-16 lg:mx-28"
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
                  className={`w-[300px] sm:w-[300px] md:w-[400px] lg:w-[580px] h-auto mx-12 sm:mx-12 md:mx-16 lg:mx-32 flex items-center justify-center overflow-hidden cursor-pointer ${
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
