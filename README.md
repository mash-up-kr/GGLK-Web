# 우우티디: AI 패션 평가 서비스 🎨
<img width="949" height="399" alt="image" src="https://github.com/user-attachments/assets/8c04e89f-b10e-4f61-931a-aa524fa294e3" />

> AI 기반 패션 로스팅 서비스

**나의 패션 스타일을 재치있게 AI 평가 받으면 어떨까?** 에 대한 물음에서 시작하여, 
가상의 패션 매거진 편집장 **엘리스 제인**이 패션을 평가해주는 서비스 **우우티디**가 탄생하게 되었습니다.

## 🎯 소개

**우우티디(ooootd)** 는 **AI 기술을 활용하여 사용자의 패션 스타일을 재미있고 유쾌하게 평가**하는 서비스입니다.

### 핵심 기능

- **AI 패션 편집장** 엘리스 제인이 당신의 스타일을 위트있게 로스팅
- **3단계 강도 선택**: Easy, Normal, Spicy 중 원하는 로스팅 강도 선택하여, 기분이 상하지 않고 재밌는 평가를 받을 수 있습니다.
  
  <img width="700" alt="image" src="https://github.com/user-attachments/assets/efcdf95b-36fd-49d0-b667-a0b6fa4d0bfe" />

- **이미지 스튜디오**: 테마 스티커로 꾸민 평가 결과를 받아, 다양한 SNS에 공유하기 좋은 형태로 평가를 받아 볼 수 있습니다. 해당 이미지는 캔버스를 활용하여 구현하였습니다.  
  
  <img width="700" alt="image" src="https://github.com/user-attachments/assets/bc05009d-a5fd-4f99-9dca-0a4866fb1a92" />

## 🛠 기술 스택

### 프레임워크 & 라이브러리

- **React 19** - UI 라이브러리
- **React Router v7** - 풀스택 React 프레임워크
- **TypeScript** - 타입 안정성 및 개발 경험 향상
- **TailwindCSS 4** - 유틸리티 기반 CSS 프레임워크
- **Motion** - 애니메이션

### 상태 관리 & 데이터

- **TanStack Query (React Query)** - 서버 상태 관리
- **React Hook Form** - 폼 상태 관리
- **Dexie** - IndexedDB 래퍼 (클라이언트 사이드 데이터베이스)
- **Axios** - HTTP 클라이언트

### 개발 도구

- **Vite** - 빌드 도구
- **Biome** - 고성능 린터 & 포매터
- **Lefthook** - Git hooks 관리
- **Orval** - OpenAPI 스펙 기반 API 클라이언트 자동 생성
- **ls-lint** - 파일/디렉토리 네이밍 컨벤션 검사

### 코드 품질

- **Commitizen & Commitlint** - 커밋 메시지 컨벤션
- **TypeScript Strict Mode** - 엄격한 타입 체크
- **Pre-commit Hooks** - 커밋 전 자동 검사 및 포매팅

## 🚀 시작하기

### 필수 요구사항

- **Node.js**: >= 22
- **pnpm**: >= 10

> ⚠️ 이 프로젝트는 **pnpm**만 지원합니다. npm이나 yarn을 사용하면 설치가 차단됩니다.

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd GGLK-Web

# 의존성 설치
pnpm install
```

## 📁 프로젝트 구조

```
GGLK-Web/
├── app/                          # 애플리케이션 소스 코드
│   ├── api/                      # API 관련 코드
│   │   ├── endpoints/            # API 엔드포인트 (Orval로 자동 생성)
│   │   ├── model/                # API 모델 타입 (Orval로 자동 생성)
│   │   └── mutator/              # API 클라이언트 커스터마이징
│   ├── routes/                   # 라우트 컴포넌트
│   │   ├── home.tsx              # 홈 페이지
│   │   ├── analyze/              # 패션 분석 플로우
│   │   │   ├── analyze.tsx       # 이미지 업로드
│   │   │   ├── intensity-select.tsx  # 강도 선택
│   │   │   └── image-studio.tsx  # 이미지 스튜디오
│   │   ├── result/               # 결과 페이지
│   │   └── auth/                 # 인증 관련
│   ├── shared/                   # 공유 리소스
│   │   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── hooks/                # 커스텀 훅
│   │   ├── utils/                # 유틸리티 함수
│   │   ├── stores/               # 상태 저장소
│   │   └── types/                # 타입 정의
│   ├── assets/                   # 정적 에셋 (SVG, 이미지 등)
│   ├── db.ts                     # IndexedDB 설정
│   ├── env.ts                    # 환경 변수 검증
│   └── root.tsx                  # 루트 컴포넌트
├── public/                       # 정적 파일
│   ├── fonts/                    # 폰트 파일
│   └── png/                      # 이미지 파일
├── build/                        # 빌드 출력 디렉토리
├── biome.json                    # Biome 설정
├── lefthook.yml                  # Git hooks 설정
├── orval.config.ts               # API 생성 설정
├── tsconfig.json                 # TypeScript 설정
├── vite.config.ts                # Vite 설정
└── package.json                  # 프로젝트 메타데이터
```
