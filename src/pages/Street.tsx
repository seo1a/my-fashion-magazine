import { useState, useEffect } from 'react';
import gsap from 'gsap';
import Navigation from '../components/Navigation';

interface FashionData {
    설명: string;
    패션이미지링크: string[];
    스냅이미지링크: string[];
}

export default function Street() {
    const [streetData, setStreetData] = useState<FashionData | null>(null);

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

  return (
    <div className="relative w-full h-screen bg-gray-100 flex">
      <Navigation />

      <div className="w-[30%] flex flex-col items-center justify-center font-noto_sans ml-36">
        <div className="text-center text-gray-800 p-4 bg-white rounded-lg ml-28">
          <h2 className="text-3xl font-bold pt-10 mb-4">스트릿 패션</h2>
          <p className="text-base pt-8 pb-12">
            {streetData?.설명 || "로딩 중..."}
          </p>
        </div>
      </div>

    {/* 브랜드 슬라이더와 배경 이미지 추가 */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* 배경 이미지 - 오른쪽 1/3에 위치, 아래로 조정 */}
        {streetData?.패션이미지링크?.[0] && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
        </div>
        )}
    </div>

     
      
    </div>
  );
}