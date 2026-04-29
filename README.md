# 박수민 — 풀스택 개발자 포트폴리오

> 현직 Laravel + Vue + Cordova 풀스택 / Java · Python 백엔드 / 데이터 분석 18권의 학습 산출물을 한 페이지에 담은 개인 포트폴리오 사이트입니다.

🔗 **Live Demo** : <!-- TODO: GitHub Pages or Vercel URL -->  https://sumin020415.github.io/portfolio
📄 **PDF 이력서** : 사이트 우측 상단 📄 버튼으로 즉시 인쇄/저장
📝 **Notion 아카이브** : https://rare-mountain-b86.notion.site/20da450b75e18047a530ea706ef4c93a

<!-- TODO: 미리보기 GIF 1장 추가 — 사이트 한 번 훑는 30~60초 GIF면 충분 -->
![preview](docs/preview.gif)

---

## 🛠 Tech Stack

| 영역 | 사용 기술 |
|------|-----------|
| **Markup / Style** | HTML5, CSS3 (CSS Variables 기반 테마 토큰) |
| **Script** | Vanilla JavaScript (프레임워크 · 번들러 없음) |
| **Library** | [TypeIt](https://www.typeitjs.com/) (CDN) |
| **Hosting** | GitHub Pages <!-- TODO: 실제 호스팅에 맞춰 수정 --> |
| **Tools** | VS Code, Git/GitHub, Figma |

> **선택 이유** : 포트폴리오 자체는 "이력서 + 작업물 보여주기"가 목적이므로 SPA 프레임워크의 학습/빌드 비용 없이 **페이지 로딩 속도와 정적 호스팅 친화성**을 우선했습니다. (React/Vite 경험은 안밤 프로젝트에서 별도로 보여줌)

---

## ✨ Features

- 🌗 **다크 / 라이트 테마 토글** — `localStorage` + `prefers-color-scheme` 기반 초기값. 이미지 아이콘은 `--img-filter: invert()` 토큰으로 자동 반전.
- 🎬 **모달 3종** — 영상 / 이미지 슬라이더 / 책 뷰어. 모두 ESC · 방향키 · 바깥 클릭 닫기 지원.
- 📚 **책 뷰어** — Pandas/Selenium 학습 산출물 18권을 PDF → 페이지 JPG로 변환해 책처럼 넘겨볼 수 있는 모달. ⭐ 추천 권 표시(`data-best`) 및 카테고리별 그라데이션 표지.
- 🎯 **스킬 탭 필터** — Frontend / Backend / Database / DevOps / Data·ML / Collab·Design 6개 카테고리. hover·click 듀얼 인터랙션.
- ✍️ **타이핑 인트로** — TypeIt으로 한 줄 자기소개 애니메이션.
- 📄 **PDF 인쇄** — `window.print()` + 전용 `print.css`로 별도 라이브러리 없이 처리.
- 📱 **반응형 3단계** — 1024 / 768 / 480 브레이크포인트. 모바일에서 사이드바 적층, 480 이하에서 책 카드 4단 압축.
- ♿ **접근성** — `aria-label`, `rel="noopener noreferrer"`, 키보드 내비게이션, `@media (hover: hover)` 분기로 터치 환경 어색함 제거.

---

## 📁 Project Structure

```
portfolio/
├── index.html              # 단일 페이지 (네비/사이드바/메인/모달 3종)
├── script.js               # 테마 · 탭필터 · 모달 3종을 IIFE로 모듈화 (~243줄)
├── css/
│   ├── base.css            # CSS 변수 (다크/라이트 토큰), 리셋, 폰트
│   ├── layout.css          # navbar / sidebar / main 그리드
│   ├── components.css      # 카드 · 스킬 · 프로젝트 · 배지 · 버튼
│   ├── modal.css           # 모달 3종 + 책 카드 디자인
│   ├── responsive.css      # 1024 / 768 / 480 미디어 쿼리
│   └── print.css           # PDF 출력 전용
├── img/
│   ├── skills/             # 기술 스택 아이콘
│   └── book/<카테고리>/    # 학습 산출물 18권의 페이지별 JPG
└── videos/                 # 프로젝트 시연 영상
```

---

## 🚀 Run Locally

별도 빌드 도구가 필요 없습니다.

```bash
# 1) 클론
git clone https://github.com/sumin020415/portfolio.git
cd portfolio

# 2) 둘 중 하나
#  (a) index.html 더블 클릭
#  (b) 정적 서버로 띄우기 (권장)
npx serve .
# 또는
python -m http.server 5500
```

브라우저에서 `http://localhost:5500` 접속.

---

## 🗂 Featured Projects (사이트 내 상세)

| 프로젝트 | 분류 | 스택 | 비고 |
|----------|------|------|------|
| **두플 (해외 K-라이프스타일 서비스)** | 현직 | Laravel · Vue · Cordova · MySQL · Pusher | 관리자 / 사용자 앱(하이브리드) / QR 주문 웹 3개 클라이언트 단일 API 운영 |
| **편의점 재고 관리 시스템** | 자바과정(1) | Python · PyQt5 · Oracle · pandas | 5일 단기 풀스택 / 로그인 5회 차단 · 발주 워크플로우 · 데이터 시각화 |
| **안밤 (안전 밤길)** | 자바과정(2) | Java · Spring Boot · Spring Security · JWT · Oracle · Docker · React · Kakao Map | 4인 팀 2주 / 부산 공공데이터 + 시민 제보 커뮤니티. DB·백엔드 전담 |
| **Python 데이터 작업 모음** | 개인 | Pandas · Seaborn · Selenium · BeautifulSoup · HDFS | 분석 10권 + 크롤링 8권. 책 뷰어 모달로 페이지 단위 열람 |

---

## 👤 About

- **이름** : 박수민
- **포지션** : 풀스택 개발자 (현직)
- **위치** : 부산시 해운대구
- **이메일** : sumin0759@kakao.com
- **GitHub** : [@sumin020415](https://github.com/sumin020415)
- **Notion** : [학습 아카이브](https://rare-mountain-b86.notion.site/20da450b75e18047a530ea706ef4c93a)

---

## 📜 License

본 리포지토리의 코드는 MIT 라이선스를 따릅니다.
다만 `img/`, `videos/`, 프로젝트 설명 텍스트 등 **콘텐츠는 개인 저작물로 무단 사용을 금합니다.**

---

> 🤝 채용 / 협업 제안은 메일(sumin0759@kakao.com)로 부담 없이 연락 주세요.

---