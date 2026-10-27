---
name: add-page
description: 新しいページ（ルート）を作成する際、SSR/CSRデュアルファイルパターンと日本語UI規約を遵守して追加するスキル
---

# 新規ページ追加ワークフロー（Add Page Workflow）

> **UI言語規約**: 画面上のUIテキスト、ページタイトル（Metadata）、ボタンラベル、通知メッセージ、プレースホルダーは、すべて**自然な日本語（丁寧語/敬体: です・ます）**で作成してください。

## 1. ファイル構成
新規ページ（`/notice` など）を追加する際は、必ず以下の3つのファイルを作成します。
1. `src/app/notice/page.tsx`（Server Component: メタデータおよびSSRデータフェッチ）
2. `src/app/notice/NoticeClient.tsx`（Client Component: インタラクションおよびUIステート）
3. `src/styles/pages/notice.scss`（スタイルシート: ページ専用スタイル）

## 2. Server Component (`page.tsx`) テンプレート
```tsx
import { generatePageMetadata } from '@/common/lib/Metadata';
import NoticeClient from './NoticeClient';

// メタデータのタイトルと説明文は日本語で記述
export async function generateMetadata() {
  return generatePageMetadata('お知らせ一覧', '最新のお知らせやアップデート情報をご確認いただけます。');
}

export default async function NoticePage() {
  // SSRデータフェッチが必要な場合はここで実行し、NoticeClientへpropsとして渡す
  return <NoticeClient />;
}
```

## 3. Client Component (`NoticeClient.tsx`) テンプレート
```tsx
'use client';

import { useSnackbar } from 'notistack';
import Button from '@/components/ui/Button/Button';
import '@/styles/pages/notice.scss';

export default function NoticeClient() {
  const { enqueueSnackbar } = useSnackbar();

  const handleAction = () => {
    // ユーザー通知メッセージも自然な日本語で記述
    enqueueSnackbar('正常に処理が完了しました。', { variant: 'success' });
  };

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h1>お知らせ</h1>
        <p>重要なお知らせとアップデート</p>
      </div>
      <div className="notice-content">
        <Button variant="primary" onClick={handleAction}>
          再読み込み
        </Button>
      </div>
    </div>
  );
}
```

## 4. スタイルシート (`src/styles/pages/*.scss`) テンプレート
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

## 5. 検証手順
作業完了後、必ず `yarn lint` および `yarn build` を実行し、静的ページの生成およびビルド成功を確認してください。
