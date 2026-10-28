# Project Design System (Dembrandt Blueprint)

> **개요**: 본 문서는 **Dembrandt**(디자인 인텔리전스 및 토큰 추출 도구)의 분석 결과를 기반으로 한 본 프로젝트 고유의 디자인 시스템 명세서입니다.
> AI 코딩 어시스턴트 및 개발자는 모든 UI 구현 시 본 문서의 토큰과 컴포넌트 명세를 단일 진실 공급원(SSOT)으로 참조하세요.

---

## 1. 디자인 원칙 (Design Principles)

1. **Lightweight & Zero-Bloat**: 외부 거대 UI 라이브러리에 의존하지 않고 순수 React + TypeScript + SCSS로 최상의 성능을 구현.
2. **Token-Driven Consistency**: 모든 색상, 여백, 타이포그래피, 모서리 라운딩은 CSS 커스텀 속성(`var(--...)`)을 참조하여 하드코딩을 배제.
3. **Accessibility & Responsive**: 시맨틱 HTML, 적절한 ARIA 속성, 모바일 탭 시 sticky hover 방지(`@include hover`), 완벽한 반응형 설계.
4. **Adaptive Dark Mode**: CSS 변수를 통한 매끄러운 라이트/다크 모드 전환 기본 지원.

---

## 2. 디자인 토큰 명세 (Design Tokens)

### 2.1. 색상 팔레트 (Color Palette)

| 토큰명 | 라이트 모드 값 | 다크 모드 값 | 설명 / 역할 |
| :--- | :--- | :--- | :--- |
| `--primary-color` | `#2563eb` (Blue 600) | `#3b82f6` (Blue 500) | 브랜드 프라이머리 컬러, 주요 CTA |
| `--primary-color-hover` | `#1d4ed8` (Blue 700) | `#60a5fa` (Blue 400) | 프라이머리 호버 시 |
| `--primary-color-bg` | `#eff6ff` (Blue 50) | `rgba(37, 99, 235, 0.15)` | 프라이머리 배경 하이라이트 |
| `--secondary-color` | `#6366f1` (Indigo 500) | `#818cf8` (Indigo 400) | 서브 악센트, 보조 배지 등 |
| `--accent-color` | `#f59e0b` (Amber 500) | `#fbbf24` (Amber 400) | 하이라이트, 주목 요소 |
| `--background` | `#ffffff` | `#0f172a` (Slate 900) | 애플리케이션 전체 배경 |
| `--foreground` | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | 기본 텍스트 컬러 |
| `--surface` | `#f8fafc` (Slate 50) | `#1e293b` (Slate 800) | 카드, 서피스, 드로어 배경 |
| `--surface-hover` | `#f1f5f9` (Slate 100) | `#334155` (Slate 700) | 서피스 호버 배경 |
| `--border` | `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | 테두리, 구분선 |
| `--border-focus` | `#2563eb` | `#3b82f6` | 입력 포커스 시 테두리 |

#### 텍스트 및 그레이스케일
| 토큰명 | 라이트 모드 값 | 다크 모드 값 | 용도 |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#0f172a` | `#f8fafc` | 제목, 메인 텍스트 |
| `--text-secondary` | `#475569` | `#94a3b8` | 서브타이틀, 메타 정보 |
| `--text-muted` | `#94a3b8` | `#64748b` | 플레이스홀더, 비활성 텍스트 |
| `--text-disabled` | `#cbd5e1` | `#475569` | 비활성화 상태 |

#### 상태 컬러 (Status Variants)
| 토큰명 | 값 | 배경색 | 용도 |
| :--- | :--- | :--- | :--- |
| `--variant-success` | `#10b981` (Emerald 500) | `rgba(16, 185, 129, 0.1)` | 성공, 완료 알림 |
| `--variant-error` | `#ef4444` (Red 500) | `rgba(239, 68, 68, 0.1)` | 에러, 유효성 실패 |
| `--variant-warning` | `#f59e0b` (Amber 500) | `rgba(245, 158, 11, 0.1)` | 경고, 주의 환기 |
| `--variant-info` | `#3b82f6` (Blue 500) | `rgba(59, 130, 246, 0.1)` | 안내 정보 |

---

### 2.2. 타이포그래피 (Typography Scale)

```scss
// 기본 폰트 패밀리
--font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-code: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

// 폰트 크기
--font-xs: 0.75rem;    // 12px
--font-sm: 0.875rem;   // 14px
--font-base: 1rem;     // 16px
--font-lg: 1.125rem;   // 18px
--font-xl: 1.25rem;    // 20px
--font-2xl: 1.5rem;    // 24px
--font-3xl: 1.875rem;  // 30px
--font-4xl: 2.25rem;   // 36px

// 폰트 굵기
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

// 줄 높이 (Line Height)
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

### 2.3. 간격 (Spacing Scale)

4px / 8px 기본 단위의 규칙적인 그리드 스케일을 채택하고 있습니다.

| 토큰명 | 픽셀 환산 | Rem 값 | 주요 용도 |
| :--- | :--- | :--- | :--- |
| `--space-1` | 4px | `0.25rem` | 미세 패딩, 아이콘 마진 |
| `--space-2` | 8px | `0.5rem` | 버튼 내 인라인 여백, 배지 여백 |
| `--space-3` | 12px | `0.75rem` | 인풋 패딩, 카드 소형 여백 |
| `--space-4` | 16px | `1rem` | 표준 블록 패딩, 그리드 간격 |
| `--space-5` | 20px | `1.25rem` | 모달 헤더 여백 |
| `--space-6` | 24px | `1.5rem` | 카드 컨테이너 패딩 |
| `--space-8` | 32px | `2rem` | 섹션 간 마진 |
| `--space-10` | 40px | `2.5rem` | 화면 상단 여백 |
| `--space-12` | 48px | `3rem` | 대형 섹션 간격 |
| `--space-16` | 64px | `4rem` | 히어로 섹션 상하 패딩 |

---

### 2.4. 모서리 라운딩 및 그림자 (Border Radius & Shadows)

```scss
// 라운딩
--radius-none: 0px;
--radius-sm: 4px;      // 배지, 태그
--radius-md: 8px;      // 버튼, 입력 필드
--radius-lg: 12px;     // 카드, 팝오버
--radius-xl: 16px;     // 모달, 다이얼로그
--radius-full: 9999px; // 필 버튼, 아바타

// 그림자 (Elevation)
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

// 트랜지션
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 3. UI 컴포넌트 명세 (`src/components/ui/`)

본 프로젝트에서 표준 구현 및 유지보수하는 디자인 시스템 컴포넌트입니다.

### 3.1. `Button` (`@/components/ui/Button/Button`)
- **베리언트**: `primary`, `secondary`, `outlined`, `ghost`
- **사이즈**: `sm` (32px 높이), `md` (40px 높이), `lg` (48px 높이)
- **상태**: `disabled`, `loading` (스피너 표시)
- **아이콘**: `startIcon`, `endIcon`

### 3.2. `Dialog` (`@/components/ui/Dialog/Dialog`)
- **기능**: 포털 렌더링, ESC 키 닫기, 배경 클릭 닫기, 포커스 트랩
- **브라우저 뒤로가기 안전**: 모바일의 `popstate` 이벤트에 대응하여 뒤로가기 버튼 클릭 시 안전하게 닫힘
- **구조**: `DialogTitle`, `DialogContent`, `DialogActions`

### 3.3. `Input` (`@/components/ui/Input/Input`)
- **기능**: 라벨, 플레이스홀더, 헬퍼 텍스트, 에러 메시지 표시
- **상태**: `focus`, `error`, `disabled`

### 3.4. `Tabs` (`@/components/ui/Tabs/Tabs`)
- **기능**: WAI-ARIA 대응 키보드 네비게이션(화살표 키 조작), 활성 인디케이터

---

## 4. Dembrandt 실행 및 유지보수 흐름

프로젝트 시작 시나 리브랜딩 시 새로운 디자인 파라미터를 추출/갱신하는 명령어:

```bash
# 1. 대상 사이트로부터 AI용 DESIGN.md 추출
npx dembrandt https://example.com --design-md

# 2. DTCG W3C 표준 토큰 JSON 추출
npx dembrandt https://example.com --dtcg

# 3. 추출된 콘솔 결과를 본 문서 (DESIGN.md) 및 _variables.scss에 반영
```
