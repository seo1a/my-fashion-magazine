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
    <div className="relative w-full h-screen">
      <Navigation />
      <main className="flex-1 ml-[150px] px-4 py-16">
        <h1 className="text-6xl font-bold text-center mb-24">SNAP</h1>

        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-3">
            {snaps.map((snap, idx) => (
              <div
                key={idx}
                className="relative group cursor-pointer overflow-hidden"
                onClick={() => setSelectedImage(snap.이미지링크)}
              >
                <img
                  src={snap.이미지링크}
                  alt={`snap-${idx}`}
                  className="w-[320px] h-[427px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* 출처 버튼 */}
                <a
                  href={snap.출처링크}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  출처
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
