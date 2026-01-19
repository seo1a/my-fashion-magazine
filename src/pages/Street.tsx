import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Navigation from "../components/Navigation";
import "../styles/Street.css"; // 추가된 CSS
import word1Image from "../assets/word1.png";
import word2Image from "../assets/word2.png";
import word3Image from "../assets/word3.png";
import word4Image from "../assets/word4.png";
import word5Image from "../assets/word5.png";

interface FashionData {
  설명: string;
  패션이미지링크: string[];
}

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Street() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [streetData, setStreetData] = useState<FashionData | null>(null);
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const isMobile = window.innerWidth < 640;

  const wordImages = [
    word1Image,
    word2Image,
    word3Image,
    word4Image,
    word5Image,
  ];

   //헤드라인 GSAP 효과 (SplitText)
  useEffect(() => {
    if (!titleRef.current) return;

    const splitter = new SplitText(titleRef.current, { type: "chars" });
    const chars = splitter.chars;

    gsap.from(chars, {
        duration: 0.5,
        y: 50, // 아래에서 위로 올라오기
        opacity: 0,
        ease: 'power2.out',
        stagger: {
            each: 0.08, // 각 문자 등장 시간차
            from: 'start' // 왼쪽에서 오른쪽으로 시작
        }
    });
    
    // 등장 후 파도 효과 (무한 반복)
    gsap.to(chars, {
        duration: 0.3,
        scaleY: 1.2, // Y축으로 1.2배 커짐
        yoyo: true, // 역재생
        repeat: -1, // 무한 반복
        ease: 'sine.inOut',
        stagger: {
            amount: 1, // 전체 반복 시간을 1초로 분산
            from: 'center', // 중앙에서 바깥으로 파동 시작
            repeat: -1
        }
    });

    return () => splitter.revert();
  }, []);

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

  return (
    <div className="relative w-full min-h-[150vh] bg-black text-white pt-4">
      <Navigation />

      {/* 설명글 영역 */}
      <div
        ref={containerRef}
        className="relative w-full bg-black min-h-screen"
      >
        {/* headline */}
        <section className="headline-container px-6 md:px-12" aria-hidden>
          <h1
            ref={titleRef}
            className="font-aftermath text-myGreen text-center text-7xl md:text-8xl lg:text-[180px]"
          >
            <span className="block sm:inline">STRXXT</span>
          </h1>
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
                className={`relative w-full my-[20vh] sm:my-[20vh] md:my-[30vh] 
                          flex flex-col sm:flex-row sm:items-center
                          ${isMobile ? 'h-auto' : 'h-[400px] sm:h-[600px] md:h-[800px]'}`}
              >

                {/* 이미지 */}
                <figure
                  className={`${isMobile ? 'relative w-full flex justify-center' : 'absolute top-0 h-full'} overflow-hidden z-5 ${
                    idx % 2 === 0 ? "left-0 origin-left" : "right-0 origin-right"
                  } ${imgDirection} reveal`}
                >
                  <div
                    className={`${isMobile ? 'h-auto' : 'h-full'} ${isMobile ? '' : 'flex items-center'} ${
                      idx % 2 === 0 
                        ? isMobile ? "" : "ml-4 sm:ml-[4vw] md:ml-[6vw] lg:ml-[8vw] xl:ml-[10vw]"
                        : isMobile ? "" : "mr-4 sm:mr-[4vw] md:mr-[6vw] lg:mr-[8vw] xl:mr-[10vw]"
                    }`}
                  >
                    <div className="w-full max-w-[500px] sm:max-w-[500px] px-4 sm:px-0">
                      <img
                        src={imgSrc}
                        alt={`street-img-${idx}`}
                        className="w-full h-auto max-h-screen object-contain grayscale"
                      />
                    </div>
                  </div>
                </figure>

                {/* 설명글 */}
                <div
                  className={`sentence ${isMobile ? 'relative mt-4 w-full flex justify-center' : 'absolute z-10'} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                    leading-relaxed font-noto_sans_light text-white 
                    ${idx % 2 === 0 
                      ? isMobile 
                        ? "" 
                        : "left-0 ml-[8px] sm:ml-[450px] md:ml-[750px] text-left"
                      : isMobile
                        ? ""
                        : "right-0 mr-[8px] sm:mr-[450px] md:mr-[750px] text-right"
                    } ${textDirection} reveal`}
                >
                  {isMobile ? (
                    <div className={`w-full max-w-[600px] px-4 ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                      <p className="text-[11px] sm:text-sm md:text-base lg:text-lg leading-relaxed p-3 sm:p-4 md:p-8">
                        {sentence.split("\n").map((line, lineIdx) => (
                          <span key={lineIdx} className="block mb-1 sm:mb-2">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] sm:text-sm md:text-base lg:text-lg leading-relaxed p-4 sm:p-6 md:p-8">
                      {sentence.split("\n").map((line, lineIdx) => (
                        <span key={lineIdx} className="block mb-1 sm:mb-2">
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                {idx % 2 === 0 && wordImages[idx] && (
                  <img
                    src={wordImages[idx]}
                    alt={`word-effect-${idx + 1}`}
                    className="absolute z-0 
                              right-0 top-1/2 -translate-y-1/2 
                              w-auto h-[60px] sm:h-[120px] md:h-[200px] lg:h-[780px] 
                              right-[-50px]
                              brightness-50"
                  />
                )}
                {idx % 2 === 1 && wordImages[idx] && (
                  <img
                    src={wordImages[idx]}
                    alt={`word-effect-${idx + 1}`}
                    className="absolute z-0 
                              left-0 top-1/2 -translate-y-1/2 
                              w-auto h-[60px] sm:h-[120px] md:h-[200px] lg:h-[800px] 
                              left-[-50px]
                              brightness-50"
                  />
                )}
                
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
