---
name: add-api-service
description: 새로운 백엔드 API 서비스 및 엔드포인트를 추가할 때 아키텍처 규칙을 준수하여 추가하는 스킬
---

# 새 API 서비스 추가 워크플로우 (Add API Service Workflow)

> **에러 및 사용자 안내 문구 규칙**: API 통신 실패 또는 성공 시 사용자에게 전달되는 스낵바 메시지는 일본어로 제공합니다.

## 1. 표준 절차
1. `src/api/module/ApiRoutes.ts`에 신규 엔드포인트 URL 상수 등록
2. `src/types/global.d.ts`에 응답 및 요청 DTO 타입 선언
3. `src/api/service/*Service.ts`에 싱글톤 서비스 함수 작성
4. 컴포넌트 또는 SSR 페이지에서 서비스 호출

## 2. 규약 준수 사항
- Axios를 직접 `axios.create()` 하지 않고, 반드시 `@/api` (`ApiInstance`)를 임포트하여 사용합니다.
- 토큰 및 인터셉터 처리는 이미 `ApiInstance`에 내장되어 있으므로 서비스 코드 내부에서 중복 처리하지 않습니다.

## 3. 서비스 구현 예시 (`src/api/service/NoticeService.ts`)
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
