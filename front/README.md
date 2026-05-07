# 🎨 프론트엔드 (React + Vite + Redux)

현대적인 React 애플리케이션 구조로 구성된 할 일 체크리스트 프론트엔드입니다.

## 📂 디렉토리 구조

```
src/
├── components/              # React 컴포넌트
│   ├── Header.tsx           # 헤더 컴포넌트
│   ├── Header.module.css
│   ├── AddTaskForm.tsx      # 작업 추가 폼
│   ├── AddTaskForm.module.css
│   ├── TaskList.tsx         # 작업 목록
│   ├── TaskList.module.css
│   ├── TaskItem.tsx         # 개별 작업 항목
│   └── TaskItem.module.css
│
├── features/                # Redux 상태 관리
│   ├── tasksSlice.ts        # Tasks 상태 슬라이스
│   └── store.ts             # Redux 스토어 설정
│
├── api/                     # API 클라이언트
│   └── tasks.ts             # 작업 API 함수들
│
├── styles/                  # 스타일
│   ├── global.css           # 전역 스타일 & 디자인 토큰
│   └── theme.ts             # 테마 설정 (향후 사용)
│
├── hooks/                   # 커스텀 훅
│   └── useLocalStorage.ts   # 로컬 스토리지 훅
│
├── App.tsx                  # 메인 App 컴포넌트
├── App.css                  # App 스타일
└── main.tsx                 # 진입점
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

### 빌드

```bash
npm run build
```

### 린트 확인

```bash
npm run lint
npm run format
```

## 🏗️ 주요 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18.2+ | UI 라이브러리 |
| Vite | 5.0+ | 번들러 & 개발 서버 |
| Redux Toolkit | 1.9+ | 상태 관리 |
| React Redux | 8.1+ | React Redux 바인딩 |
| Axios | 1.6+ | HTTP 클라이언트 |
| TypeScript | 5.0+ | 타입 안정성 |

## 📝 주요 컴포넌트

### Header
- 앱 제목과 완료 통계 표시
- 다크/라이트 모드 토글
- Redux와 연동한 상태 관리

### AddTaskForm
- 새 작업 입력 필드
- 유효성 검사 (빈 값, 최대 길이)
- Redux 디스패치를 통한 작업 생성
- 키보드 단축키 (Enter) 지원

### TaskList
- 작업 목록 필터링 (전체, 진행 중, 완료)
- 반응형 그리드 레이아웃
- 빈 상태 메시지 표시

### TaskItem
- 작업 체크박스
- 삭제 버튼
- 생성 날짜 표시
- 완료 상태 시각화

## 🎨 Toss 스타일 디자인

### 디자인 특징
- **글래스모피즘**: 반투명 배경과 부드러운 테두리
- **미니멀리스트**: 불필요한 요소 제거
- **파스텔 색상**: 부드러운 색상 팔레트
- **마이크로 인터랙션**: 호버, 클릭 시 부드러운 애니메이션
- **토폴로지**: 일관된 간격 및 타이포그래피

### CSS 변수
글로벌 스타일에서 정의된 CSS 변수를 사용합니다:
- `--color-*`: 색상
- `--space-*`: 간격
- `--shadow-*`: 그림자
- `--transition-*`: 애니메이션 지속 시간

## 🔄 상태 관리 (Redux)

### Slice 구조
```typescript
{
  tasks: {
    items: Task[],           // 작업 배열
    loading: boolean,        // 로딩 상태
    error: string | null,    // 에러 메시지
    isDarkMode: boolean,     // 테마 모드
  }
}
```

### 주요 액션
- `addTask`: 작업 추가
- `toggleTask`: 완료 상태 토글
- `deleteTask`: 작업 삭제
- `toggleDarkMode`: 다크모드 토글
- `setTasks`: 작업 목록 설정

### 비동기 Thunks
- `fetchTasksAsync`: 모든 작업 조회
- `createTaskAsync`: 새 작업 생성
- `toggleTaskAsync`: 작업 완료 토글
- `deleteTaskAsync`: 작업 삭제

## 🌐 API 통신

### 엔드포인트
- `GET /api/tasks` - 모든 작업 조회
- `POST /api/tasks` - 새 작업 생성
- `PATCH /api/tasks/:id` - 작업 업데이트
- `DELETE /api/tasks/:id` - 작업 삭제

### 환경 변수
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=Todo Checklist
```

## ♿ 접근성 (A11y)

- ✅ 시맨틱 HTML
- ✅ ARIA 레이블
- ✅ 키보드 네비게이션
- ✅ 색상 대비 (WCAG AA 준수)
- ✅ 포커스 스타일

## 📱 반응형 디자인

- 모바일: 320px+
- 태블릿: 768px+
- 데스크톱: 1024px+

미디어 쿼리 기준점:
```css
@media (max-width: 640px) { /* 모바일 */ }
@media (max-width: 1024px) { /* 태블릿 */ }
```

## 🧪 테스트

테스트는 Vitest 기반으로 작성됩니다:

```bash
npm run test
```

## 🔒 보안

- XSS 방지: React의 자동 이스케이프
- CSRF 보호: CORS 정책 준수
- 입력 검증: 클라이언트/서버 양쪽 검증

## 📚 Copilot 프롬프트 활용

각 파일의 주석에 Copilot 프롬프트가 포함되어 있습니다. 예를 들어:

```typescript
/*
 * Copilot Prompt:
 * Create a Header component with ...
 */
```

Copilot을 사용하여 추가 기능을 구현하려면:
1. 구현할 위치에 주석으로 요구사항 작성
2. Copilot 채팅에서 해당 코드 선택 후 프롬프트 전송
3. 생성된 코드 검토 및 통합

## 🎯 향후 개선 사항

- [ ] 로컬 스토리지 동기화 (옵션)
- [ ] 작업 카테고리 추가
- [ ] 마감 시간 설정
- [ ] 반복되는 작업
- [ ] 공동 작업 지원
- [ ] 모바일 앱 (React Native)
- [ ] 오프라인 모드

## 📞 문제 해결

### CORS 에러
- 백엔드 `.env`에서 `CORS_ORIGIN` 확인
- 프론트엔드 `vite.config.ts`의 프록시 설정 확인

### 상태 동기화 실패
- Redux DevTools로 상태 확인
- 네트워크 탭에서 API 요청 확인

### 스타일 적용 안 됨
- CSS 모듈 임포트 확인
- 전역 스타일 로드 확인

## 📖 참고 자료

- [React 공식 문서](https://react.dev)
- [Vite 가이드](https://vitejs.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [TypeScript](https://www.typescriptlang.org)
