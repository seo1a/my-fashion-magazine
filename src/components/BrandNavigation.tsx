import { type FC } from "react";

interface BrandNavigationProps {
  brands: string[];
  scrollToBrand: (index: number) => void;
}

const BrandNavigation: FC<BrandNavigationProps> = ({ brands, scrollToBrand }) => {
  // 7개 버튼 생성, 브랜드 데이터가 없으면 빈 버튼 표시
  const brandNames = [
    ...brands,
    ...Array(7 - brands.length).fill("Placeholder"),
  ].slice(0, 7);

  return (
    <div className="fixed top-4 right-4 flex space-x-2 z-20">
      {brandNames.map((name, index) => (
        <button
          key={index}
          className="w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-500 text-white flex items-center justify-center text-xs"
          onClick={() => scrollToBrand(index)}
          disabled={name === "Placeholder"}
        >
          
        </button>
      ))}
    </div>
  );
};

export default BrandNavigation;