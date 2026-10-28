---
id: 004-korean-instructions-japanese-ui-constraint
title: 타겟 로케일 한국어 전환 (한국어 UI 및 메타데이터 작성 철저)
date: 2026-10-28
scope: [locale, ui, i18n]
status: active
---

### 배경 및 변경 사유 (Context)
기존 일본어 타겟 웹 애플리케이션 보일러플레이트에서 한국어 전용 웹 애플리케이션/홈페이지를 구축하기 위해 타겟 로케일(`Asia/Seoul`, `ko`) 및 전체 UI 표시 언어를 한국어로 전환함.

### 원칙 및 향후 규칙 (Rule & Solution)
1. **타겟 로케일**: 대한민국 (`Asia/Seoul`, `ko`).
2. **UI 및 메타데이터**:
   - UI 라벨, 버튼명, 다이얼로그 문구, 스낵바 알림 메시지, 메타데이터 타이틀/설명문, 플레이스홀더는 모두 **자연스러운 한국어(존댓말: 해요체/하십시오체)**로 작성한다.
3. **공통 설정**:
   - `src/app/layout.tsx`의 `<html lang="ko">`
   - `src/common/lib/Dayjs.ts`의 `dayjs.locale('ko')`, `dayjs.tz.setDefault('Asia/Seoul')`
   - `src/common/lib/Metadata.ts`의 `locale: 'ko_KR'`
   - `src/config.ts`의 `defaultLanguage: "ko"`
