# ghas-lab

⚠️ **의도적으로 취약한 코드입니다. 절대 실제 환경에 사용하지 마세요.**

GitHub Advanced Security(GHAS)의 탐지 범위와 **한계**를 실증적으로 측정하기 위한 연구용 랩입니다.

## 설계 원칙

각 취약점 파일은 행정안전부 「소프트웨어 개발보안 가이드」 **47개 진단항목 번호**에 1:1로 매핑되어 있습니다.
따라서 스캔 결과가 곧 **진단항목별 CodeQL 커버리지 실측 데이터**가 됩니다.

## 구성

| 파일 | 진단항목 | CWE | 예상 결과 |
|---|---|---|---|
| `src/01-sql-injection.js` | 01 SQL 삽입 | CWE-89 | ✅ 탐지 |
| `src/02-05-injection.js` | 02 코드삽입 / 05 OS명령삽입 | CWE-94, CWE-78 | ✅ 탐지 |
| `src/03-07-path-redirect.js` | 03 경로조작 / 07 Open Redirect | CWE-22, CWE-601 | ✅ 탐지 |
| `src/04-32-xss-errorleak.js` | 04 XSS / 32 오류메시지 노출 | CWE-79, CWE-209 | ✅ 탐지 |
| `src/17-22-crypto-secrets.js` | 17 취약암호 / 18 평문저장 / 20 하드코드 / 22 난수 | CWE-327, 312, 798, 330 | ✅ 탐지 |
| `src/90-undetectable-control.js` | **14, 15, 23, 29** | CWE-306, 285, 521, 307 | ❌ **탐지 불가(정상)** |

`90-undetectable-control.js`는 **대조군**입니다.
이 파일에서 알림이 0건으로 나오는 것이 정상이며, 이것이 *"정적분석으로 원천 불가한 항목이 존재한다"*는 주장의 실증 근거가 됩니다.

## 스위트 비교

두 워크플로가 동일 코드를 각각 다른 스위트로 분석합니다.

- `codeql-default.yml` → default(code-scanning) 스위트
- `codeql-extended.yml` → security-extended 스위트

`category`를 다르게 지정해 두 결과가 Security 탭에 공존합니다.

## 랩 진행

- Lab 1: 스위트별 탐지 건수 비교
- Lab 2: `evade/` 에 우회 코드를 넣어 미탐(False Negative) 목록 작성
- Lab 4: Secret scanning push protection 경계 측정
- Lab 5: Copilot 생성 코드의 취약점 발생률 측정
