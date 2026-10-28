---
id: 003-styling-and-inline-style-prohibition
title: 인라인 스타일 및 CSS Modules 금지와 글로벌 SCSS 운용
date: 2026-10-19
scope: [styling, scss]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
Tailwind CSS, CSS Modules, JSX 인라인 스타일(`style={{ ... }}`)이 무질서하게 혼재될 경우 유지보수성이 급격히 저하됨.

### 근본 원인 (Root Cause)
스타일 정의 위치가 분산되어 디자인 시스템 토큰의 일원화된 활용이 어려워짐.

### 해결책 및 향후 규칙 (Rule & Solution)
- CSS Modules, Tailwind CSS, JSX 인라인 스타일 작성을 금지한다.
- 스타일은 컴포넌트 동반 SCSS 또는 `src/styles/pages/*.scss`에 작성하고, `DESIGN.md` 및 `_variables.scss`의 토큰을 사용한다.
