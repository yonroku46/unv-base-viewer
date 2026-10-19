# Web Application Viewer Boilerplate

Next.js 15+ App Router 기반의 현대적인 웹 서비스 보일러플레이트입니다. Material UI(MUI v6), SCSS, Redux Toolkit, 그리고 AI 에이전트 지침 체계를 기본 탑재하고 있습니다.

---

## 🚀 새로운 서비스 생성 시 설정 (Quick Setup)

본 저장소를 복사하여 새로운 서비스를 시작할 때는 **오직 아래 2곳만 수정**하시면 프로젝트 전체(UI, 메타데이터, 브랜딩)가 즉시 연동됩니다:

### 1. `package.json`
```json
{
  "name": "your-new-service-name"
}
```

### 2. `.env.development` (및 `.env.production`)
```env
NEXT_PUBLIC_APP_NAME="당신의 서비스명"
NEXT_PUBLIC_COPYRIGHT="회사명"
NEXT_DEFAULT_METADATA_TITLE="서비스명"
NEXT_DEFAULT_METADATA_DESCRIPTION="서비스 소개 문구"
```

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: Next.js 15+ (App Router)
- **Library**: React 19, TypeScript 5
- **UI & Styling**: Material UI (MUI v6), SCSS (`sass`)
- **State Management**: Redux Toolkit, Redux Persist
- **HTTP Client**: Axios (중앙화된 싱글톤 인스턴스)
- **Utilities**: Dayjs (Asia/Tokyo preconfigured), Notistack (스낵바 알림)

---

## 🧭 아키텍처 및 에이전트 지침

- [ARCHITECTURE.md](ARCHITECTURE.md): 변경 유형별 시작 경로(Starting Paths) & 레이어 책임 지도
- [TECH.md](TECH.md): 10가지 절대 금지 규칙(Negative Constraints) & 코드 컨벤션
- [AGENTS.md](AGENTS.md): AI 에이전트 6단계 작업 프로토콜
- [.agents/learnings/](.agents/learnings/): 축적된 AI 학습 및 주의사항 지식 베이스
- [.agents/skills/](.agents/skills/): 페이지 및 API 추가 표준 스킬 가이드

---

## 💻 실행 및 검증 (Commands)

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
