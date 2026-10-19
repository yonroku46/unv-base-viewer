---
name: add-page
description: 새로운 페이지(라우트)를 생성할 때 SSR/CSR 듀얼 파일 패턴과 일본어 UI 규칙을 준수하여 추가하는 스킬
---

# 새 페이지 추가 워크플로우 (Add Page Workflow)

> **언어 규칙**: 사용자가 한국어로 페이지 생성을 요청하더라도, **UI 텍스트, 페이지 제목(Metadata), 버튼 라벨, 스낵바/알림 문구, 플레이스홀더는 반드시 자연스러운 일본어(敬体: です・ます)**로 작성합니다.

## 1. 파일 생성 구조
새로운 페이지(`/notice`)를 추가할 때는 반드시 아래 3개 파일을 생성합니다:
1. `src/app/notice/page.tsx` (서버 컴포넌트: 메타데이터 및 SSR 데이터 페칭)
2. `src/app/notice/NoticeClient.tsx` (클라이언트 컴포넌트: 인터랙션 및 상태)
3. `src/styles/pages/notice.scss` (스타일시트: 컴포넌트 동반 스타일)

## 2. Server Component (`page.tsx`) 템플릿
```tsx
import { generatePageMetadata } from '@/common/lib/Metadata';
import NoticeClient from './NoticeClient';

// 메타데이터 타이틀 및 설명은 일본어로 작성
export async function generateMetadata() {
  return generatePageMetadata('お知らせ一覧', 'ワンチャンの最新のお知らせやアップデート情報をご確認いただけます。');
}

export default async function NoticePage() {
  // SSR 데이터 페칭이 필요한 경우 여기서 수행하여 NoticeClient로 props 전달
  return <NoticeClient />;
}
```

## 3. Client Component (`NoticeClient.tsx`) 템플릿
```tsx
'use client';

import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import '@/styles/pages/notice.scss';

export default function NoticeClient() {
  const { enqueueSnackbar } = useSnackbar();

  const handleAction = () => {
    // 사용자 알림 메시지도 반드시 자연스러운 일본어로 작성
    enqueueSnackbar('正常に処理が完了しました。', { variant: 'success' });
  };

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h1>お知らせ</h1>
        <p>重要なお知らせとアップデート</p>
      </div>
      <div className="notice-content">
        <Button variant="contained" color="primary" onClick={handleAction}>
          再読み込み
        </Button>
      </div>
    </div>
  );
}
```

## 4. 스타일시트 (`src/styles/pages/*.scss`) 템플릿
```scss
@use "../base/variables" as *;
@use "../base/mixins" as *;

.notice-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;

  .notice-header {
    margin-bottom: 2rem;

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--foreground);
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--gray-alpha-600);
      font-size: 0.95rem;
    }
  }
}
```

## 5. 검증
작업 완료 후 반드시 `yarn lint` 및 `yarn build`를 실행하여 정적 페이지 생성과 빌드 성공을 검증합니다.
