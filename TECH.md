# TECH.md

이 문서는 본 프로젝트의 코드 품질, 타입 안정성, 의존성 관리 및 **AI 에이전트가 반드시 준수해야 하는 엄격한 금지 규칙(Negative Constraints)**을 규정합니다.

---

## 1. 핵심 금지 규칙 (Negative Constraints - STRICT)

에이전트는 아래 10가지 금지 사항을 어길 시 작업을 완료할 수 없으며, PR/빌드 검증에서 즉시 실패 처리됩니다:

1. **`any` 타입 및 무분별한 단언 금지**:
   - `any` 사용을 지양하고 구체적인 인터페이스나 유니온 타입을 정의합니다. `as unknown as Type`과 같은 이중 단언은 버그의 온상이므로 금지합니다.
2. **타입 전용 임포트 구분 (`import type`)**:
   - 런타임 번들에 포함되지 않는 타입은 반드시 `import type { ... } from '...'` 형태로 분리 임포트합니다.
3. **Vanilla `fetch` 및 Ad-hoc `axios` 생성 금지**:
   - 컴포넌트나 서비스에서 브라우저 네이티브 `fetch()`나 `axios.create()`를 새로 생성하지 않습니다. 오직 `@/api` (`ApiInstance`)만을 사용합니다.
4. **Vanilla `dayjs` 직접 임포트 금지**:
   - `import dayjs from 'dayjs'`를 직접 호출하지 않습니다. 도쿄 타임존(`Asia/Tokyo`)과 일본어 로케일(`ja`)이 세팅된 `@/common/lib/Dayjs`를 임포트합니다.
5. **브라우저 네이티브 `alert()`, `confirm()` 금지**:
   - 사용자 피드백은 반드시 `notistack`의 `useSnackbar()` 또는 `@/components/mui/MuiDialog`를 사용합니다.
6. **JSX 인라인 스타일 및 `sx` 남발 금지**:
   - JSX 내 `style={{ ... }}` 및 MUI `sx={{ ... }}`의 남발을 금지합니다. 전역 변수(`var(--primary-color)` 등)를 참조하는 SCSS 클래스를 작성하십시오.
7. **임의의 외부 패키지 무단 설치 금지**:
   - 사용자의 명시적 요청 없이 Zustand, SWR, React Query, Tailwind, Lodash 등의 서드파티 라이브러리를 임의로 `yarn add`하지 않습니다.
8. **임의의 Redux Slice 생성 금지**:
   - Redux Toolkit 스토어(`@/store`)는 `auth`, `notification` 등 영속화(persist)가 필요한 전역 상태에만 한정합니다. 단순 페이지 상태는 `useState`나 React Context를 사용합니다.
9. **UI 한국어 노출 금지**:
   - 사용자가 한국어로 개발을 지시하더라도, 화면에 노출되는 모든 텍스트(버튼, 알림, 에러 메시지, 메타데이터)는 일본어로 작성합니다.
10. **검증 없는 작업 완료 선언 금지**:
    - 코드 작성 후 `yarn lint`와 `yarn build`를 실행하여 통과하지 못한 코드는 완료된 것으로 간주하지 않습니다.

---

## 2. 코딩 스타일 및 컨벤션

### 2.1. TypeScript 타입 선언
- 전역 엔티티/공통 DTO: `src/types/global.d.ts` 내 `declare global` 블록에 선언하여 별도 import 없이 전역 소비.
- 서비스/컴포넌트 전용 로컬 DTO: 해당 파일 상단에서 `export interface`로 선언.
- 고정된 옵션 값은 TypeScript `enum` 대신 문자열 유니온 타입(`'USER' | 'ADMIN'`)을 선언.

### 2.2. CSS / SCSS 네이밍 (BEM 변형)
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
  }
}
```

### 2.3. 에러 핸들링
- API 호출 시 try-catch 블록 내에서 에러를 무시(`catch {}`)하지 않고, 적절한 사용자 안내 스낵바(`enqueueSnackbar`) 또는 폴백 UI를 제공합니다.
