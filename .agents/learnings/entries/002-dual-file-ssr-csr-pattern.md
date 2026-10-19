---
id: 002-dual-file-ssr-csr-pattern
title: 공개 페이지의 SSR / CSR 분리 (Dual-File Pattern) 준수
date: 2026-10-19
scope: [nextjs, ssr, architecture]
status: active
---

### Problem / Context (문제 및 배경)
Next.js App Router에서 페이지 파일 전체를 `"use client"`로 선언해버리면 서버 사이드 렌더링(SSR), 메타데이터 생성(SEO/AEO), 초기 로딩 성능에 악영향을 미침.

### Root Cause (근본 원인)
클라이언트 인터랙션(이벤트 핸들러, 브라우저 훅 등)이 필요한 영역과 검색 엔진 크롤링 및 초기 데이터 페칭이 필요한 영역이 한 파일에 혼재되어 단일 컴포넌트로 작성되기 쉬움.

### Rule & Solution (해결책 및 향후 규칙)
1. 공개 및 인덱싱이 필요한 모든 페이지는 반드시 2개 파일로 분리한다:
   - `page.tsx`: Server Component. `generateMetadata()`, SSR 데이터 페칭, 정적 HTML 렌더링 담당.
   - `*Client.tsx`: Client Component (`"use client"`). 브라우저 전용 인터랙션 및 상태 관리 담당.
2. 예외: 관리자/파트너 대시보드와 같이 100% 인증 기반 인터랙티브 대시보드는 `"use client"` 단독 페이지 허용.
