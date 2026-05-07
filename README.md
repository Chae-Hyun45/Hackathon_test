# 📝 Todo Checklist - Toss Style

토스 스타일의 미려한 UI를 가진 현대적인 할 일 체크리스트 애플리케이션입니다. React + Vite 프론트엔드와 Node.js 백엔드로 구성되어 있습니다.

## 🎯 프로젝트 구조

```
Hackathon_test/
├── front/                 # React + Vite 프론트엔드
│   ├── src/
│   │   ├── components/   # React 컴포넌트
│   │   ├── features/     # Redux 상태 관리
│   │   ├── api/          # API 클라이언트
│   │   ├── styles/       # 전역 스타일
│   │   ├── hooks/        # 커스텀 훅
│   │   ├── App.tsx       # 메인 App 컴포넌트
│   │   └── main.tsx      # 진입점
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── back/                  # Node.js Express 백엔드
│   ├── src/
│   │   ├── routes/       # API 라우트
│   │   ├── controllers/  # 요청 핸들러
│   │   ├── services/     # 비즈니스 로직
│   │   ├── models/       # 데이터 모델
│   │   ├── middlewares/  # Express 미들웨어
│   │   ├── config/       # 설정
│   │   └── index.ts      # 메인 엔트리포인트
│   ├── tests/            # 테스트 코드
│   ├── package.json
│   └── tsconfig.json
│
└── README.md             # 이 파일
```

## ✨ 주요 기능

- ✅ **할 일 추가/삭제** - 새로운 작업을 추가하고 삭제
- ✅ **완료 표시** - 완료된 항목 체크 및 해제
- ✅ **필터링** - 전체, 진행 중, 완료된 항목 필터링
- ✅ **다크 모드** - 라이트/다크 모드 토글
- ✅ **실시간 동기화** - 클라이언트-서버 간 실시간 데이터 동기화
- ✅ **반응형 디자인** - 모바일부터 데스크톱까지 완벽 지원
- ✅ **접근성** - ARIA 레이블, 키보드 네비게이션 지원

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 1. 프론트엔드 설치
cd front
npm install
npm run dev

# 2. 새 터미널에서 백엔드 설치
cd back
npm install
npm run dev
```

### 환경 설정

```bash
# 프론트엔드 (.env 파일 생성)
cd front
cp .env.example .env

# 백엔드 (.env 파일 생성)
cd back
cp .env.example .env
```

## 📚 API 문서

### 엔드포인트

#### GET `/api/tasks`
모든 작업을 조회합니다.

**응답:**
```json
[
  {
    "id": "uuid",
    "text": "작업 내용",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST `/api/tasks`
새로운 작업을 생성합니다.

**요청:**
```json
{
  "text": "새로운 작업"
}
```

**응답:** 생성된 작업 객체 (201)

#### PATCH `/api/tasks/:id`
작업을 업데이트합니다 (완료 여부 토글 또는 텍스트 수정).

**요청:**
```json
{
  "completed": true
}
// 또는
{
  "text": "수정된 내용"
}
```

**응답:** 업데이트된 작업 객체

#### DELETE `/api/tasks/:id`
작업을 삭제합니다.

**응답:** 204 No Content

## 🛠️ 개발 가이드

### 프론트엔드

#### 주요 파일
- `src/App.tsx` - 메인 애플리케이션 컴포넌트
- `src/features/tasksSlice.ts` - Redux 상태 관리
- `src/components/` - React 컴포넌트들
- `src/styles/global.css` - 전역 스타일 및 Toss 디자인 토큰

#### 스타일 시스템
- CSS 모듈 + CSS 변수를 활용한 테마 시스템
- 라이트/다크 모드 자동 전환
- Toss 스타일: 글래스모피즘, 부드러운 섀도우, 파스텔 색상

#### 상태 관리
- Redux Toolkit 사용
- createAsyncThunk로 비동기 API 호출 관리
- 낙관적 UI 업데이트 지원

### 백엔드

#### 주요 파일
- `src/index.ts` - Express 서버 설정
- `src/routes/tasks.ts` - 라우트 정의
- `src/controllers/tasksController.ts` - 요청 핸들러
- `src/services/taskService.ts` - 비즈니스 로직
- `src/models/task.ts` - 데이터 모델

#### 현재 저장소
- **메모리 저장소** (in-memory) - 개발/테스트용
- 향후 파일 시스템 또는 데이터베이스로 마이그레이션 가능

#### 에러 핸들링
- 중앙화된 에러 핸들러 미들웨어
- 일관된 에러 응답 형식
- 입력 값 검증

## 🧪 테스트

### 프론트엔드
```bash
cd front
npm run test
```

### 백엔드
```bash
cd back
npm run test
```

## 📝 코드 스타일

프로젝트는 다음 도구를 사용합니다:
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **TypeScript** - 타입 안정성

### 포맷팅
```bash
# 프론트엔드
cd front
npm run format

# 백엔드
cd back
npm run format
```

## 🔧 문제 해결

### 포트 충돌
기본값: 프론트엔드 5173, 백엔드 3000

```bash
# CORS 설정 확인 (.env)
# 백엔드: CORS_ORIGIN=http://localhost:5173
# 프론트엔드: VITE_API_BASE_URL=http://localhost:3000/api
```

### 모듈 찾을 수 없음 에러
```bash
# 경로 별칭 확인
# tsconfig.json의 paths 옵션 확인
```

## 📦 배포

### 프론트엔드
```bash
cd front
npm run build
# dist/ 폴더가 생성되며, 이를 호스팅 서비스에 배포
```

### 백엔드
```bash
cd back
npm run build
npm start
```

## 🎨 디자인 시스템

### 색상 팔레트 (라이트 모드)
- 배경: #ffffff
- 텍스트: #1a1a1a
- 강조: #0066ff
- 성공: #4caf50
- 에러: #f44336

### 타이포그래피
- 폰트 패밀리: System font stack
- 본문: 16px
- 제목: 24px - 32px

### 스페이싱
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

## 📖 Copilot 프롬프트 사용

각 주요 파일에 Copilot 프롬프트가 주석으로 포함되어 있습니다:

```typescript
/*
 * Copilot Prompt:
 * [구현할 기능에 대한 상세 설명]
 */
```

이 프롬프트를 Copilot에 전달하여 코드 생성/수정을 요청할 수 있습니다.

## 🤝 기여

이 프로젝트는 학습 및 개발 용도로 작성되었습니다.

## 📄 라이센스

MIT License

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.