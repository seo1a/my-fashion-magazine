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
    <div className="fixed top-16 sm:top-20 md:top-24 right-2 sm:right-4 md:right-8 flex space-x-1 sm:space-x-2 md:space-x-4 z-20">
      {brandNames.map((name, index) => (
        <button
          key={index}
          onClick={() => scrollToBrand(index)}
          disabled={name === "Placeholder"}
          className={`w-4 h-6 sm:w-5 sm:h-7 md:w-6 md:h-8 flex items-center justify-center
            text-myGreen text-sm sm:text-base md:text-xl lg:text-2xl font-poppins_black
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