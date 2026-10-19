# AGENTS.md

> 본 저장소에서 작업하는 모든 AI 에이전트가 준수해야 하는 실행 프로토콜, 아키텍처 경계 및 기술 지침서입니다.
> 작업을 시작하기 전에 아래의 프로토콜과 참조 문서를 반드시 확인해야 합니다.
>
> 🧭 **핵심 참조 문서**:
> - [ARCHITECTURE.md](ARCHITECTURE.md): 변경 유형별 시작 경로 및 레이어 책임 지도
> - [TECH.md](TECH.md): 10가지 절대 금지 규칙(Negative Constraints) 및 타입/스타일 컨벤션
> - [.agents/learnings/](.agents/learnings/): 에이전트 지식 베이스 및 과거 이슈 해결 기록

---

## 1. AI 에이전트 실행 프로토콜 (Agent Workflow)

에이전트는 모든 작업 수행 시 다음 6단계를 순서대로 진행합니다:

```
[Phase 1: Explore] ──> [Phase 2: Check Learnings] ──> [Phase 3: Plan]
                                                           │
[Phase 6: Record Learnings] <── [Phase 5: Validate] <── [Phase 4: Implement]
```

1. **Phase 1: Explore & Context (맥락 탐색)**
   - 작업 시작 전 관련 코드, 디렉토리 구조, `package.json` 의존성을 확인합니다.
2. **Phase 2: Check Learnings (지식 베이스 확인)**
   - [`.agents/learnings/`](.agents/learnings/) 디렉토리를 탐색하여 작업하려는 분야(`scope`)의 선행 학습 및 실수 방지 노트를 읽습니다.
3. **Phase 3: Plan & Design (설계 및 계획)**
   - SSR/CSR 경계, 상태 관리 범위, 스타일링 가이드를 고려한 계획을 수립합니다.
4. **Phase 4: Implement (구현)**
   - 프로젝트의 단일 책임 원칙, TypeScript 엄격 타입, 전역 SCSS 토큰을 사용하여 구현합니다.
5. **Phase 5: Validate (실행 검증 - 필수)**
   - 코드를 작성한 후 **반드시 검증 명령어를 실행하여 성공 여부를 확인**합니다:
     - 린트 검증: `yarn lint`
     - 빌드 검증: `yarn build`
6. **Phase 6: Record Learnings (피드백 및 교훈 기록)**
   - 사용자에게 새로운 피드백이나 수정을 받았거나, 빌드/의존성 문제를 해결한 경우 [`.agents/learnings/entries/<id>.md`](.agents/learnings/entries/)에 새로운 학습 내용을 기록하여 이후 작업에서도 지속적으로 개선되도록 합니다.

---

## 2. 프로젝트 정체성 및 언어 처리 원칙 (Language Protocol)

- **타겟 서비스 환경**: 일본 (`Asia/Tokyo`, `ja`).
- **에이전트 소통 언어**: 사용자와의 대화, 요구사항 접수, 커밋 메시지, 내부 기술 문서(`AGENTS.md`, `learnings`, `skills`)는 **한국어**로 작성합니다.
- **코드 생성 언어 (Strict Constraint)**:
  - 사용자가 한국어로 작업을 지시하더라도, **모든 사용자 대면 텍스트(UI 라벨, 버튼명, 다이얼로그 문구, 스낵바 알림, 메타데이터 타이틀/설명, 플레이스홀더)**는 반드시 자연스러운 **일본어(丁寧語/敬体: です・ます)**로 생성합니다.
  - 임의로 한국어 텍스트나 직역투 기계번역을 UI에 노출하지 않습니다.
- **기술 스택**: Next.js 15+ (App Router), React 19, TypeScript 5, SCSS (`sass`), MUI v6, Redux Toolkit.
- **백엔드 통신**: Spring Boot / REST API (중앙 Axios 인스턴스 경유).

---

## 3. 핵심 아키텍처 및 경계 규칙 (Core Architecture Boundaries)

### 3.1. SSR / CSR 분리 (`*Client.tsx` 듀얼 파일 패턴)
- 공개/인덱싱 대상 페이지는 반드시 **듀얼 파일 패턴**을 따릅니다:
  - `page.tsx`: Server Component. `generateMetadata()`, 정적 렌더링, SEO 담당.
  - `*Client.tsx`: Client Component (`"use client"`). 브라우저 전용 상태 및 인터랙션 담당.
- 관리자/대시보드와 같은 100% 인증 기반 인터랙티브 페이지는 `"use client"` 단독 사용 가능.

### 3.2. 상태 관리 경계 (State Boundary)
- **Redux Toolkit (`@/store`)**: `auth`, `notification` 등 전역으로 유지되어야 하고 로컬 스토리지에 영속화(persist)되는 상태에만 제한적으로 사용합니다.
- 임의의 기능별 슬라이스를 무분별하게 Redux에 추가하지 않습니다.
- 불필요한 서드파티 서버 상태 라이브러리(SWR, React Query, Zustand 등)를 중복 도입하지 않습니다.

### 3.3. API 통신 규약 (API Layer)
- 브라우저 네이티브 `fetch()`나 ad-hoc Axios 인스턴스를 직접 생성하지 않습니다.
- 모든 API 요청은 싱글톤 인스턴스인 `@/api` (`ApiInstance`) 및 `@/api/service/*Service.ts`를 경유합니다.
- 백엔드 엔드포인트 URL 상수는 `src/api/module/ApiRoutes.ts`에 집중 관리합니다.

### 3.4. 스타일링 및 디자인 시스템 경계
- **CSS Modules(`.module.scss`) 및 Tailwind CSS는 사용하지 않습니다.**
- JSX 내 인라인 스타일(`style={{ ... }}`) 및 MUI `sx={{ ... }}`의 남발을 금지합니다.
- 컴포넌트 동반 스타일시트(`Component.scss`) 또는 `src/styles/pages/*.scss`를 사용합니다.
- 색상, 여백, 그림자, 높이는 `src/styles/base/_variables.scss` 및 `_mixins.scss`의 변수를 사용합니다.

### 3.5. 표준 래퍼 라이브러리 준수
- **날짜/시간**: 순수 `dayjs`를 직접 임포트하지 않고, 타임존(`Asia/Tokyo`)과 로케일(`ja`)이 사전 설정된 `@/common/lib/Dayjs`를 임포트합니다.
- **사용자 피드백**: 브라우저 네이티브 `alert()`를 사용하지 않고, `notistack`의 `useSnackbar()`를 사용합니다.
- **모달/다이얼로그**: 모바일 뒤로가기(`popstate`)를 안전하게 처리하는 `@/components/mui/MuiDialog`를 사용합니다.

---

## 4. 검증 명령어 (Validation Commands)

모든 작업 완료 후 에이전트는 아래 명령을 순차적으로 실행하여 검증합니다:

```bash
# 린트 검증
yarn lint

# 프로덕션 빌드 검증 (타입 체크 및 정적 페이지 생성 포함)
yarn build
```
