import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";

import supremeLogo from "../assets/supreme_logo.png";
import supremeImg1 from "../assets/supreme1.jpg";
import supremeImg2 from "../assets/supreme2.jpg";
import supremeImg3 from "../assets/supreme3.jpg";
import supremeImg4 from "../assets/supreme4.jpg";
import supremeImg5 from "../assets/supreme5.jpg";
import supremeImg6 from "../assets/supreme6.jpg";
import supremeImg7 from "../assets/supreme7.jpg";
import supremeImg8 from "../assets/supreme8.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function StreetBrand() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
        markers: true, // 디버깅용 (필요 시 주석 처리)
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

  const images = [
    supremeLogo,
    supremeImg1,
    supremeImg2,
    supremeImg3,
    supremeImg4,
    supremeImg5,
    supremeImg6,
    supremeImg7,
    supremeImg8,
  ];

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* Navigation 고정 */}
      <Navigation />

      <section
        ref={wrapperRef}
        className="relative h-screen w-full ml-[150px] overflow-hidden bg-green-200" // Navigation 너비만큼 margin-left
      >
        <div
          ref={trackRef}
          className="flex h-full w-[900vw] gallery-track" // 트랙 너비는 이미지 개수만큼 vw 단위로
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="w-screen h-full flex items-center justify-center"
            >
              <img
                src={src}
                alt={`Supreme ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}