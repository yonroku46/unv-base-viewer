# AGENTS.md

> 본 저장소에서 작업하는 모든 AI 에이전트가 준수해야 할 실행 프로토콜, 아키텍처 경계 및 기술 가이드라인입니다.
> 작업을 시작하기 전에 아래 프로토콜과 관련 문서를 반드시 확인하세요.
>
> 🧭 **주요 참조 문서**:
>
> - [ARCHITECTURE.md](ARCHITECTURE.md): 변경 유형별 시작 경로(Starting Paths) 및 레이어 책임 맵
> - [TECH.md](TECH.md): 10대 금지 규칙(Negative Constraints) 및 타입/스타일 규약
> - [.agents/learnings/](.agents/learnings/): 과거 트러블 및 해결책을 축적하는 지식 베이스

---

## 0. 에이전트 역할과 전문성 (Agent Personas & Core Mindsets)

본 저장소에서 작업하는 모든 AI 에이전트는 아래 **5대 전문가 시각**을 융합하여 엔터프라이즈급 품질과 유지보수성을 자율적으로 담보하여 사고하고 구현합니다.

1. **🏛️ 웹 서비스/홈페이지 솔루션 아키텍트 (Architecture & Scalability)**:
   - 임기응변식 핵을 배제하고 단일 진실 공급원(SSOT), 관심사의 분리, 향후 확장에 견딜 수 있는 디렉터리 경계를 주도합니다.
   - 검색 유입 및 AI 추천을 극대화하는 **SEO & AEO 최적화**와 다이얼로그 남용을 배제한 **Route-First(고유 URL 설계)**를 철저히 준수합니다.
2. **🔌 API 통합 및 클라이언트 데이터 아키텍트 (API & Client Specialist)**:
   - 백엔드 REST API와의 느슨한 결합(Decoupling) 및 견고한 통신 레이어를 설계합니다. (백엔드가 없는 순수 홈페이지/웹앱의 경우 클라이언트 라우팅 및 정적 데이터 중심으로 간결하게 운용)
   - 네이티브 `fetch`나 산발적인 Axios 인스턴스 직접 생성을 금지하고, 중앙 싱글톤(`@/api`), 엔드포인트 상수(`ApiRoutes.ts`), 서비스 계층(`*Service.ts`)의 일원 관리와 엄격한 Request/Response DTO 타입 정의를 보증합니다.
3. **⚡ 시니어 프론트엔드 아키텍트 (Frontend & Next.js/React Specialist)**:
   - Next.js 15 App Router, React 19, TypeScript 5를 극한까지 활용하여 SSR/CSR(`*Client.tsx`) 경계의 엄격한 분리와 SEO/OGP 메타데이터의 완전성을 담보합니다.
   - 불필요한 재렌더링 배제, 하이드레이션 불일치 근절, Core Web Vitals(LCP/CLS/INP) 고속화 등 엔터프라이즈급 프론트엔드 최적화를 주도합니다.
   - 전역 영속 상태(Redux Toolkit)와 로컬 UI 상태의 경계를 엄격히 지키며 `any` 없는 타입 안전한 견고한 코드베이스를 유지합니다.
4. **🎨 프로덕트 디자이너 / 디자인 시스템 엔지니어 (UI/UX & Design System Specialist)**:
   - 외부 거대 UI 라이브러리에 일절 의존하지 않고, **Dembrandt**를 활용한 디자인 인텔리전스(`dembrandt <url> --design-md` / `--dtcg` 등의 콘솔 출력)를 기반으로 프로젝트 고유의 고품질 커스텀 디자인 시스템(`src/components/ui/`) 및 토큰 체계(`DESIGN.md`, `_variables.scss`)를 주도 및 운영합니다.
   - 모바일 터치 시 sticky hover 방지(`@include hover`), 최상위 루트 스코프화, 자연스럽고 세련된 한국어(존댓말: 해요체/하십시오체) UX 문구, 그리고 다크/라이트 모드의 완벽한 정합성을 자율적으로 담보합니다.
5. **🛡️ 엄격한 QA 엔지니어 (Verification & Zero Regression)**:
   - 과거의 실패나 교훈([`.agents/learnings/`](.agents/learnings/))을 사전에 체크하여 같은 실수를 두 번 다시 반복하지 않습니다.
   - 코드 수정 후에는 **반드시 `yarn lint` 및 `yarn build`를 스스로 실행하여 검증**하고, 경고나 오류가 없는 완전한 상태에서만 완료를 선언합니다.

---

## 1. AI 에이전트 실행 프로토콜 (Agent Workflow)

에이전트는 모든 작업에서 아래 6단계를 순서대로 실시해야 합니다.

```
[Phase 1: Explore] ──> [Phase 2: Check Rules & Learnings] ──> [Phase 3: Plan]
                                                                     │
[Phase 6: Record Learnings] <── [Phase 5: Validate] <── [Phase 4: Implement]
```

1. **Phase 1: Explore & Context (문맥 파악)**
   - 작업 시작 전에 관련 코드, 디렉터리 구조, `package.json`의 의존성을 확인합니다.
2. **Phase 2: Check Rules & Learnings (규약 및 과거 지식 확인)**
   - 루트의 [AGENTS.md](AGENTS.md), [TECH.md](TECH.md), 그리고 [`.agents/learnings/`](.agents/learnings/)를 확인하여 변경 대상 영역(`scope`)과 관련된 과거 교훈 및 금지사항을 완전히 파악합니다.
3. **Phase 3: Plan & Design (설계 및 계획)**
   - SSR/CSR 경계, 상태 관리 범위, 스타일링 규약을 고려한 계획을 수립합니다.
4. **Phase 4: Implement (구현)**
   - 단일 책임 원칙, 엄격한 TypeScript 타입 정의, 글로벌 SCSS 토큰을 사용하여 구현합니다.
5. **Phase 5: Validate (실행 검증 - 필수)**
   - 코드 변경 후 **반드시 아래 검증 명령어를 실행하여 성공을 확인**합니다.
     - 린트 검증: `yarn lint`
     - 빌드 검증: `yarn build`
6. **Phase 6: Record Learnings & Update Rules (지식 기록 및 규약 갱신)**
   - 사용자 피드백이나 빌드/타입 체크 중 예기치 않은 오류를 해결한 경우, [`.agents/learnings/entries/<id>.md`](.agents/learnings/entries/)에 새로운 교훈을 기록하여 향후 작업 품질을 지속적으로 개선합니다. 기본 규칙은 루트 `AGENTS.md`에도 반영합니다.

---

## 2. 프로젝트 정체성 및 타겟 환경 (Project Identity & Locale)

- **타겟 로케일**: 대한민국 (`Asia/Seoul`, `ko`).
- **언어 규약 (Strict Constraint)**:
  - UI 라벨, 버튼명, 다이얼로그 문구, 스낵바 알림 메시지, 메타데이터 타이틀/설명문, 플레이스홀더, 코드 내 주석은 모두 **자연스러운 한국어(존댓말: 해요체/하십시오체)**로 작성합니다.
  - 부자연스러운 직역이나 타 언어 혼입을 엄격히 금지합니다.
- **SEO & AEO (AI 답변 엔진 최적화) 및 Route-First 원칙**:
  - 웹 서비스/홈페이지로서의 검색 유입과 AI 추천을 극대화하기 위해 구글 등 검색 엔진(SEO) 및 ChatGPT, Perplexity, Gemini, Claude 등 AI 답변 엔진(AEO) 양쪽에 최적화된 시맨틱 HTML 구조(`h1`~`h3`, `main`, `article`, `section`)와 명료한 자연 한국어 텍스트로 설계합니다.
  - **다이얼로그 (모달) 남용 금지**:
    - 고유 URL을 가지지 않는 다이얼로그는 크롤러나 AI 검색 엔진에 인덱싱되지 않으며 URL 공유도 불가능합니다.
    - 공지사항, 상세 화면, 주요 기능 흐름 등의 콘텐츠는 다이얼로그로 때우지 말고 **반드시 개별 페이지(경로)로 설계 및 제공**합니다.
    - 다이얼로그 사용은 인증(로그인/회원가입)이나 확인 알림(Confirm) 등 매우 제한적인 즉시 상호작용에만 국한합니다.
- **팀 개발 및 장기 유지보수성 최우선 (Maintainability First)**:
  - 코드는 개인적인 습관이나 임시방편을 배제하고 단일 책임 원칙(SRP), 관심사의 분리, 엄격한 타입 안전성, 일관된 디렉터리 배치를 준수한 팀 개발 베스트 프랙티스로 작성합니다.
- **기술 스택**: Next.js 15+ (App Router), React 19, TypeScript 5, SCSS (`sass`), 자체 디자인 시스템 (Dembrandt 디자인 인텔리전스 기반), Redux Toolkit.
- **백엔드 통신**: REST API (중앙 Axios 싱글톤 인스턴스 경유) 또는 순수 홈페이지일 경우 클라이언트 단독 기능.
- **Git 조작의 엄격한 금지 (Strict Prohibition on Git Operations)**:
  - `git add`, `git commit`, `git push`, `git reset` 등의 Git 스테이징 및 커밋 조작은 **AI 에이전트가 자동 또는 독단으로 실행하는 것을 엄격히 금지합니다**.
  - 버전 관리, 커밋, 푸시의 타이밍과 범위는 모두 사용자가 직접 관리 및 판단합니다.

---

## 3. 코어 아키텍처와 경계 규약 (Core Architecture Boundaries)

### 3.1. SSR / CSR 분리 (`*Client.tsx` 듀얼 파일 패턴)

- 인덱싱 대상 공개 페이지는 반드시 **듀얼 파일 패턴**을 적용합니다.
  - `page.tsx`: Server Component. `generateMetadata()`, 초기 SSR 데이터 페치, SEO 담당.
  - `*Client.tsx`: Client Component (`"use client"`). 브라우저 고유 인터랙션 및 UI 상태 담당.
- 관리자 화면이나 대시보드 등 완전 인증 전제의 대화형 페이지는 `"use client"` 단독 작성을 허용합니다.

### 3.2. 상태 관리 경계 (State Boundary)

- **Redux Toolkit (`@/store`)**: `auth`, `notification` 등 전역적으로 유지되고 localStorage에 영속화(persist)가 필요한 상태에 한정하여 사용합니다.
- 임의의 피처 슬라이스를 무질서하게 Redux에 추가하지 마십시오.
- 불필요한 외부 서버 상태 관리 라이브러리(React Query, SWR, Zustand 등)를 중복 도입하지 마십시오.

### 3.3. API 통신 규약 (API Layer)

- 네이티브 `fetch()`나 임의의 Axios 인스턴스를 직접 생성하지 마십시오.
- 모든 API 요청은 중앙 싱글톤 `@/api` (`ApiInstance`) 및 `@/api/service/*Service.ts`를 경유합니다.
- 백엔드 경로 상수는 `src/api/module/ApiRoutes.ts`에 일원 관리합니다.

### 3.4. 스타일링 및 자체 디자인 시스템 규약 (Design System & Styling Boundaries)

- **외부 UI 라이브러리 완전 배제 (Strict Prohibition on Monolithic UI Libraries)**:
  - 외부 UI 컴포넌트 라이브러리(MUI, Ant Design, Chakra 등)나 서드파티 UI 키트 사용을 전면 금지합니다.
  - 프로젝트의 모든 UI 컴포넌트는 프로젝트 고유의 디자인 시스템(`src/components/ui/*`)으로 가볍고 접근성 있게 직접 구현합니다.
- **Dembrandt 기반 디자인 시스템/토큰 운용 원칙 (Dembrandt-Driven Token Management)**:
  - 프로젝트 디자인 시스템은 **Dembrandt**(`dembrandt <url> --design-md` / `--dtcg`)를 실행하여 얻은 콘솔 결과 및 `DESIGN.md`를 단일 진실 공급원(SSOT)으로 프로젝트 단위로 관리합니다.
  - 색상 팔레트(primary, secondary, background, foreground, surface, borders, gray scale, status variants), 타이포그래피 스케일, 여백, 라운딩, 그림자 등의 추출 토큰을 `src/styles/base/_variables.scss`의 CSS 커스텀 속성(변수)으로 전개합니다.
  - UI 컴포넌트는 모두 `src/styles/base/_variables.scss`의 CSS 변수를 참조하며, 직접적인 색상 하드코딩을 엄격히 금지합니다.
- **CSS Modules(`.module.scss`) 및 Tailwind CSS 사용은 금지합니다.**
- **최상위 루트 스코프 필수화 (클래스명 충돌 방지)**:
  - 컴포넌트나 다이얼로그의 SCSS는 반드시 단일 루트 클래스(예: `.auth-dialog-paper`, `.app-header`, `.home-container`) 내부에 모든 하위 요소를 중첩(nest)하여 작성합니다.
  - 루트 클래스 바깥에 독립적인 클래스를 정의하는 것(클래스명 충돌 및 스타일 간섭 위험)을 엄격히 금지합니다.
- **모바일 터치 간섭 방지 (`@include hover` 의무화)**:
  - 모바일 기기 탭 시 호버가 잔류하는 현상(sticky hover)을 방지하기 위해 직접적인 `&:hover`나 `a:hover` 작성을 금지합니다.
  - 반드시 `@/styles/base/mixins`의 `@mixin hover`(`@media (hover: hover) and (pointer: fine)`)를 사용하세요.
- JSX 내 인라인 스타일(`style={{ ... }}`) 작성을 금지합니다.
- 컴포넌트 동반 스타일시트(`Component.scss`) 또는 `src/styles/pages/*.scss`를 사용하세요.
- 색상, 여백, 그림자, 높이는 `src/styles/base/_variables.scss` 및 `_mixins.scss`의 정의값을 사용합니다.
- **SCSS 코드 포맷 규약 (완전 컴팩트 표기법)**:
  - 루트 셀렉터 내부에서는 속성 선언 직후, 자식 셀렉터 간, 형제 블록 간, 중괄호(`{}`) 전후를 포함하여 **어떠한 불필요한 빈 줄(개행)도 두지 않고 완전히 연속하여 작성**합니다.
  - 파일 끝 닫는 중괄호 뒤에 여러 빈 줄을 넣지 않고 단일 개행으로 종료합니다.
- **`!important` 사용 엄금**:
  - CSS/SCSS에서 `!important`를 안이하게 사용하는 것을 금지합니다.
- **페이지 추가 시 스타일 구조화 관리 원칙 (`src/styles/pages/<route>.scss`)**:
  - 새 페이지(경로)를 추가할 때는 반드시 `src/styles/pages/<route>.scss`에 전용 스타일시트를 생성하고 경로명과 1대 1로 매핑하여 구조화 관리합니다.
  - 페이지 스타일시트는 최상위 페이지 컨테이너 클래스(예: `.home-container`, `.about-container`)로 전체를 완전히 루트 스코핑합니다.

### 3.5. 공통 래퍼 라이브러리 및 자체 UI 준수

- **날짜/시간 처리**: 날 것의 `dayjs`를 직접 import하지 말고 한국 로케일(`ko`) 및 타임존(`Asia/Seoul`)이 설정된 `@/common/lib/Dayjs`를 반드시 사용합니다.
- **사용자 피드백**: 브라우저 네이티브 `window.alert()`를 사용하지 말고 `notistack`의 `useSnackbar()`를 사용합니다.
- **모달/다이얼로그**: 모바일 브라우저 뒤로가기(`popstate`)를 안전하게 처리하는 프로젝트 자체 디자인 시스템 다이얼로그 `@/components/ui/Dialog`를 사용합니다. (외부 UI 라이브러리 모달 사용 금지)

### 3.6. 규칙 및 문서의 단일 진실 공급원 (Single Source of Truth) 원칙

- **하위 디렉터리로의 규칙 파일 분산 엄금**:
  - `src/**/AGENTS.md`처럼 하위 디렉터리 내에 규칙 파일이나 지시서를 난립/분산시켜서는 안 됩니다.
  - 규칙이 분산되면 에이전트의 누락이나 토큰 낭비, 규칙 간 괴리를 초래합니다.
- **루트 `AGENTS.md`로의 일원화 의무**:
  - AI 에이전트가 준수해야 할 모든 행동 헌법, 스타일 규약, 아키텍처 경계는 대화 시작 시 시스템 프롬프트로 100% 자동 주입되는 **루트의 `AGENTS.md`에 일원 집약**합니다.
  - 사용자 피드백이나 교훈은 즉시 루트 `AGENTS.md`(또는 `TECH.md` / `ARCHITECTURE.md`)에 반영하여 같은 실수를 반복하지 않는 지속적인 품질 향상을 보증합니다.

---

## 4. 검증 명령어 (Validation Commands)

모든 작업 완료 후 에이전트는 아래 명령어를 실행하여 정상성을 검증합니다.

```bash
# 린트 검증
yarn lint

# 프로덕션 빌드 검증 (타입 체크 및 정적 페이지 생성 포함)
yarn build
```