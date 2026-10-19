---
id: 003-styling-and-inline-style-prohibition
title: 스타일링 경계 준수 (인라인 스타일, Tailwind 금지, 전역 SCSS 활용)
date: 2026-10-19
scope: [styling, scss, mui]
status: active
---

### Problem / Context (문제 및 배경)
컴포넌트마다 인라인 스타일(`style={{ ... }}`)이나 MUI `sx={{ ... }}`, 혹은 ad-hoc CSS 모듈을 사용하면 프로젝트 전체의 디자인 시스템 통일성과 번들 효율성이 저하됨.

### Root Cause (근본 원인)
빠른 마크업 작성을 위해 인라인으로 값을 주입하는 관행.

### Rule & Solution (해결책 및 향후 규칙)
1. CSS Modules(`.module.scss`) 및 Tailwind CSS는 사용하지 않는다.
2. JSX/TSX 내부의 인라인 `style` 및 `sx` 속성을 남발하지 않는다.
3. 컴포넌트 전용 동반 스타일시트(`Component.scss`) 또는 `src/styles/pages/*.scss`를 생성하여 SCSS 클래스로 스타일링한다.
4. 모든 색상, 그림자, 높이 값 등은 `src/styles/base/_variables.scss` 및 `_mixins.scss`의 토큰을 최우선으로 활용한다.
