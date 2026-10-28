# TECH.md

본 문서는 본 프로젝트의 코드 품질, 타입 안전성, 의존성 관리, 그리고 **AI 에이전트가 엄격히 준수해야 할 금지 규칙(Negative Constraints)**을 규정합니다.

---

## 1. 금지 규칙 (Negative Constraints - STRICT)

에이전트는 아래 항목을 위반해서는 안 되며, 위반한 코드는 작업 완료로 간주되지 않습니다.

1. **`any` 타입 및 안이한 타입 단언(Type Assertion) 금지**:
   - `any` 사용을 원칙적으로 금지하며 구체적인 인터페이스나 유니온 타입을 정의합니다. `as unknown as Type` 같은 이중 단언도 금지합니다.
2. **타입 전용 임포트 분리 (`import type`)**:
   - 런타임 번들에 포함되지 않는 타입은 반드시 `import type { ... } from '...'` 로 명시적으로 임포트합니다.
3. **날것의 `fetch` 및 임의의 `axios` 인스턴스 직접 생성 금지**:
   - 컴포넌트나 서비스에서 브라우저 네이티브 `fetch()`나 `axios.create()`를 직접 호출해서는 안 됩니다. 반드시 `@/api` (`ApiInstance`) 및 서비스 레이어를 사용하세요. (백엔드가 없는 홈페이지는 클라이언트 라우팅 및 상태 위주로 구성)
4. **날것의 `dayjs` 직접 임포트 금지**:
   - `import dayjs from 'dayjs'`를 직접 호출하지 말고 한국 표준시(`Asia/Seoul`) 및 한국어 로케일(`ko`)이 설정된 `@/common/lib/Dayjs`를 사용합니다.
5. **브라우저 표준 `alert()` / `confirm()` 금지**:
   - 사용자 피드백에는 `notistack`의 `useSnackbar()` 또는 자체 디자인 시스템의 `@/components/ui/Dialog`를 사용합니다.
6. **인라인 스타일 금지 및 디자인 시스템 토큰 참조 철저**:
   - JSX 내 `style={{ ... }}` 작성을 금지합니다. `DESIGN.md` 및 `_variables.scss`에 정의된 토큰(`var(--primary-color)` 등)을 참조하는 SCSS 클래스를 정의하세요.
7. **외부 패키지 무단 추가 금지**:
   - 사용자의 명시적 허가 없이 Zustand, SWR, React Query, Tailwind, Lodash 등의 서드파티 라이브러리를 임의로 설치해서는 안 됩니다.
8. **불필요한 Redux Slice 추가 금지**:
   - Redux Toolkit 스토어(`@/store`)는 `auth`나 `notification` 등 localStorage 영속화가 필요한 상태에만 한정합니다. 화면 고유 로컬 상태는 `useState`나 React Context를 사용합니다.
9. **UI의 비한국어 노출 금지 (자연스러운 한국어 전용)**:
   - UI 라벨, 버튼명, 다이얼로그 문구, 에러 메시지, 플레이스홀더, 메타데이터는 모두 자연스러운 한국어(해요체/하십시오체)로 작성합니다.
10. **미검증 상태에서의 작업 완료 선언 금지**:
    - 코드 수정 후 `yarn lint` 및 `yarn build`를 실행하여 에러가 완전히 해소되었음을 확인하지 않고 작업을 종료하는 것을 금지합니다.
11. **Git 조작(commit / add / push)의 자동 실행 엄금**:
    - `git add`, `git commit`, `git push`, `git reset` 등의 Git 조작을 AI 에이전트가 자동 또는 독단으로 실행하는 것을 엄격히 금지합니다. 커밋과 스테이징의 판단 및 실행은 사용자가 직접 수행합니다.
12. **`!important` 사용 금지 및 서드파티 거대 UI 라이브러리 완전 배제**:
    - 스타일 우선순위를 파괴하는 `!important` 사용을 원칙적으로 엄금합니다.
    - 외부 UI 라이브러리(MUI, AntD 등)에 의존하지 않고 Dembrandt에서 추출된 토큰(`DESIGN.md`) 기반의 자체 디자인 시스템 컴포넌트(`src/components/ui/*`)로 구축합니다.
13. **다이얼로그(모달) 남용 엄금 (SEO/AEO 및 Route-First 원칙)**:
    - 고유 URL을 갖지 않는 다이얼로그는 검색 엔진(SEO)이나 AI 답변 엔진(AEO)에 인덱싱되지 않으며 URL 공유도 불가능합니다. 공지사항, 상세 화면, 주요 기능 흐름을 다이얼로그로 때우지 말고 반드시 개별 페이지(경로)로 설계합니다. 다이얼로그는 인증 및 확인 알림 등 즉시 상호작용에만 한정합니다.

---

## 2. 코딩 규약 및 스타일

### 2.1. TypeScript 타입 정의
- 글로벌 엔티티/공통 DTO: `src/types/global.d.ts` 내 `declare global` 블록에 정의 (각 파일에서 import 불필요).
- 모듈 전용 로컬 DTO: 각 파일 상단에서 `export interface`로 정의.
- 고정 선택지에는 TypeScript `enum` 대신 문자열 리터럴 유니온 타입(`'USER' | 'ADMIN'`) 사용 권장.

### 2.2. CSS / SCSS 네이밍 규칙 (BEM 기법) 및 포맷 규약
```scss
// src/styles/pages/sample.scss
@use "../base/variables" as *;
@use "../base/mixins" as *;

.sample-container {
  max-width: 1200px;
  margin: 0 auto;
  .sample-card {
    background: var(--background);
    border: 1px solid var(--gray-alpha-100);
    &__title {
      font-size: 1.25rem;
      color: var(--foreground);
    }
    &--active {
      border-color: var(--primary-color);
    }
    .sample-btn {
      color: var(--foreground);
      @include hover {
        color: var(--primary-color);
        background-color: var(--gray-alpha-100);
      }
    }
  }
}
```

- **최상위 루트 스코프 완전 필수화 (클래스명 충돌 방지)**:
  - CSS Modules를 사용하지 않으므로, 각 컴포넌트나 다이얼로그의 SCSS는 **단일 루트 클래스(예: `.auth-dialog-paper`, `.app-header`)** 내부에 모든 자식 셀렉터를 중첩(nest)하여 정의합니다.
  - 루트 클래스 바깥에 `.dialog-header`, `.dialog-content` 등의 클래스를 평면적으로 독립 정의하는 것을 엄격히 금지합니다.
- **모바일 터치 간섭 방지 (`@include hover` 의무화)**:
  - 스마트폰, 태블릿 등 터치 기기에서 탭 시 발생하는 호버 잔류(sticky hover) 현상을 방지하기 위해 직접적인 `&:hover`나 `a:hover` 작성을 금지합니다.
  - 반드시 `@/styles/base/mixins`의 `@mixin hover`(`@media (hover: hover) and (pointer: fine)`)를 사용하세요.
- **루트 셀렉터 내부 불필요한 빈 줄 완전 금지 (완전 컴팩트 표기법)**:
  - 루트 셀렉터 내부에서는 속성 선언 직후, 자식 셀렉터 간, 형제 블록 간, 중괄호(`{}`) 전후를 포함하여 **중간에 빈 줄(개행)을 일절 넣지 않고 밀착하여 작성**합니다.
- **Dembrandt 기반 디자인 시스템/토큰 운용**:
  - 디자인 정의는 Dembrandt의 분석 결과(`DESIGN.md`)를 단일 진실 공급원(SSOT)으로 삼고, `src/styles/base/_variables.scss`의 CSS 변수를 통해 전 컴포넌트로 전개합니다.
  - 공통 UI 컴포넌트는 `src/components/ui/<Component>/` 하위에 자체 완결형(동반 SCSS)으로 구현하여 외부 라이브러리에 의존하지 않는 경량/견고한 설계를 유지합니다.
- **파일 끝 불필요한 개행 금지**:
  - 파일 끝 닫는 중괄호(`}`) 뒤에 여러 빈 줄을 남기지 않고 단일 개행으로 종료합니다.
- **페이지 추가 시 스타일 구조화 관리 (`src/styles/pages/<route>.scss`)**:
  - 신규 페이지(경로)의 스타일시트는 반드시 `src/styles/pages/<route>.scss`에 배치하고 경로명과 1대 1로 구조화 관리합니다. 최상위 페이지 클래스로 100% 루트 스코핑하세요.

### 2.3. 에러 핸들링
- API 호출 또는 비동기 처리 시 빈 catch문(`catch {}`)으로 에러를 삼키지 말고 적절한 스낵바 알림(`enqueueSnackbar`)이나 폴백 UI를 표시합니다.