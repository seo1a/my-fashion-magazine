import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navigation from '../components/Navigation';

interface FashionData {
    설명: string;
    패션이미지링크: string[];
    스냅이미지링크: string[];
}

export default function Street2() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [streetData, setStreetData] = useState<FashionData | null>(null);
    const navigate = useNavigate();

    // 설명을 문장 단위로 쪼갬
    const sentences = streetData?.설명
        ? ["STREET FASHION", ...streetData.설명.split(/(?<=[.!?])\s+/)]
        : ["로딩 중..."];

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                if (data && data["스트릿"]) {
                    setStreetData(data["스트릿"]);
                }
            })
            .catch(err => {
                console.error("JSON fetch error:", err);
            });
    }, []);

    // ✅ 스크롤 시 /street/brand로 이동
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 10) {
                navigate('/street/brand');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [navigate]);

    useEffect(() => {
        if (!containerRef.current) return;

        // 👉 인트로 headline 효과
        gsap.fromTo(".headline",
            { autoAlpha: 0, scale: 5, y: -200 }, // 초기 상태: 보이지 않고, 큼, 위로 이동
            { 
            autoAlpha: 1, 
            scale: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power2.out", 
            delay: 0.2 // 바로 시작
            }
        );

        // 👉 나머지 문장들 BTT 효과
        gsap.utils.toArray<HTMLElement>(".sentence:not(.headline)").forEach((el) => {
            gsap.fromTo(el,
                { autoAlpha: 0, y: 100 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.25,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [sentences]);


    return (
        <div className="relative w-full min-h-[150vh] bg-black">
            {/* Navigation 고정 */}
            <div className="flex">
                <Navigation />

                {/* 설명글 영역 */}
                <div
                    ref={containerRef}
                    className="relative w-full bg-black text-white min-h-screen ml-[150px]"
                >
                    {sentences.map((sentence, idx) => (
                        <section
                            key={idx}
                            className={`sentence h-screen flex flex-col items-center justify-center 
                                    text-3xl font-extrabold px-6 text-center font-noto_sans
                                    ${idx === 0 ? "headline min-h-[80vh]" : "h-screen"}`}
                        >
                            {sentence.split("\n").map((line, lineIdx) => (
                                <p key={lineIdx}>
                                    {line}
                                    <br />
                                </p>
                            ))}
                        </section>
                    ))}


                </div>
            </div>

           

            {/* 👇 하단 여백 (스크롤 유도용) */}
            <div className="h-[40vh]" />

        </div>
    );
}
