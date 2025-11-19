import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Modal from "../components/Modal";

export default function StreetSnap() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [snaps, setSnaps] = useState<{ 이미지링크: string; 출처링크: string }[]>([]);

  useEffect(() => {
    // public 폴더의 data.json에서 데이터 가져오기
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data["스트릿"]?.["스냅"]) {
          setSnaps(data["스트릿"]["스냅"]);
        }
      })
      .catch((err) => console.error("데이터 로드 실패:", err));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black pt-16 sm:pt-20 md:pt-24">
      <Navigation />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 bg-black font-noto_sans text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-aftermath text-center text-myGreen mt-4 sm:mt-6 md:mt-8 mb-12 sm:mb-16 md:mb-24">
          SNAP
        </h1>

        <div className="flex justify-center mb-20 sm:mb-32 md:mb-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {snaps.map((snap, idx) => (
              <div
                key={idx}
                className="relative group cursor-pointer overflow-hidden mx-auto"
                onClick={() => setSelectedImage(snap.이미지링크)}
              >
                <img
                  src={snap.이미지링크}
                  alt={`snap-${idx}`}
                  className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] h-auto aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* 출처 버튼 */}
                <a
                  href={snap.출처링크}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-myGreen text-black text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  🔗
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedImage && (
        <Modal imageSrc={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
