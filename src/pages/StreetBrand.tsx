import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import BrandNavigation from "../components/BrandNavigation";
import brandNavImg from "../assets/brandNav.png";
import brandNavImg2 from "../assets/brandNav2.png";
import { useScrollDepth } from "../hooks/useScrollDepth";
import ReactGA from "react-ga4";

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
  /* GA4 */
  useScrollDepth(75);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const brandRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [brandData, setBrandData] = useState<Brand[]>([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const mobileNavigatedRef = useRef(false);

  // 🔧 끝을 살짝 더 보여주기 위한 패딩(px) - 마지막 사진 이후 여유 공간
  const END_PAD = 300; // 마지막 사진이 모두 보이도록 충분한 패딩
  const navigatedRef = useRef(false);

  // 모바일/데스크톱 감지
  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 640;
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

  // 네비 버튼 클릭 시: 트랙 내 해당 브랜드 위치로 스크롤 이동
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
  
  }, [isMobile, brandData, navigate]);

  // PC: ScrollTrigger 설정
  useLayoutEffect(() => {
    if (isMobile) return; // 모바일에서는 ScrollTrigger 사용 안 함

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || brandData.length === 0) return;

    // 🧹 1) wrapper에 남은 inline height 제거
    gsap.set(wrapper, { clearProps: "height" });
  
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
    const totalScrollLength = scrollLength + END_PAD;
    
    // 마지막 사진이 모두 보이고 추가 여백까지 스크롤한 후에만 다음 페이지로 이동
    // END_PAD를 고려하여 progress 임계값 계산
    const threshold = scrollLength / totalScrollLength;

    const tween = gsap.to(track, {
      x: -scrollLength,
      ease: "none",
    });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      animation: tween,
      start: "top top",
      end: `+=${totalScrollLength}`,
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,

      onUpdate: (self) => {
        if (!navigatedRef.current && self.direction === 1 && self.progress >= threshold) {
          navigatedRef.current = true;

          ReactGA.event("auto_page_transition", {
            next_page: "/street/item",
            from: "street/brand",
          });

          navigate("/street/item");
        } else if (self.progress < threshold) {
          navigatedRef.current = false;
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

  // 모바일 스크롤 최하단 감지 -> navigate
  useEffect(() => {
    if (!isMobile || !trackRef.current) return;

    const track = trackRef.current;

    const onScroll = () => {
      const scrollLeft = track.scrollLeft;
      const scrollWidth = track.scrollWidth;
      const clientWidth = track.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      
      // 스크롤이 끝에서 100px 이내에 도달했는지 확인 (더 여유있게)
      const isNearEnd = scrollLeft >= maxScroll - 100;

      if (isNearEnd && !mobileNavigatedRef.current) {
        const currentScrollLeft = track.scrollLeft;
        const currentMaxScroll = track.scrollWidth - track.clientWidth;
        
        if (currentScrollLeft >= currentMaxScroll - 100 && !mobileNavigatedRef.current) {
          mobileNavigatedRef.current = true;

          ReactGA.event("auto_page_transition", {
            from: "street/brand",
            to: "street/item",
            device: "mobile",
          });

          navigate("/street/item");
        }
      }
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      track.removeEventListener("scroll", onScroll);
    };
  }, [isMobile, navigate]);

  return (
    <div className={`relative w-full bg-black text-white ${isMobile ? 'h-screen overflow-hidden' : ''}`}>
      <Navigation />
      <BrandNavigation
        brands={brandData.map((b) => b.name)}
        scrollToBrand={scrollToBrand}
      />
      <section
        ref={wrapperRef}
        className="relative w-full overflow-hidden bg-black h-auto"
        
      >
        <div 
          ref={trackRef} 
          className={`flex h-full gallery-track ${
            isMobile ? 'overflow-x-auto overflow-y-hidden' : ''
          }`}
          style={isMobile ? { 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            scrollSnapType: 'none'
          } : {
            width: 'max-content'
          }}
        >
          {brandData.map((brand, brandIndex) => (
            <div 
              key={brandIndex} 
              className={`flex mr-8 sm:mr-16 md:mr-32 lg:mr-52 ${
                isMobile ? 'flex-shrink-0' : 'h-full'
              }`}
              style={!isMobile ? {
                minHeight: '100%',
                height: '100%'
              } : {}}
            >
              <div
                className={
                  `w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] 
                  flex flex-col items-center font-noto_sans_light 
                  mx-12 sm:mx-12 md:mx-16 lg:mx-28
                  ${isMobile ? 'h-screen justify-center' : 'justify-center'}`
                }
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
                  <p className="text-[10px] sm:text-[10px] md:text-[15px] text-white pt-4 sm:pt-6 md:pt-8 sm:px-2 lg:px-8 pb-6 sm:pb-8 md:pb-12 z-10">
                    {brand.description.split("\n").map((line, lineIdx) => (
                      <span key={lineIdx} className="block mb-1 sm:mb-2">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              {brand.images.map((media, index) => (
                <div
                  key={`${brandIndex}-${index}`}
                  id={`brand-image-${brandIndex}-${index}`}
                  className={`w-[450px] sm:w-[450px] md:w-[550px] lg:w-[580px] h-auto mx-24 sm:mx-24 md:mx-28 lg:mx-32 flex items-center justify-center overflow-hidden cursor-pointer ${
                    index % 2 === 0 ? "self-start pt-10 sm:pt-10 md:pt-20 " : "self-end pt-60"
                  }`}
                >
                  <img
                    src={media.url}
                    alt={`Brand ${brandIndex} Image ${index}`}
                    className="w-full h-auto object-cover transition-transform duration-300"
                    onError={(e) => {
                      console.warn("이미지 로딩 실패:", media.url);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          {/* 마지막 브랜드 이후 추가 여백 - 모바일에서 더 크게 */}
          <div 
            className="flex-shrink-0" 
            style={{
              width: isMobile ? '100vw' : '500px'
            }}
          >
            {/* 페이지 전환 트리거 영역 */}
          </div>
        </div>
      </section>
    </div>
  );
}