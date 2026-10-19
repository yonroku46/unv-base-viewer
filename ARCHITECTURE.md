# ARCHITECTURE.md

이 문서는 본 프로젝트의 디렉토리 구조, 패키지 경계, 그리고 **변경 유형별 시작 경로(Starting Paths)**를 정의하는 아키텍처 지도입니다.
새로운 서비스를 구축하거나 기능을 확장할 때 모든 AI 에이전트는 이 지도를 기반으로 올바른 진입점을 찾아야 합니다.

---

## 1. 변경 유형별 시작 경로 (Starting Paths by Change Type)

AI 에이전트는 사용자의 요청 유형에 따라 아래의 시작 파일을 먼저 확인하고 작업을 진행해야 합니다.

| 변경 유형 | 시작 파일 / 디렉토리 | 작업 흐름 |
| :--- | :--- | :--- |
| **새로운 페이지(화면) 추가** | `src/app/<route>/page.tsx` | 1. `page.tsx` (SSR/메타데이터)<br>2. `*Client.tsx` (CSR 인터랙션)<br>3. `src/styles/pages/<route>.scss` |
| **새로운 백엔드 API 연동** | `src/api/module/ApiRoutes.ts` | 1. `ApiRoutes.ts` 엔드포인트 상수 등록<br>2. `src/types/global.d.ts` DTO 타입 선언<br>3. `src/api/service/*Service.ts` 싱글톤 함수 작성 |
| **전역 상태 추가 (Auth, Notification 등)** | `src/store/slice/` | 1. Slice 파일 생성/수정<br>2. `src/store/index.ts`의 `rootReducer` 및 `whitelist` 등록 |
| **공통 UI 컴포넌트 추가/수정** | `src/components/` | 1. `layout/`, `mui/` 등 적절한 서브디렉토리에 배치<br>2. 동반 스타일시트(`Component.scss`) 생성 |
| **색상, 여백, 폰트 등 디자인 토큰 변경** | `src/styles/base/_variables.scss` | 1. `_variables.scss` 토큰 수정<br>2. 필요한 경우 `_mixins.scss` 갱신 |
| **서비스명, 메타데이터 기본값, 포트 설정** | `src/config.ts` 및 `.env.development` | 1. `.env.development` 환경변수 추가<br>2. `src/config.ts` 빌드 설정에 매핑 |

---

## 2. 레이어 아키텍처 및 책임 경계

```
[Browser / User]
       │
       ▼
[src/app/ (Next.js App Router)]
   ├─ page.tsx (Server Component: SEO, 메타데이터, 초기 SSR 데이터 페칭)
   └─ *Client.tsx (Client Component: 브라우저 이벤트, 로컬 상태)
       │
       ├─ [src/components/] (MUI 래퍼 및 공통 UI)
       │      └─ *.scss (컴포넌트 단위 스타일시트)
       │
       ├─ [src/store/] (Redux Toolkit: auth/notification 등 영속 전역 상태)
       │
       └─ [src/api/] (중앙화된 API 계층)
              ├─ index.ts (Axios 싱글톤: 인터셉터, 토큰 주입, 공통 헤더)
              ├─ module/ApiRoutes.ts (엔드포인트 URL 레지스트리)
              └─ service/*Service.ts (도메인별 비즈니스 API 호출 함수)
```

### 2.1. SSR / CSR 경계 (Dual-File Pattern)
- 공개/검색 엔진 노출이 필요한 모든 페이지는 Server Component와 Client Component로 분리합니다.
- 서버 컴포넌트(`page.tsx`)에서 메타데이터(`generateMetadata`)와 초기 데이터 페칭을 수행하여 클라이언트 컴포넌트에 props로 넘깁니다.

### 2.2. API 계층 원칙
- UI 컴포넌트 내부에서 `axios`나 `fetch`를 직접 호출하지 않습니다.
- 반드시 `src/api/service/*Service.ts`에 정의된 비즈니스 함수를 경유하며, 모든 호출은 `src/api/index.ts`의 싱글톤 인스턴스를 통과합니다.

### 2.3. 스타일링 계층 원칙
- CSS-in-JS, Tailwind CSS, CSS Module(`.module.scss`)은 사용하지 않습니다.
- BEM 네이밍 기반의 컴포넌트 동반 SCSS(`Component.scss`) 또는 페이지 SCSS(`src/styles/pages/*.scss`)를 작성합니다.
- 모든 스타일은 `src/styles/base/_variables.scss`의 CSS 변수 토큰을 소비해야 합니다.
