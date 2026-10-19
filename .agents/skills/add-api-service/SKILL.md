---
name: add-api-service
description: 新しいバックエンドAPIサービスおよびエンドポイントをアーキテクチャ規約に沿って追加するスキル
---

# 新規APIサービス追加ワークフロー（Add API Service Workflow）

> **通知文言規約**: API通信の成功または失敗時にユーザーへ提示するスナックバー文言は、日本語で記述してください。

## 1. 標準手順
1. `src/api/module/ApiRoutes.ts` に新規エンドポイントURL定数を登録
2. `src/types/global.d.ts` にリクエスト・レスポンスのDTO型を宣言
3. `src/api/service/*Service.ts` にシングルトンサービス関数を実装
4. コンポーネントまたはSSRページからサービスを呼び出す

## 2. 遵守事項
- Axiosを直接 `axios.create()` せず、必ず `@/api` (`ApiInstance`) をインポートして使用してください。
- 認証トークン付与やインターセプター処理は `ApiInstance` に組み込まれているため、サービスコード内で重複して処理しないでください。

## 3. 実装例 (`src/api/service/NoticeService.ts`)
```ts
import ApiRoutes from '@/api/module/ApiRoutes';
import ApiInstance from '@/api';

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const NoticeService = {
  getNoticeList: async (): Promise<NoticeItem[]> => {
    const response: any = await ApiInstance.get(ApiRoutes.NOTICE_LIST);
    return response?.data || [];
  },
  getNoticeDetail: async (id: string): Promise<NoticeItem | null> => {
    const response: any = await ApiInstance.get(`${ApiRoutes.NOTICE_INFO}/${id}`);
    return response?.data || null;
  },
};

export default NoticeService;
```
