---
id: 010-dembrandt-design-system-establishment
title: Dembrandt 기반 프로젝트 자체 디자인 시스템 확립
date: 2026-10-26
scope: [design-system, dembrandt, tokens, scss, ui]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
초기 설계에서 서드파티 중량 UI 프레임워크를 채택했으나 아래 문제가 발생함:
1. 번들 크기가 비대해져 React 19 / Next.js 15 App Router와의 친화성 및 SSR 최적화에 제약이 발생함.
2. 내부의 복잡한 CSS-in-JS 구조로 인해 프로젝트 고유의 디자인 요구사항이나 다크 모드 미세 조정이 어려움.
3. 에이전트가 외부 라이브러리의 고유 속성이나 클래스 오버라이드에 매몰되어 순수하고 견고한 CSS 변수 토큰 설계가 훼손되기 쉬움.

### 근본 원인 (Root Cause)
여러 웹 서비스나 홈페이지를 신속히 전개하는 보일러플레이트에서 특정 중량 UI 프레임워크에 의존하면, 브랜드별 유연한 UI/UX 표현(색상, 타이포그래피, 여백)을 민첩하게 변경 및 관리할 수 없음.

### 해결책 및 향후 규칙 (Rule & Solution)
1. **외부 UI 라이브러리 완전 배제**:
   - 서드파티 UI 키트 의존을 전면 배제하고 신규 도입을 금지한다.
2. **Dembrandt를 통한 디자인 인텔리전스 및 토큰 관리**:
   - 프로젝트 시작 시나 리브랜딩 시 Dembrandt CLI(`dembrandt <url> --design-md` / `--dtcg`)를 실행한다.
   - 콘솔 및 마크다운 출력 결과를 루트의 `DESIGN.md`에 집약하여 프로젝트 디자인 단일 진실 공급원(SSOT)으로 삼는다.
3. **`_variables.scss`로의 토큰 전개**:
   - `DESIGN.md`의 토큰 정의(색상, 스케일, 여백, 모서리 라운딩, 그림자)를 `src/styles/base/_variables.scss`에 CSS 변수로 정의한다.
4. **`src/components/ui/`를 통한 자체 UI 구현**:
   - Button, Dialog, Input, Tabs 등의 UI 컴포넌트는 외부 라이브러리 없이 순수 React + TypeScript + 동반 SCSS(`<Component>.scss`)로 자체 완결형으로 구현한다.
