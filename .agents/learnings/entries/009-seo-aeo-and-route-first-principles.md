---
id: 009-seo-aeo-and-route-first-principles
title: SEO & AEO 최적화, 다이얼로그 남용 금지(Route-First), 페이지 스타일 구조화
date: 2026-10-20
scope: [seo, aeo, routing, architecture, styling]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
웹 서비스/홈페이지임에도 불구하고 공지사항이나 상세 정보 등을 다이얼로그(모달)로 과도하게 처리할 경우, 검색 엔진이나 AI 답변 엔진(AEO)에 인덱싱되지 않으며 URL 공유도 불가능함.

### 근본 원인 (Root Cause)
웹 서비스로서의 SEO/AEO 유입 극대화 및 지속적인 팀 단위 유지보수성 관점의 인식 부족.

### 해결책 및 향후 규칙 (Rule & Solution)
- **다이얼로그 남용 금지 (Route-First 원칙)**: 공지사항이나 상세 화면, 주요 기능 흐름은 다이얼로그로 때우지 말고 고유 URL을 갖는 개별 페이지(경로)로 설계한다. 다이얼로그는 인증 및 확인 알림 등으로 한정한다.
- **SEO & AEO 최적화**: 시맨틱 HTML 구조(`h1`~`h3`, `main`, `article`, `section`)와 명료한 자연 한국어 텍스트로 작성한다.
- **페이지 스타일 구조화 관리**: 신규 페이지 생성 시 반드시 `src/styles/pages/<route>.scss`에 전용 스타일시트를 작성하고 루트 스코프화하여 관리한다.
