import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '../components/Navigation';

interface FashionData {
    설명: string;
    패션이미지링크: string[];
    스냅이미지링크: string[];
}

export default function Street() {
    const [streetData, setStreetData] = useState<FashionData | null>(null);
    const navigate = useNavigate();

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

    return (
        <div className="relative w-full min-h-[150vh] bg-gray-100">
            {/* Navigation 고정 */}
            <div className="flex">
                <Navigation />

                {/* 왼쪽 설명글 영역 */}
                <div className="w-[35%] flex flex-col items-center justify-center font-noto_sans ml-36">
                    <div className="text-center text-gray-800 p-4 bg-white ml-40 mt-40">
                        <h2 className="text-3xl font-bold pt-10 mb-4">스트릿 패션</h2>
                        <p className="text-base pt-8 pb-12 px-12">
                            {streetData?.설명 || "로딩 중..."}
                        </p>
                    </div>
                </div>
            </div>

            {/* 오른쪽 배경 이미지 영역 */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                {streetData?.패션이미지링크?.[0] && (
                    <div
                        className="absolute right-20 top-1/6 w-[40%] h-full z-0"
                        style={{
                            backgroundImage: `url(${streetData.패션이미지링크[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'top center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.7,
                        }}
                    />
                )}
            </div>

            {/* 👇 하단 여백 (스크롤 유도용) */}
            <div className="h-[40vh]" />

        </div>
    );
}
