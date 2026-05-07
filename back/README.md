# 🔧 백엔드 (Node.js + Express)

TypeScript 기반의 확장 가능한 Node.js Express 백엔드 API입니다.

## 📂 디렉토리 구조

```
src/
├── index.ts                   # Express 앱 엔트리포인트
│
├── routes/                    # API 라우트
│   └── tasks.ts               # 작업 관련 라우트
│
├── controllers/               # 요청 핸들러
│   └── tasksController.ts     # 작업 컨트롤러
│
├── services/                  # 비즈니스 로직
│   └── taskService.ts         # 작업 서비스 (CRUD 로직)
│
├── models/                    # 데이터 모델
│   └── task.ts                # Task 인터페이스
│
├── middlewares/               # Express 미들웨어
│   └── errorHandler.ts        # 에러 처리 미들웨어
│
└── config/                    # 설정
    └── env.ts                 # 환경 변수 관리

tests/
└── tasks.test.ts              # 작업 API 테스트
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 환경 설정

```bash
cp .env.example .env
```

### 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:3000`에서 시작됩니다.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm run build
npm start
```

### 린트 & 포맷팅

```bash
npm run lint
npm run format
```

### 테스트 실행

```bash
npm run test
```

## 🏗️ 아키텍처

### 계층 구조

```
HTTP Request
    ↓
Routes (라우팅 + 검증)
    ↓
Controllers (요청 처리)
    ↓
Services (비즈니스 로직)
    ↓
Models (데이터 구조)
    ↓
Error Middleware (에러 처리)
    ↓
HTTP Response
```

## 📋 API 엔드포인트

### 1. 모든 작업 조회
```http
GET /api/tasks
```

**응답:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "text": "프로젝트 기획서 작성",
    "completed": false,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
]
```

### 2. 특정 작업 조회
```http
GET /api/tasks/:id
```

**응답:** 작업 객체 또는 404 에러

### 3. 새 작업 생성
```http
POST /api/tasks
Content-Type: application/json

{
  "text": "새로운 작업"
}
```

**응답:** (201) 생성된 작업 객체

**검증:**
- `text` 필수 (빈 값 불가)
- 최대 100자

### 4. 작업 업데이트
```http
PATCH /api/tasks/:id
Content-Type: application/json

{
  "completed": true
}
// 또는
{
  "text": "수정된 내용"
}
```

**응답:** 업데이트된 작업 객체

**주의:** 빈 body로 요청 시 완료 상태가 토글됩니다.

### 5. 작업 삭제
```http
DELETE /api/tasks/:id
```

**응답:** (204) No Content

## 🗄️ 데이터 모델

### Task 인터페이스
```typescript
interface Task {
  id: string              // UUID v4
  text: string            // 작업 내용 (1-100자)
  completed: boolean      // 완료 상태
  createdAt: string       // ISO 8601 타임스탬프
  updatedAt: string       // ISO 8601 타임스탐프
}
```

## 💾 데이터 저장소

### 현재: 메모리 기반 저장소
- 개발 및 테스트용으로 최적화
- 서버 재시작 시 데이터 소실
- Map 기반 빠른 조회

### 향후 마이그레이션 포인트

#### JSON 파일 저장소
```typescript
// src/services/taskService.ts의 데이터 소스 변경
// 파일 I/O 로직 추가
```

#### 데이터베이스 (예: MongoDB, PostgreSQL)
```typescript
// 데이터베이스 라이브러리 추가 (mongoose, typeorm 등)
// 스키마 정의
// 데이터베이스 커넥션 관리
```

## 🔌 핵심 모듈 설명

### TaskService
비즈니스 로직을 담당합니다:
- 데이터 검증
- CRUD 작업 수행
- 타임스탬프 관리
- 에러 처리

### TaskController
HTTP 요청/응답을 처리합니다:
- 입력 검증
- 상태 코드 설정
- 비동기 처리
- 에러 전달

### Routes
API 라우팅과 입증을 담당합니다:
- UUID 형식 검증
- 라우트 매핑

### Error Middleware
중앙화된 에러 처리:
- 에러 로깅
- 일관된 응답 형식
- 프로덕션 에러 숨김

## 🔒 보안

### CORS
```typescript
// src/index.ts
app.use(cors({ origin: config.corsOrigin }))
```

### 입력 검증
- 텍스트 길이 제한
- UUID 형식 검증
- 빈 값 방지

### 에러 처리
- 내부 에러 상세 정보 숨김
- 일관된 에러 응답

## 🧪 테스트

### 테스트 커버리지
- Task 생성/수정/삭제
- 입력 검증
- 에러 케이스
- 데이터 무결성

### 테스트 실행
```bash
npm run test

# 감시 모드
npm run test -- --watch
```

## 📊 로깅

서버는 다음을 로그합니다:
- 서버 시작
- 작업 생성/수정/삭제
- 에러 (타임스탬프, 상태, 경로)
- API 요청 (개발 중)

## 📈 성능 최적화

### 현재 최적화
- UUID를 사용한 O(1) 조회
- Map 데이터 구조

### 향후 개선사항
- 페이지네이션 (많은 작업 처리)
- 캐싱 전략 (Redis)
- 데이터베이스 인덱싱
- API 속도 제한

## 🚨 에러 처리

### 주요 에러 코드

| 상태 | 설명 |
|------|------|
| 201 | Created - 작업 생성 성공 |
| 204 | No Content - 작업 삭제 성공 |
| 400 | Bad Request - 입력 검증 실패 |
| 404 | Not Found - 작업 미존재 |
| 500 | Server Error - 서버 오류 |

### 에러 응답 형식
```json
{
  "error": "에러 메시지",
  "path": "/api/tasks/:id",
  "timestamp": "2024-01-01T10:00:00Z"
}
```

## 🔄 환경 변수

`.env` 파일에서 설정합니다:

```env
# 환경
NODE_ENV=development

# 포트
PORT=3000

# API 기본 URL
API_URL=http://localhost:3000

# CORS 설정
CORS_ORIGIN=http://localhost:5173
```

## 🚀 배포

### Heroku
```bash
heroku create <app-name>
git push heroku main
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t todo-checklist-api .
docker run -p 3000:3000 todo-checklist-api
```

## 📚 Copilot 프롬프트 활용

각 파일의 주석에 구현 가이드가 포함되어 있습니다:

```typescript
/*
 * Copilot Prompt:
 * Create the main Express server entry point with...
 */
```

추가 기능을 구현하려면:
1. 구현 위치에 프롬프트 주석 작성
2. Copilot 채팅에서 코드 선택 후 프롬프트 전송
3. 생성된 코드 통합 및 테스트

## 🎯 향후 기능 로드맵

- [ ] 사용자 인증 (JWT)
- [ ] 작업 카테고리/태그
- [ ] 마감 시간 및 알림
- [ ] 반복 작업
- [ ] 데이터베이스 통합
- [ ] WebSocket 실시간 동기화
- [ ] 다중 사용자 지원
- [ ] 백업/내보내기

## 📞 문제 해결

### 포트 이미 사용 중
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS 에러
- 프론트엔드 URL이 `.env`의 `CORS_ORIGIN`과 일치하는지 확인
- 브라우저 콘솔의 CORS 에러 메시지 확인

### 모듈 호출 에러
- `npm install` 재실행
- `tsconfig.json`의 경로 별칭 확인

## 📖 참고 자료

- [Express 공식 문서](https://expressjs.com)
- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [UUID v4](https://www.npmjs.com/package/uuid)

## 📝 개발 체크리스트

- [ ] 로컬 테스트 완료
- [ ] CORS 설정 확인
- [ ] 환경 변수 설정
- [ ] API 문서 작성
- [ ] 테스트 코드 작성
- [ ] 에러 처리 검증
- [ ] 성능 테스트
- [ ] 배포 준비
