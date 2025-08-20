import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const brands = data.스트릿.브랜드;

        const extractBrand = (name: string) => {
          const b = brands[name];
          return {
            logo: b.공식로고이미지링크,
            images: b.브랜드컨셉사진링크,
            description: b.브랜드설명,
            name,
          };
        };

        setBrandData([
          extractBrand("Supreme"),
          extractBrand("Bape"),
          extractBrand("Carhartt"),
          extractBrand("Stussy"),
          extractBrand("Nike"),
          extractBrand("Adidas"),
        ]);
      })
      .catch((error) => {
        console.error("Failed to load JSON data:", error);
      });
  }, []);

  const scrollToBrand = (index: number) => {
    const track = trackRef.current;
    const brand = brandRefs.current[index];
    if (!track || !brand) return;

    const offsetLeft = brand.offsetLeft - 7 * 16;
    const offsetTop = brand.offsetTop;

    gsap.to(track, {
      x: -offsetLeft,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto",
    });

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    ScrollTrigger.refresh();
  };

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!wrapper || !track) return;

    gsap.set(track, { x: 0 });

    const scrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth - 150;
    const scrollLength = scrollWidth - viewportWidth;

    gsap.to(track, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${scrollLength}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        markers: true,
      },
    });

    const mediaElements = track.querySelectorAll("img, video");
    const loadHandler = () => ScrollTrigger.refresh();
    mediaElements.forEach((el) => {
      el.addEventListener("load", loadHandler);
      el.addEventListener("error", loadHandler);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Navigation />
      <BrandNavigation
        brands={brandData.map((brand) => brand.name)}
        scrollToBrand={scrollToBrand}
      />
      <section
        ref={wrapperRef}
        className="relative h-screen w-full ml-[150px] overflow-hidden bg-black"
      >
        <div
          ref={trackRef}
          className="flex h-full w-[2150vw] gallery-track"
        >
          {brandData.map((brand, brandIndex) => (
            <div key={brandIndex} className="flex mr-52">
              <div
                className="w-[500px] flex flex-col items-center justify-center font-noto_sans mx-28"
                ref={(el) => {
                  brandRefs.current[brandIndex] = el;
                }}
              >
                <div className="text-center text-gray-800 p-4 bg-white">
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      className="pt-10 mb-4 w-[200px] h-auto mx-auto"
                    />
                  )}
                  <p className="text-base pt-8 px-16 pb-12 z-10">
                    {brand.description}
                  </p>
                </div>
              </div>
              {brand.images.map((media, index) => (
                <div
                  key={`${brandIndex}-${index}`}
                  className={`w-[580px] h-auto mx-32 flex items-center justify-center ${
                    index % 2 === 0 ? "self-start" : "self-end"
                  }`}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`Brand ${brandIndex} Image ${index}`}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        console.warn("이미지 로딩 실패:", media.url);
                        e.currentTarget.style.display = "none"; // 혹은 fallback 이미지 처리
                      }}
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      src={media.url}
                      controls
                      className="w-full h-auto object-cover"
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
