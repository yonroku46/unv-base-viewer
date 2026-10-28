---
name: add-api-service
description: 새로운 백엔드 API 서비스 및 엔드포인트를 아키텍처 규약에 따라 추가하는 스킬
---

# 신규 API 서비스 추가 워크플로우 (Add API Service Workflow)

> **알림 문구 규약**: API 통신 성공 또는 실패 시 사용자에게 표시하는 스낵바 문구는 자연스러운 한국어로 작성하세요.

## 1. 표준 절차
1. `src/api/module/ApiRoutes.ts`에 신규 엔드포인트 URL 상수 등록
2. `src/types/global.d.ts`에 요청/응답 DTO 타입 선언
3. `src/api/service/*Service.ts`에 싱글톤 서비스 함수 구현
4. 컴포넌트 또는 SSR 페이지에서 서비스 호출

## 2. 준수 사항
- Axios를 직접 `axios.create()`하지 말고 반드시 `@/api` (`ApiInstance`)를 임포트하여 사용하세요.
- 인증 토큰 부여나 인터셉터 처리는 `ApiInstance`에 내장되어 있으므로 서비스 코드 내부에서 중복 처리하지 마세요.

## 3. 구현 예시 (`src/api/service/NoticeService.ts`)
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
