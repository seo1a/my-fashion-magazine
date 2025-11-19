import { type FC } from "react";

interface BrandNavigationProps {
  brands: string[];
  scrollToBrand: (index: number) => void;
}

const BrandNavigation: FC<BrandNavigationProps> = ({ brands, scrollToBrand }) => {
  // 6개 버튼 생성, 브랜드 데이터가 없으면 빈 버튼 표시
  const brandNames = [
    ...brands,
    ...Array(6 - brands.length).fill("Placeholder"),
  ].slice(0, 6);

  return (
    <div className="fixed top-24 right-8 flex space-x-4 z-20">
      {brandNames.map((name, index) => (
        <button
          key={index}
          onClick={() => scrollToBrand(index)}
          disabled={name === "Placeholder"}
          className={`w-6 h-8 flex items-center justify-center
            text-myGreen text-2xl font-poppins_black
            transition-all duration-300
            ${
              name === "Placeholder"
                ? "opacity-40 cursor-default"
                : "hover:text-white"
            }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default BrandNavigation;