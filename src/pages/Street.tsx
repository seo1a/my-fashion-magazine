import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Navigation from "../components/Navigation";
import "../styles/Street.css"; // 추가된 CSS

interface FashionData {
  설명: string;
  패션이미지링크: string[];
}

gsap.registerPlugin(ScrollTrigger);

export default function Street() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastSectionRef = useRef<HTMLElement | null>(null); // 마지막 문구 ref
  const [streetData, setStreetData] = useState<FashionData | null>(null);
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isMobile = window.innerWidth < 640;

  // 설명을 문장 단위로 쪼갬 (headline 제외)
  const sentences = streetData?.설명
    ? streetData.설명.split(/(?<=[.!?])\s+/)
    : ["로딩 중..."];

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data["스트릿"]) {
          setStreetData(data["스트릿"]);
        }
      })
      .catch((err) => {
        console.error("JSON fetch error:", err);
      });
  }, []);

  // 스크롤 시 /street/brand로 이동
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 10) {
        navigate("/street/brand");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);

  useEffect(() => {
    if (!svgRef.current) return;

    const turb = svgRef.current.querySelector('#turb') as SVGElement | null;
    const disp = svgRef.current.querySelector('#disp') as SVGElement | null;

    if (!turb || !disp) return;

    // 🎬 초기 텍스트 애니메이션 (URBAN / VIBE / EDGE)
    const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });

    tl.to(turb, {
      attr: { baseFrequency: "0.03 0.02" },
      duration: 3,
    })
      .to(disp, {
        attr: { scale: 40 },
        duration: 1.5,
      }, "<")
      .to(turb, {
        attr: { baseFrequency: "0.02 0.04" },
        duration: 3,
      })
      .to(disp, {
        attr: { scale: 18 },
        duration: 1.5,
      }, "<");

    // 글자 등장 → 사라짐
    gsap.fromTo('.svg-word', { opacity: 0, y: 30, scale: 0.98 }, {
      opacity: 1, y: 0, scale: 1,
      stagger: 0.45,
      duration: 1.2,
      ease: 'power3.out',
      onComplete: () => {
        gsap.to('.svg-word', {
          opacity: 0,
          duration: 1.5,
          delay: 0.8,
          onComplete: () => {
            // ✨ STREET FASHION 등장
            gsap.to('.final-word', {
              opacity: 1,
              scale: 1,
              duration: 1.8,
              ease: "power3.out",
              onComplete: () => {
                // 물결 효과
                const tl2 = gsap.timeline({ repeat: 0, defaults: { ease: "sine.inOut" } });
                tl2.to(turb, { attr: { baseFrequency: "0.035 0.025" }, duration: 2 })
                  .to(disp, { attr: { scale: 20 }, duration: 1.5 }, "<");
                tl2.eventCallback("onComplete", () => {
                  gsap.to(turb, { attr: { baseFrequency: "0 0" }, duration: 1.2 });
                  gsap.to(disp, { attr: { scale: 0 }, duration: 1.2 });
                });
              }
            });
          }
        });
      }
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(turb);
      gsap.killTweensOf(disp);
    };
  }, []);





  // 중간의 이미지+문구
  useEffect(() => {
    const hide = (item: Element) => {
      gsap.set(item, { autoAlpha: 0 });
    };

    const animate = (item: HTMLElement) => {
      let x = 100;
      let y = 0;
      let delay = parseFloat(item.dataset.delay || "0");

      if (item.classList.contains("reveal_LTR")) {
        x = -100;
      } else if (item.classList.contains("reveal_RTL")) {
        x = 100;
      }

      gsap.fromTo(
        item,
        { autoAlpha: 0, x, y },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          delay,
          duration: 1.25,
          overwrite: "auto",
        }
      );
    };

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((item) => {
      hide(item);
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => animate(item),
      });
    });
  }, [sentences]);


  return (
    <div className="relative w-full min-h-[150vh] bg-black text-white pt-4">
      <Navigation />

      {/* 설명글 영역 */}
      <div
        ref={containerRef}
        className="relative w-full bg-black min-h-screen pt-[37px] md:pt-0"
      >
        {/* headline (URBAN / VIBE / EDGE) */}
        <section className="headline-container px-6 md:px-12" aria-hidden>
            {/* inline SVG definitions + text. React-friendly 방식 */}
            <svg className="headline-svg" width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
              <defs>
                {/* 컬러 그라데이션 */}
                <linearGradient id="neonGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#FF6EDB" />
                  <stop offset="50%" stopColor="#00FF57" />
                  <stop offset="100%" stopColor="#9BFFEA" />  
                </linearGradient>

              
                <linearGradient id="finalGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#00FF57" />
                  <stop offset="50%" stopColor="#00FF57" />
                  <stop offset="100%" stopColor="#00FF57" />
                </linearGradient>

                {/* wavy filter */}
                <filter id="wavy" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence id="turb" baseFrequency="0.02 0.03" numOctaves="2" seed="2" result="noise" />
                  <feDisplacementMap id="disp" in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
                
                  <feGaussianBlur stdDeviation="0.2" result="blurred" />
                  <feComposite in="SourceGraphic" in2="blurred" operator="atop" />
                </filter>

                {/* 약한 외곽 글로우 (svg용) */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 텍스트 그룹 — 화면 중앙 정렬. font-size는 viewBox 기준이며 CSS에서 반응형으로 조정 */}
              <g transform="translate(600,180)" textAnchor="middle" style={{ filter: 'url(#wavy) url(#glow)' }}>
                <text className="svg-word" y={isMobile ? 0 : 0} x="0" fill="url(#neonGrad)" fontWeight="900">URBAN</text>
                <text className="svg-word" y={isMobile ? 90 : 160} x="0" fill="url(#neonGrad)" fontWeight="900">VIBE</text>
                <text className="svg-word" y={isMobile ? 180 : 320} x="0" fill="url(#neonGrad)" fontWeight="900">EDGE</text>
              </g>
              <g transform="translate(600,180)" textAnchor="middle" style={{ filter: 'url(#wavy)' }}>
                <text
                  className="final-word"
                  y={isMobile ? 90 : 160}
                  x="0"
                  fill="url(#finalGrad)"
                  fontWeight="400"
                  style={{ opacity: 0, transformOrigin: "center", scale: 1 }}
                >
                  Street Fashion
                </text>
              </g>
            </svg>
        </section>

        <div className="px-4 sm:px-6 md:px-12">
          {/* 나머지 문장 */}
          {sentences.map((sentence, idx) => {
            const imgSrc =
              streetData?.패션이미지링크[idx % streetData.패션이미지링크.length];

            // 방향 설정
            const textDirection = idx % 2 === 0 ? "reveal_LTR" : "reveal_RTL";
            const imgDirection = idx % 2 === 0 ? "reveal_LTR" : "reveal_RTL";

            return (
              <section
                key={idx}
                className="relative w-full my-[10vh] sm:my-[20vh] md:my-[30vh] h-[400px] sm:h-[600px] md:h-[800px] flex items-center"
              >
                {/* 이미지 */}
                <figure
                  className={`absolute top-0 h-full overflow-hidden ${
                    idx % 2 === 0 
                      ? "left-0 origin-left" 
                      : "right-0 origin-right"
                  } ${imgDirection} reveal`}
                >
                  <div className={`h-full flex items-center ${
                    idx % 2 === 0 
                      ? "ml-4 sm:ml-[4vw] md:ml-[6vw] lg:ml-[8vw] xl:ml-[10vw]" 
                      : "mr-4 sm:mr-[4vw] md:mr-[6vw] lg:mr-[8vw] xl:mr-[10vw]"
                  }`}>
                    {/* 이미지 가로 600px 제한 */}
                    <div className="w-full max-w-[200px] sm:max-w-[600px] px-4 sm:px-0">
                      <img
                        src={imgSrc}
                        alt={`street-img-${idx}`}
                        className="w-full h-auto max-h-screen object-contain grayscale"
                      />
                    </div>
                  </div>
                </figure>

                {/* 설명글 (오버레이) */}
                <div
                  className={`sentence absolute z-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                    leading-relaxed font-freesentation text-white 
                    ${idx % 2 === 0 
                      ? "left-0 ml-[40px] sm:ml-[450px] md:ml-[800px] text-left"
                      : "right-0 mr-[40px] sm:mr-[450px] md:mr-[800px] text-right"
                  } ${textDirection} reveal`}
                >
                  
                  <p className="text-[10px] sm:text-sm md:text-base lg:text-lg leading-relaxed font-freesentation text-white p-4 sm:p-6 md:p-8 mx-2 sm:mx-6 md:mx-12">
                    {sentence.split("\n").map((line, lineIdx) => (
                      <span key={lineIdx} className="block mb-1 sm:mb-2">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
        
      </div>

      {/* 하단 여백 */}
      <div className="h-[45vh]" />
    </div>
  );
}
