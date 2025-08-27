import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Navigation from "../components/Navigation";
import "../styles/Street.css"; // 추가된 CSS

interface FashionData {
  설명: string;
  패션이미지링크: string[];
  스냅이미지링크: string[];
}

export default function Street2() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastSectionRef = useRef<HTMLElement | null>(null); // 마지막 문구 ref
  const [streetData, setStreetData] = useState<FashionData | null>(null);
  const navigate = useNavigate();

  // 설명을 문장 단위로 쪼갬 (headline 제외)
  const sentences = streetData?.설명
    ? streetData.설명.split(/(?<=[.!?])\s+/)
    : ["로딩 중..."];

  // 마지막 문구
  const finalMessage =
    "스트릿 패션 브랜드 살펴보기\n⬇⬇⬇ SCROLL DOWN ⬇⬇⬇";

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
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // headline (STREET FASHION) → scroll 효과
    gsap.to(".text", {
      backgroundSize: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".text",
        start: "center 50%",
        end: "center 10%",
        scrub: true,
      },
    });

    // 나머지 문장들 BTT 효과
    gsap.utils.toArray<HTMLElement>(".sentence").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 마지막 문구 애니메이션
    if (lastSectionRef.current) {
      gsap.fromTo(
        lastSectionRef.current,
        { autoAlpha: 0, y: 50, scale: 0.8 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lastSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // pulse 효과
      gsap.to(lastSectionRef.current, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [sentences]);

  return (
    <div className="relative w-full min-h-[150vh] bg-black font-noto_sans">
      {/* Navigation */}
      <div className="flex">
        <Navigation />

        {/* 설명글 영역 */}
        <div
          ref={containerRef}
          className="relative w-full bg-black text-white min-h-screen ml-[150px]"
        >
          {/* headline */}
          <section className="headline h-screen flex flex-col items-center justify-center">
            <h1 className="text text-8xl text-center font-poppins_black font-extrabold leading-tight relative">
              STREET FASHION
              <span className="font-freesentation text-7xl">스트릿 패션</span>
            </h1>
            <h1 className="text text-8xl text-center font-poppins_black font-extrabold leading-tight relative border-b border-b-gray-800">
              STREET FASHION
              <span className="font-freesentation text-7xl">스트릿 패션</span>
            </h1>
            <h1 className="text text-8xl text-center font-poppins_black font-extrabold leading-tight relative">
              STREET FASHION
              <span className="font-freesentation text-7xl">스트릿 패션</span>
            </h1>
          </section>

          {/* 나머지 문장 */}
          {sentences.map((sentence, idx) => (
            <section
              key={idx}
              className="sentence h-screen flex flex-col items-center justify-center text-2xl px-6 text-center"
            >
              <p>{sentence.split("\n").map((line, lineIdx) => 
                    ( 
                        <p key={lineIdx}> 
                            {line} 
                            <br /> 
                        </p> 
                    ))}
                </p>
            </section>
          ))}

          {/* 마지막 문구 */}
          <section
            ref={lastSectionRef}
            className="h-screen flex flex-col items-center justify-center text-4xl font-bold px-6 text-center text-white"
          >
            {finalMessage.split("\n").map((line, lineIdx) => (
              <p
                key={lineIdx}
                className={lineIdx === 1 ? "text-2xl mt-4 highlight" : ""}
              >
                {line}
                <br />
              </p>
            ))}
          </section>
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-[30vh]" />
    </div>
  );
}
