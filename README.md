# 🎱 STRXXT - 스트릿 패션 매거진
<img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%98.JPG" alt="street-fashion-home" width="500"/>
<img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%982.JPG" alt="street-fashion-home2" width="500"/>
<img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%983.JPG" alt="street-fashion-home3" width="500"/>
<img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%984.JPG" alt="street-fashion-home4" width="500"/>
<img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%985.JPG" alt="street-fashion-home5" width="500"/>
<br><br>

<details>
  <summary>📱모바일 UI 확인하기</summary> 
  
  <img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%986.JPG" alt="street-fashion-mobile" width="300"/>
  <img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%987.JPG" alt="street-fashion-mobile2" width="300"/>
  <img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%988.JPG" alt="street-fashion-mobile3" width="300"/>
  <img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%989.JPG" alt="street-fashion-mobile4" width="300"/>
  <img src="https://raw.githubusercontent.com/seo1a/fashion-magazine-image/refs/heads/main/street/%EC%BA%A1%EC%B2%9810.JPG" alt="street-fashion-mobile5" width="300"/>
  
</details>
<br>

## 🦹 프로젝트 소개
STRXXT는 스트릿 패션 문화를 탐색하고 브랜드와 아이템을 소개하는 반응형 웹 매거진 애플리케이션입니다. 
스트릿 패션의 문화적 의미, GSAP을 활용한 스크롤 애니메이션, Swiper 슬라이더를 통한 아이템 페이지, 다양한 스트릿 브랜드 정보, 그리고 스트릿 스냅 이미지를 제공합니다.
<br><br><br>

## 🌐배포
[🔗 [https://my-fashion-magazine.vercel.app/](https://my-fashion-magazine.vercel.app/)]
<br>
<br>
<br>
<br>


## 🧩기술 스택 <br>

React + TypeScript 기반으로 스트릿 패션 콘텐츠를 인터랙티브하게 탐색할 수 있는 웹 애플리케이션입니다.
<br>

### 1. 프론트엔드 <br>
- <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> : UI 구성 및 컴포넌트 기반 개발
- <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/> : 빠른 개발 환경 및 번들링
- <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> : 타입 안정성을 통한 안전한 개발
- <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/> : 클라이언트 사이드 라우팅
- <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white"/> : 유틸리티 기반 스타일링을 통한 반응형 UI 구현
<br>

### 2. 애니메이션 & UI <br>
- <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=gsap&logoColor=000"/> : 스크롤 트리거 애니메이션, SplitText 텍스트 애니메이션, 이미지 호버 효과
- <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white"/> : 아이템 갤러리 슬라이더 구현
<br>

### 3. 배포 <br>
- <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/> : 프론트엔드 애플리케이션 배포 (선택사항)
<br>

### 4. 개발 환경 <br>
- <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/> : 버전 관리
- <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/> : 소스 코드 관리 및 프로젝트 문서화
<br>
<br>
<br>
<br>

## 📁프로젝트 구조 <br>


```
my-fashion-magazine
├── node_modules
├── public
│   ├── assets
│   └── data.json              # 스트릿 패션 데이터 (설명, 브랜드, 아이템, 스냅)
├── src
│   ├── assets                 # 이미지 및 폰트 파일
│   ├── components              
│   │   ├── BrandNavigation.tsx # 브랜드 네비게이션 컴포넌트
│   │   ├── Modal.tsx          # 이미지 모달 컴포넌트
│   │   └── Navigation.tsx     # 메인 네비게이션 컴포넌트
│   ├── pages
│   │   ├── Street.tsx          # 메인 페이지 (스트릿 패션 소개)
│   │   ├── StreetBrand.tsx    # 브랜드 소개 페이지
│   │   ├── StreetItem.tsx     # 아이템 갤러리 페이지
│   │   └── StreetSnap.tsx     # 스트릿 스냅 갤러리 페이지
│   ├── styles
│   │   ├── Street.css         # Street 페이지 스타일
│   │   └── SwiperStyles.css   # Swiper 커스텀 스타일
│   ├── App.css
│   ├── App.tsx                # 라우팅 설정
│   ├── index.css              # 전역 스타일
│   └── main.tsx               # 애플리케이션 진입점
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```
<br>
<br>
<br>
<br>

## 📚주요 기능

- **스트릿 패션 소개**: 메인 페이지에서 스트릿 패션의 문화적 의미를 텍스트와 이미지로 탐색할 수 있습니다. GSAP SplitText를 활용한 타이틀 애니메이션과 스크롤 트리거를 통한 이미지/텍스트 reveal 효과가 적용됩니다.

- **스트릿 브랜드 탐색**: 6개의 주요 스트릿 브랜드(Supreme, Bape, Carhartt, Stussy, Nike, Adidas)의 로고, 설명, 컨셉 사진을 가로 스크롤 갤러리로 탐색할 수 있습니다. PC에서는 세로 스크롤에 연동된 가로 스크롤 애니메이션이, 모바일에서는 터치 스와이프 (가로) 가 지원됩니다.

- **브랜드 네비게이션**: Brand 페이지에서 각 브랜드로 빠르게 이동할 수 있는 네비게이션 버튼이 제공됩니다. PC에서는 우측 상단에, 모바일에서는 좌측 하단에 슬라이딩 메뉴로 표시됩니다.

- **아이템 페이지**: Swiper를 활용한 아이템 상세 이미지 슬라이더를 통해 다양한 스트릿 패션 아이템을 탐색할 수 있습니다. 아이템별로 여러 색상 옵션을 선택할 수 있으며, 색상 버튼을 통해 해당 색상의 상세 이미지를 확인할 수 있습니다.

- **스트릿 스냅 페이지**: 스트릿 패션 스냅 사진을 그리드 레이아웃으로 탐색할 수 있습니다. 이미지를 클릭하면 모달로 확대하여 볼 수 있으며, 각 이미지의 출처 링크를 확인할 수 있습니다.

- **GSAP 애니메이션**: 
  - **SplitText 애니메이션**: 메인 페이지 타이틀의 각 글자가 순차적으로 등장하며 파도 효과가 적용됩니다.
  - **ScrollTrigger 애니메이션**: 스크롤 위치에 따라 이미지와 텍스트가 좌우에서 reveal되는 효과가 적용됩니다.
  - **이미지 호버 효과**: 브랜드 페이지에서 이미지에 마우스를 올리면 확대 효과가 적용됩니다.
  - **모달 애니메이션**: 스냅 이미지 클릭 시 모달이 부드럽게 나타나고 사라집니다.

- **반응형 디자인**: 모바일, 태블릿, 데스크탑에 최적화된 레이아웃과 인터랙션을 제공합니다. 모바일에서는 터치 스와이프, PC에서는 스크롤 기반 애니메이션이 적용됩니다.

- **자동 페이지 전환**: 메인 페이지에서 스크롤을 끝까지 내리면 자동으로 브랜드 페이지로 이동하며, 브랜드 페이지에서도 스크롤 완료 시 아이템 페이지로 자동 전환됩니다.
<br>
<br>
<br>
<br>

## 🛠설치 및 실행 방법 <br>
```bash
# 리포지터리 복제
git clone https://github.com/[사용자명]/my-fashion-magazine.git
cd my-fashion-magazine

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

빌드 및 프리뷰:
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 프리뷰
npm run preview
```
<br>
<br>
<br>

## ✏데이터 구조 <br>

프로젝트는 `public/data.json` 파일에서 데이터를 로드합니다. 데이터 구조는 다음과 같습니다:

```json
{
  "스트릿": {
    "설명": "스트릿 패션에 대한 설명 텍스트...",
    "패션이미지링크": ["이미지 URL 배열"],
    "브랜드": {
      "브랜드명": {
        "공식로고이미지링크": "로고 이미지 URL",
        "브랜드설명": "브랜드 설명 텍스트",
        "브랜드컨셉사진링크": [
          { "type": "image", "url": "이미지 URL" }
        ]
      }
    },
    "아이템": [
      {
        "제품명": "제품명",
        "옵션": [
          {
            "색상": "색상명",
            "모델이미지링크": "모델 이미지 URL",
            "상세이미지링크": ["상세 이미지 URL 배열"]
          }
        ]
      }
    ],
    "스냅": [
      {
        "이미지링크": "스냅 이미지 URL",
        "출처링크": "출처 URL"
      }
    ]
  }
}
```
<br>
<br>
<br>

## 💡한계 및 향후 개선 방향 <br>

### 1. UI 흐름의 일관성 부족<br>
현재는 Home 및 Brand 페이지에 한해, 스크롤을 끝까지 내리면 자동으로 다음 페이지(컴포넌트)로 전환되는 기능이 적용되어 있습니다. 향후에는 다른 페이지에도 동일한 스크롤 트리거 인터랙션을 적용할 수 있도록 레이아웃 구조를 개선하여, 모든 페이지에서 일관된 스크롤 기반 페이지 전환 경험을 제공하고자 합니다. <br><br>
### 2. 검색 및 필터링 기능<br>
현재는 브랜드와 아이템을 순차적으로 탐색하는 방식입니다. 향후 개선한다면 브랜드, 아이템의 수를 늘리고, 브랜드명, 아이템명, 색상 등으로 검색 및 필터링할 수 있는 기능을 추가하여 사용자 경험을 향상시킬 수 있을 것입니다.<br><br>
### 3. 사용자 인터랙션 강화<br>
현재는 정보 탐색에 초점을 맞추고 있습니다. 향후 개선한다면 좋아요, 북마크, 공유 기능 등을 추가하여 사용자 참여를 높일 수 있을 것으로 기대합니다.
<br> 
<br> 
<br> 

## 📌참고 <br>

- GSAP 공식 문서: https://gsap.com/docs/v3/
- Swiper 공식 문서: https://swiperjs.com/
