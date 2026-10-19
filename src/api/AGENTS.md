# Scoped Instructions: API Layer (`src/api/`)

이 디렉토리는 백엔드와의 모든 네트워크 통신을 책임지는 단일 진입점입니다.

## 원칙 및 제약
1. **싱글톤 준수**:
   - 모든 요청은 `src/api/index.ts`의 `ApiInstance`를 통과해야 합니다.
   - 새로운 Axios 인스턴스 생성 또는 `fetch()` 호출은 엄격히 금지됩니다.
2. **엔드포인트 집중 관리**:
   - 모든 API URL 상수는 `src/api/module/ApiRoutes.ts`에 선언하고 import하여 사용합니다. 컴포넌트나 서비스에 URL 하드코딩을 금지합니다.
3. **서비스 함수 구조**:
   - `src/api/service/*Service.ts` 형태로 도메인별 서비스를 분리하고, 객체 또는 클래스 형태로 export합니다.
4. **타입 안전성**:
   - 모든 API 응답값은 `CommonResponse<T>` 또는 구체적인 DTO 인터페이스를 반환하도록 타이핑합니다.
