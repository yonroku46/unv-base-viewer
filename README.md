# Web Application Viewer Boilerplate

Next.js 15+ App Router를 기반으로 한 모던 웹 서비스/홈페이지용 보일러플레이트입니다. **Dembrandt**를 활용한 프로젝트 고유의 자체 디자인 시스템, SCSS, Redux Toolkit, 그리고 AI 에이전트용 행동 규범 및 지식 베이스를 표준 탑재하고 있습니다.

---

## 🚀 신규 서비스 시작 시 설정 (Quick Setup)

본 저장소를 복제하여 새로운 서비스를 시작할 때는 **아래 2곳만 변경**하면 프로젝트 전체(UI, 메타데이터, 브랜딩)에 즉시 연동됩니다.

### 1. `package.json`
```json
{
  "name": "your-new-service-name"
}
```

### 2. `.env.development` (및 `.env.production`)
```env
NEXT_PUBLIC_APP_NAME="서비스명"
NEXT_PUBLIC_COPYRIGHT="회사명"
NEXT_DEFAULT_METADATA_TITLE="서비스명"
NEXT_DEFAULT_METADATA_DESCRIPTION="서비스 소개 문구"
```

---

## 🛠️ 기술 스택 (Tech Stack)

- **프레임워크**: Next.js 15+ (App Router)
- **라이브러리**: React 19, TypeScript 5
- **UI & 스타일링**: 프로젝트 자체 디자인 시스템 (Dembrandt 토큰 기반), SCSS (`sass`)
- **상태 관리**: Redux Toolkit, Redux Persist
- **HTTP 클라이언트**: Axios (중앙 싱글톤 인스턴스)
- **유틸리티**: Dayjs (한국 표준시 `Asia/Seoul`, 로케일 `ko` 설정 완료), Notistack (스낵바 알림)

---

## 🎨 디자인 시스템 운영 (Dembrandt Workflow)

본 프로젝트는 외부 거대 UI 라이브러리에 의존하지 않고, **Dembrandt**(`dembrandt <url> --design-md` / `--dtcg`)의 분석 결과를 바탕으로 각 프로젝트 고유의 디자인 시스템을 구축 및 운영합니다.

- [DESIGN.md](DESIGN.md): Dembrandt에서 추출된 색상, 타이포그래피, 간격, 모서리 라운딩, 그림자 토큰 명세서
- `src/styles/base/_variables.scss`: 토큰을 CSS 커스텀 속성(변수)으로 정의
- `src/components/ui/`: 순수 React + SCSS로 구현된 재사용 가능한 디자인 시스템 컴포넌트

---

## 🧭 아키텍처 및 에이전트 규약

- [DESIGN.md](DESIGN.md): 프로젝트 고유의 디자인 시스템 설계서 (Dembrandt 연동)
- [ARCHITECTURE.md](ARCHITECTURE.md): 변경 유형별 시작 경로(Starting Paths) 및 레이어 책임 맵
- [TECH.md](TECH.md): 10대 금지 규칙(Negative Constraints) 및 코드 규약
- [AGENTS.md](AGENTS.md): AI 에이전트의 작업 프로토콜 및 단일 진실 공급원(SSOT) 규약
- [.agents/learnings/](.agents/learnings/): 과거 트러블 및 해결책을 축적하는 지식 베이스
- [.agents/skills/](.agents/skills/): 페이지 및 API 추가 표준 가이드

---

## 💻 실행 및 검증 명령어 (Commands)

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (http://localhost:3000)
yarn dev

# 린트 검증
yarn lint

# 프로덕션 빌드 검증
yarn build
```
