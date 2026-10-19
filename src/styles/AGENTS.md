# Scoped Instructions: Styling Layer (`src/styles/`)

이 디렉토리는 서비스 전반의 색상 토큰, 레이아웃 규격, 반응형 믹스인, 페이지 스타일을 정의합니다.

## 원칙 및 제약
1. **토큰 우선 사용**:
   - 색상(Hex, RGB), 그림자, 높이 값을 하드코딩하지 말고 반드시 `src/styles/base/_variables.scss`에 정의된 CSS 변수(`var(--primary-color)` 등)를 사용합니다.
2. **반응형 믹스인**:
   - 미디어 쿼리를 매번 직접 작성하지 않고, `src/styles/base/_mixins.scss`의 `@include sp`, `@include tab`, `@include pc`를 사용합니다.
3. **금지 기술**:
   - CSS Modules(`.module.scss`) 및 Tailwind CSS는 사용하지 않습니다.
   - 전역 오염을 방지하기 위해 각 페이지의 최상위 컨테이너 클래스명(예: `.home-container`, `.notice-container`)으로 스코핑합니다.
