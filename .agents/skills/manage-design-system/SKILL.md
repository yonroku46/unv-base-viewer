---
name: manage-design-system
description: Dembrandt를 사용한 디자인 시스템 토큰 추출, DESIGN.md 및 _variables.scss 반영, 자체 UI 컴포넌트 생성 스킬
---

# Dembrandt 기반 디자인 시스템 관리 워크플로우 (Design System Workflow)

> **원칙**: 본 프로젝트에서는 외부 UI 컴포넌트 라이브러리에 의존하지 않고, **Dembrandt**를 활용하여 프로젝트별 독립적인 디자인 시스템(토큰 및 자체 컴포넌트군)을 구축 및 운영합니다.

---

## 1. Dembrandt를 통한 토큰 추출 및 갱신 절차

브랜드나 레퍼런스 사이트로부터 디자인 시스템을 도출할 때는 아래 절차로 실행합니다.

### 1.1. Dembrandt 명령어 실행
```bash
# 1. AI용 디자인 명세서 (DESIGN.md) 생성
npx dembrandt <target-url> --design-md

# 2. W3C 표준 DTCG 토큰 (JSON) 추출
npx dembrandt <target-url> --dtcg
```

### 1.2. `DESIGN.md` 갱신
Dembrandt의 콘솔 출력 및 생성된 마크다운을 루트의 `DESIGN.md`에 집약 및 반영합니다.
- 색상 팔레트 (Primary, Secondary, Background, Foreground, Surface, Muted, Status)
- 타이포그래피 (Font Family, Font Scale, Font Weights, Line Heights)
- 간격 (4px/8px 그리드 베이스)
- 모서리 라운딩 (Border Radii)
- 박스 그림자 (Box Shadows / Elevations)
- 트랜지션 (Transitions / Timing Functions)

---

## 2. `_variables.scss`로의 토큰 전개

`DESIGN.md`에서 합의 및 추출된 토큰을 `src/styles/base/_variables.scss`의 CSS 커스텀 속성에 반영합니다.

```scss
// src/styles/base/_variables.scss
:root {
  // 색상 팔레트
  --primary-color: #2563eb;
  --primary-color-hover: #1d4ed8;
  --primary-color-bg: #eff6ff;
  --secondary-color: #6366f1;
  --background: #ffffff;
  --foreground: #171717;
  --surface: #f8fafc;
  --border: #e2e8f0;

  // 타이포그래피
  --font-xs: 0.75rem;
  --font-sm: 0.875rem;
  --font-base: 1rem;
  --font-lg: 1.125rem;
  --font-xl: 1.25rem;
  --font-2xl: 1.5rem;

  // 간격
  --space-1: 0.25rem; // 4px
  --space-2: 0.5rem;  // 8px
  --space-3: 0.75rem; // 12px
  --space-4: 1rem;    // 16px
  --space-6: 1.5rem;  // 24px
  --space-8: 2rem;    // 32px

  // 라운딩 및 그림자
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

// 다크 모드 대응
[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f8fafc;
  --surface: #1e293b;
  --border: #334155;
}
```

---

## 3. `src/components/ui/`에서 자체 UI 컴포넌트 생성

모든 UI 컴포넌트는 서드파티 라이브러리를 거치지 않고 순수 React + TypeScript + 동반 SCSS(`<Component>.scss`)로 자체 완결형으로 생성합니다.

### 3.1. 디렉터리 구조
```
src/components/ui/
  ├─ Button/
  │    ├─ Button.tsx
  │    └─ Button.scss
  ├─ Dialog/
  │    ├─ Dialog.tsx
  │    └─ Dialog.scss
  ├─ Input/
  │    ├─ Input.tsx
  │    └─ Input.scss
  └─ index.ts
```

### 3.2. 컴포넌트 구현 필수 요건
1. **토큰 참조 철저**: 색상이나 여백 등 스타일 값은 하드코딩하지 않고 반드시 `var(--...)`를 사용합니다.
2. **최상위 루트 스코프**: 컴포넌트 SCSS는 단일 루트 클래스(예: `.ui-button`, `.ui-dialog-backdrop`) 내에 모든 요소를 중첩합니다.
3. **모바일 호버 보호**: 호버 스타일에는 반드시 `@include hover`를 적용합니다.
4. **접근성(Accessibility)**: 적절한 ARIA 속성(`aria-label`, `aria-hidden`, `role` 등) 및 키보드 조작(Escape 키로 모달 닫기 등)을 구현합니다.
5. **브라우저 뒤로가기 안전 (Dialog)**: 모달/다이얼로그는 `popstate` 이벤트를 처리하여 모바일 뒤로가기 동작 시 안전하게 닫히도록 설계합니다.
