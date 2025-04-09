# 🌍 GlobalNomad

"누구나 체험을 등록하고, 누구나 함께할 수 있는 문화 공유 플랫폼"
> 이 프로젝트는 프론트엔드 팀 프로젝트로 진행되었으며,  
> 최신 기술 스택과 효율적인 협업 방식을 통해 직관적인 사용자 경험을 지향합니다.

---

## 📌 프로젝트 소개

- **📅 프로젝트 기간**: 2025.03.10 ~ 2025.04.17
- **🌐 프로젝트 개요**:  
  GlobalNomad는 누구나 체험을 등록하고, 다른 사람들의 체험에 자유롭게 참여할 수 있는 체험 공유 플랫폼입니다.
  체험 등록자는 날짜와 시간대를 설정해 다양한 체험을 올릴 수 있고, 참여자는 원하는 체험을 선택해 예약을 할 수 있습니다.
  예약은 승인 또는 거절할 수 있으며 체험이 완료된 후에는 리뷰를 남겨 경험을 공유할 수 있습니다.

- **🚀 개발 목표 및 차별점**:
  - 최신 기술 스택 (**Next.js App Router**, **React Query** 등)을 활용한 **빠르고 직관적인 사용자 경험 제공**
  - **실제 사용자 시나리오 기반의 기능 설계** (예: 예약 신청, 후기 작성, 체험 관리 등)
  - **공통 컴포넌트화 및 코드 컨벤션** 정립을 통한 팀원 간 효율적인 협업 구조

 ### 🔗 배포 링크  
👉 [GlobalNomad 서비스 바로가기](https://globalnomad-9a8d.vercel.app/)  


---

## 🛠️ 주요 기술 스택

| 기술 | 설명 |
|------|------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) | SSR + CSR 혼합 기반의 리액트 프레임워크 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | 타입 안정성과 코드 자동 완성 지원 |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | 유틸리티 기반 반응형 CSS 프레임워크 |
| ![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat&logo=react-query&logoColor=white) | 서버 상태 관리 및 데이터 캐싱 |
| ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat&logo=reacthookform&logoColor=white) | 효율적인 폼 상태 관리 |
| ![Zod](https://img.shields.io/badge/Zod-0B122B?style=flat&logo=zod&logoColor=white) | 타입 기반 스키마 유효성 검사 |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | API 통신을 위한 HTTP 클라이언트 |
| ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white) | UI 컴포넌트 문서화 및 독립적 개발 도구 |
| ![React Calendar](https://img.shields.io/badge/React%20Calendar-3D7EBB?style=flat&logo=react&logoColor=white) | 예약일 선택을 위한 달력 컴포넌트 |
| ![Kakao Maps SDK](https://img.shields.io/badge/Kakao%20Maps%20SDK-FFCD00?style=flat&logo=kakao&logoColor=black) | 체험 위치 기반 지도 시각화 구현 |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | 정적 웹사이트 및 서버리스 기능 기반의 클라우드 배포 플랫폼 |

---

## 👥 Team Members & Roles

| 박나겸 (팀장) | 김소영 | 김혜선 | 김휘송 | 이유섭 |
|--------------|--------|--------|--------|--------|
| <img src="https://github.com/nagyum.png" width="100" /> | <img src="https://github.com/kimsoyoung96.png" width="100" /> | <img src="https://github.com/llllliii88iiilllll.png" width="100" /> | <img src="https://github.com/qpalkim.png" width="100" /> | <img src="https://github.com/charie95.png" width="100" /> |
| [GitHub](https://github.com/nagyum) | [GitHub](https://github.com/kimsoyoung96) | [GitHub](https://github.com/llllliii88iiilllll) | [GitHub](https://github.com/qpalkim) | [GitHub](https://github.com/charie95) |

### 🔧 Roles

#### 박나겸
- 로그인/회원가입 , 내정보, 체험관리, 공통컴포넌트

#### 김소영
- 예약현황, 공통컴포넌트, 공통API

#### 김혜선
- 체험상세, 공통컴포넌트, 공통API

#### 김휘송
- 체험목록, 체험관리, 랜딩, 공통컴포넌트

#### 이유섭
- 예약내역, 공통컴포넌트, 공통API

---

## 📚 주요 기능 소개

- **랜딩 페이지**: 서비스 소개 및 사용자 흐름 안내
- **회원가입 / 로그인**: 소셜 로그인 (카카오, 구글) 지원
- **체험 목록 페이지**: 필터/정렬 기능, 상세 페이지 연결
- **체험 상세 페이지**: 시간/인원 선택 → 예약 가능, Kakao 지도 기반 체험 장소 시각화
- **내 정보 페이지**: 닉네임 및 비밀번호 변경, 프로필 이미지 수정
- **예약 내역 페이지**: 예약 상태별 필터 및 후기 작성
- **내 체험 관리 페이지**: 등록한 체험 수정 및 신청자 관리
- **예약 현황 페이지**: 등록한 체험에 대한 예약 스케줄 관리
- **알림창**: 알림창을 이용한 예약상태에 대한 관리 

---

## 💡 프로젝트 특징 및 구현 포인트

- `Next.js App Router` 기반의 라우팅/레이아웃 구조화
- 예약 상태, 유저 역할에 따른 동적 렌더링
- `React Query`로 API 상태 관리 최적화
- 공통 컴포넌트 구조 (`Button`, `Modal`, `Dropdown` 등) 설계
- `Zod + React Hook Form` 조합으로 안전한 폼 유효성 검사
- `Tailwind CSS` 기반 반응형 UI + Skeleton 구현
- 외부 라이브러리 커스터마이징: `react-calendar`, `Kakao Maps SDK`

---

## 🤝 협업 방식

- GitHub Project + Notion으로 역할 분담 및 일정 관리
- PR 기반 개발 + 코드 리뷰로 협업 효율 및 품질 향상
- 공통 코드 컨벤션 및 ESLint / Prettier 설정
- Figma 시안 기반 컴포넌트 구조 설계
- 브랜치 전략: `main`, `dev`, `feat/*`, `fix/*`, `refactor/*` 로 역할 구분
