import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import streetImg from "../assets/street_look.jpg"
import preppyImg from "../assets/preppy_look.jpg";

interface FashionTrend {
  hashtag: string;
  popularity: number; // 0~100 사이의 인기도 값
  backgroundImage: string | undefined;
}

export default function Home() {
  const navigate = useNavigate();

  const trends: FashionTrend[] = [
    { hashtag: '#y2k', popularity: 90, backgroundImage: undefined },
    { hashtag: '#걸리시', popularity: 60, backgroundImage: undefined },
    { hashtag: '#스트릿', popularity: 90, backgroundImage: streetImg },
    { hashtag: '#고프코어', popularity: 50, backgroundImage: undefined },
    { hashtag: '#락시크', popularity: 50, backgroundImage: undefined },
    { hashtag: '#에스닉', popularity: 50, backgroundImage: undefined },
    { hashtag: '#빈티지', popularity: 90, backgroundImage: streetImg },
    { hashtag: '#프레피룩', popularity: 50, backgroundImage: preppyImg },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      trends.forEach((trend, index) => {
        const element = containerRef.current?.querySelector(`#circle-${index}`);
        if (element) {
          // 초기 애니메이션
          gsap.fromTo(
            element,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: index * 0.2,
              ease: 'back.out(1.7)',
            }
          );

          // 호버 시 애니메이션
          element.addEventListener('mouseenter', () => {
            // 원은 20% 커짐
            gsap.to(element, {
              scale: 1.2,
              duration: 0.3,
              ease: 'power1.out',
              onUpdate: () => {
                console.log(`#circle-${index} scale: ${getComputedStyle(element).transform}`);
              },
            });

            // 배경 이미지는 10% 커짐 (부모와 동기화)
            const backgroundElement = element.querySelector(`#bg-${index}`);
            if (backgroundElement && trend.backgroundImage) {
              gsap.to(backgroundElement, {
                scale: 1.3, // 부모와 동일한 비율로 조정
                duration: 0.85,
                ease: 'power1.out',
                onUpdate: () => {
                  console.log(`#bg-${index} scale: ${getComputedStyle(backgroundElement).transform}`);
                },
              });
            }

            // 추가적인 이미지 확대 효과 (backgroundSize로 구현)
            const overlayElement = element.querySelector(`#overlay-${index}`);
            if (overlayElement && trend.backgroundImage) {
              gsap.to(overlayElement, {
                backgroundSize: '150%', // 50% 추가 확대
                duration: 0.3,
                ease: 'power1.out',
              });
            }
          });

          element.addEventListener('mouseleave', () => {
            // 원은 원래 크기로 복귀
            gsap.to(element, {
              scale: 1,
              duration: 0.3,
              ease: 'power1.out',
            });

            // 배경 이미지는 원래 크기로 복귀
            const backgroundElement = element.querySelector(`#bg-${index}`);
            if (backgroundElement && trend.backgroundImage) {
              gsap.to(backgroundElement, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.out',
              });
            }

            // 오버레이는 원래 크기로 복귀
            const overlayElement = element.querySelector(`#overlay-${index}`);
            if (overlayElement && trend.backgroundImage) {
              gsap.to(overlayElement, {
                backgroundSize: '100%',
                duration: 0.3,
                ease: 'power1.out',
              });
            }
          });
        } else {
          console.warn(`Element #circle-${index} not found`);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getCircleSize = (popularity: number, isMobile: boolean) => {
    const baseSize = Math.min(500, popularity) * 4;
    return isMobile ? baseSize * 0.4 : baseSize;
  };

  const positions = [
    { left: 20, top: 18 },    // #y2k
    { left: 43, top: 25 },    // #걸리시
    { left: 60, top: 20 },    // #스트릿
    { left: 53, top: 55 },    // #고프코어
    { left: 15, top: 60 },    // #락시크
    { left: 80, top: 55 },    // #에스닉
    { left: 33, top: 57 },    // #빈티지
    { left: 65, top: 70 },    // #프레피룩
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gray-200 overflow-hidden"
    >
      {trends.map((trend, index) => {
        const { left, top } = positions[index];
        const size = getCircleSize(trend.popularity, isMobile);
        const backgroundStyle = trend.backgroundImage
          ? { backgroundImage: `url(${trend.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {};

        return (
          <div
            key={index}
            id={`circle-${index}`}
            className="absolute flex items-center justify-center rounded-full border border-black text-xs sm:text-sm md:text-base lg:text-xl text-white font-noto_sans transform origin-center cursor-pointer overflow-hidden"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              zIndex: trends.length - index,
            }}
            onClick={() => {
              if (trend.hashtag === '#스트릿') {
                navigate('/street');
              }
              else if (trend.hashtag === '#프레피룩') {
                navigate('/preppy');
              }
            }}
          >
            {trend.backgroundImage ? (
              <>
                <div
                  id={`bg-${index}`}
                  className="absolute inset-0 rounded-full transform"
                  style={{
                    ...backgroundStyle,
                    transformOrigin: 'center',
                    zIndex: -2,
                  }}
                />
                <div
                  id={`overlay-${index}`}
                  className="absolute inset-0 rounded-full bg-black"
                  style={{
                    opacity: 0.45,
                    zIndex: -1,
                  }}
                />
              </>
            ) : null}
            <span className="px-2 text-center break-words">{trend.hashtag}</span>
          </div>
        );
      })}
    </div>
  );
}