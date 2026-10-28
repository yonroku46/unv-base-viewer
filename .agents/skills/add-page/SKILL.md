---
name: add-page
description: 새로운 페이지(경로)를 생성할 때 SSR/CSR 듀얼 파일 패턴과 한국어 UI 규약을 준수하여 추가하는 스킬
---

# 신규 페이지 추가 워크플로우 (Add Page Workflow)

> **UI 언어 규약**: 화면 상의 UI 텍스트, 페이지 타이틀(Metadata), 버튼 라벨, 알림 메시지, 플레이스홀더는 모두 **자연스러운 한국어(존댓말: 해요체/하십시오체)**로 작성해 주세요.

## 1. 파일 구성
신규 페이지(`/notice` 등)를 추가할 때는 반드시 아래 3개 파일을 생성합니다.
1. `src/app/notice/page.tsx` (Server Component: 메타데이터 및 SSR 데이터 페치)
2. `src/app/notice/NoticeClient.tsx` (Client Component: 인터랙션 및 UI 상태)
3. `src/styles/pages/notice.scss` (스타일시트: 페이지 전용 스타일)

## 2. Server Component (`page.tsx`) 템플릿
```tsx
import { generatePageMetadata } from '@/common/lib/Metadata';
import NoticeClient from './NoticeClient';

// 메타데이터의 타이틀과 설명문은 한국어로 작성
export async function generateMetadata() {
  return generatePageMetadata('공지사항', '최신 공지사항과 업데이트 정보를 확인하실 수 있습니다.');
}

export default async function NoticePage() {
  // SSR 데이터 페치가 필요한 경우 여기서 실행하고 NoticeClient로 props 전달
  return <NoticeClient />;
}
```

## 3. Client Component (`NoticeClient.tsx`) 템플릿
```tsx
'use client';

import { useSnackbar } from 'notistack';
import Button from '@/components/ui/Button/Button';
import '@/styles/pages/notice.scss';

export default function NoticeClient() {
  const { enqueueSnackbar } = useSnackbar();

  const handleAction = () => {
    // 사용자 알림 메시지도 자연스러운 한국어로 작성
    enqueueSnackbar('정상적으로 처리되었습니다.', { variant: 'success' });
  };

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h1>공지사항</h1>
        <p>중요 공지사항 및 업데이트</p>
      </div>
      <div className="notice-content">
        <Button variant="primary" onClick={handleAction}>
          새로고침
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

## 5. 검증 절차
작업 완료 후 반드시 `yarn lint` 및 `yarn build`를 실행하여 정적 페이지 생성 및 빌드 성공을 확인하세요.
