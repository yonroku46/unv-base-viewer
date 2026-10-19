---
id: 001-eslint-and-react19-dependencies
title: React 19와 Next.js 15 환경에서의 ESLint 8 및 의존성 고정
date: 2026-10-19
scope: [dependencies, build, eslint]
status: active
---

### Problem / Context (문제 및 배경)
ESLint v9 최신 버전이 설치될 경우 Next.js의 내장 eslint 설정(`eslint-config-next`) 및 레거시 플러그인들과 충돌을 일으키거나 빌드 시 호환성 에러가 발생할 수 있음.

### Root Cause (근본 원인)
`eslint-config-next@15.1.x`는 내부적으로 Flat Config 전환 과도기에 있어 `eslint@^8` 및 `eslint-visitor-keys@4.2.1` 고정(resolutions)을 필요로 함.

### Rule & Solution (해결책 및 향후 규칙)
1. `package.json`의 eslint는 `"eslint": "^8"`로 유지하고, `resolutions`에 `"eslint-visitor-keys": "4.2.1"`을 유지한다.
2. 패키지 설치 시 네트워크 타임아웃 방지를 위해 필요시 `--network-timeout 600000`을 활용한다.
