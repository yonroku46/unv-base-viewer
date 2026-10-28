# ARCHITECTURE.md

본 문서는 본 프로젝트의 디렉터리 구조, 레이어 경계, 그리고 **변경 유형별 시작 경로(Starting Paths)**를 정의하는 아키텍처 설계서입니다.
새로운 서비스를 구축하거나 기능을 확장할 때, 모든 AI 에이전트는 이 설계서를 바탕으로 적절한 변경 지점을 식별해야 합니다.

---

## 1. 변경 유형별 시작 경로 (Starting Paths by Change Type)

AI 에이전트는 작업 내용에 따라 아래 기점 파일을 확인하고 구현을 시작하세요.

| 변경 유형 | 기점 파일 / 디렉터리 | 작업 흐름 |
| :--- | :--- | :--- |
| **신규 페이지(화면) 추가** | `src/app/<route>/page.tsx` | 1. `page.tsx` (SSR/메타데이터)<br>2. `*Client.tsx` (CSR 인터랙션)<br>3. `src/styles/pages/<route>.scss` |
| **신규 백엔드 API 연동** | `src/api/module/ApiRoutes.ts` | 1. `ApiRoutes.ts`에 엔드포인트 상수 등록<br>2. `src/types/global.d.ts`에 DTO 타입 정의<br>3. `src/api/service/*Service.ts`에 서비스 클래스/함수 작성 |
| **전역 상태 추가 (Auth, Notification 등)** | `src/store/slice/` | 1. Slice 파일 생성 및 업데이트<br>2. `src/store/index.ts`의 `rootReducer` 및 `whitelist`에 등록 |
| **공통 UI 컴포넌트 추가/변경** | `src/components/ui/` | 1. `src/components/ui/<Component>/`에 자체 완결형 컴포넌트 배치<br>2. 동반 스타일시트(`Component.scss`) 작성 |
| **색상/여백/폰트 등 디자인 변경** | `DESIGN.md` 및 `src/styles/base/_variables.scss` | 1. Dembrandt로부터 토큰 추출 또는 업데이트<br>2. `DESIGN.md` 및 `_variables.scss`의 CSS 변수 갱신<br>3. 필요 시 `_mixins.scss` 갱신 |
| **서비스명/메타데이터 초기값/설정값** | `src/config.ts` 및 `.env.development` | 1. `.env.development`에 환경변수 추가<br>2. `src/config.ts` 설정 객체에 매핑 |

---

## 2. 레이어 아키텍처와 책임 경계

```
[Browser / User]
       │
       ▼
[src/app/ (Next.js App Router)]
   ├─ page.tsx (Server Component: SEO, 메타데이터, 초기 SSR 데이터 페치)
   └─ *Client.tsx (Client Component: 브라우저 이벤트, 로컬 상태)
       │
       ├─ [src/components/ui/] (Dembrandt 토큰 기반 자체 디자인 시스템 UI)
       │      └─ <Component>/ (Component.tsx + Component.scss)
       ├─ [src/components/layout/] (Header, Footer 등 공통 셸)
       │
       ├─ [src/store/] (Redux Toolkit: auth/notification 등 영속 전역 상태)
       │
       └─ [src/api/] (중앙집권형 API 레이어 - API 연동 시)
              ├─ index.ts (Axios 싱글톤: 인터셉터, 인증 헤더 자동 부여)
              ├─ module/ApiRoutes.ts (엔드포인트 상수 레지스트리)
              └─ service/*Service.ts (도메인별 API 호출 함수)
```

### 2.1. SSR / CSR 경계 (듀얼 파일 패턴)
- 인덱싱 대상 공개 페이지는 반드시 Server Component와 Client Component로 분리합니다.
- Server Component(`page.tsx`)에서 메타데이터(`generateMetadata`) 및 초기 데이터 취득을 수행하고, Client Component에 props로 전달합니다.

### 2.2. API 레이어 원칙
- UI 컴포넌트 내부에서 직접 `axios`나 `fetch`를 호출해서는 안 됩니다.
- 반드시 `src/api/service/*Service.ts`에 정의된 비즈니스 함수를 경유하며, 모든 요청은 `src/api/index.ts`의 싱글톤 인스턴스를 통과합니다. (백엔드가 없는 순수 웹사이트/홈페이지의 경우 클라이언트 라우팅 및 컴포넌트로만 간결하게 구성)

### 2.3. 스타일링 및 자체 디자인 시스템 레이어 원칙 (Dembrandt 연동)
- **외부 UI 라이브러리 배제**:
  - 서드파티 UI 컴포넌트 라이브러리는 사용하지 않으며, 모두 `src/components/ui/`에 프로젝트 고유의 자체 디자인 시스템으로 구축합니다.
- **Dembrandt를 통한 토큰 관리 (단일 진실 공급원)**:
  - 각 프로젝트의 디자인 시스템은 **Dembrandt**(`dembrandt <url> --design-md` / `--dtcg`)의 콘솔/마크다운 출력을 `DESIGN.md`에 집약하여 관리합니다.
  - `DESIGN.md`에 규정된 토큰(색상, 타이포그래피, 간격, 모서리 라운딩, 그림자)을 `src/styles/base/_variables.scss`의 CSS 변수로 바인딩하여 라이트/다크 양쪽 테마에 대응합니다.
- CSS-in-JS, Tailwind CSS, CSS Modules(`.module.scss`)는 사용하지 않습니다.
- **페이지 스타일 구조화 (`src/styles/pages/<route>.scss`)**:
  - 신규 페이지(화면)를 추가할 때는 반드시 `src/styles/pages/<route>.scss`에 전용 스타일시트를 생성하고 경로명과 1대 1로 구조화 관리합니다.
  - 최상위 페이지 컨테이너 클래스(예: `.home-container`)로 전체를 완전히 루트 스코핑합니다.
- 모든 스타일은 `src/styles/base/_variables.scss`의 CSS 변수를 참조하세요.

### 2.4. SEO / AEO 및 Route-First 설계 원칙 (다이얼로그 남용 금지)
- **검색 엔진 (SEO) 및 AI 답변 엔진 (AEO) 최적화**:
  - 웹 서비스/홈페이지로서의 노출을 높이기 위해 시맨틱 HTML 구조(`h1`~`h3`, `main`, `article`, `section`)와 명료한 한국어 콘텐츠로 구축합니다.
- **Route-First 원칙 (다이얼로그 남용 금지)**:
  - 모달 다이얼로그는 크롤러나 AI 검색 엔진에 인덱싱되지 않으며 URL 직접 공유도 불가능합니다.
  - 공지사항, 상세 정보, 주요 기능 흐름은 다이얼로그로 때우지 말고 고유 URL을 갖는 독립적인 페이지(경로)로 설계합니다.
  - 다이얼로그 사용은 인증(로그인/회원가입)이나 일시적인 확인(Confirm) 등 단기 상호작용에만 한정합니다.