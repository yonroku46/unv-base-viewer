---
id: 002-dual-file-ssr-csr-pattern
title: 공개 페이지 듀얼 파일 패턴 (page.tsx / *Client.tsx)
date: 2026-10-19
scope: [nextjs, ssr, csr, seo]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
Next.js App Router에서 SEO 및 OGP 메타데이터를 유지하면서 클라이언트 상태를 처리할 때 파일 구성이 혼동되기 쉬움.

### 근본 원인 (Root Cause)
`"use client"`가 지정된 파일에서는 `generateMetadata()`를 사용할 수 없어 SSR의 이점이 손실됨.

### 해결책 및 향후 규칙 (Rule & Solution)
- 검색 엔진 인덱싱 대상 공개 페이지는 반드시 `page.tsx`(Server Component: generateMetadata, SSR 데이터 페치)와 `*Client.tsx`(Client Component: 브라우저 UI/상태)로 분리한다.
