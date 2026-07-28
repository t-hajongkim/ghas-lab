// ============================================================
// 정적분석 원천 불가 항목 — 실증용 대조군 (Control Group)
// 이 파일의 취약점들은 CodeQL이 "탐지하지 못하는 것이 정상"이다.
// Lab 결과에서 알림이 0건인 것을 확인해 고객 설명 근거로 사용한다.
// ============================================================
const express = require('express');
const router = express.Router();

// [진단항목 14 | CWE-306] 적절한 인증 없는 중요기능 허용
// 관리자 송금 기능인데 인증 미들웨어가 없다.
// → 도구는 "이 엔드포인트가 중요한가"를 알 수 없다.
router.post('/admin/transfer', (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;
  db.transfer(fromAccount, toAccount, amount);
  res.json({ ok: true });
});

// [진단항목 15 | CWE-285] 부적절한 인가
// 로그인은 했지만, 남의 계좌를 조회할 수 있다(IDOR).
// → 도구는 "이 사용자가 이 계좌의 주인인가"를 알 수 없다.
router.get('/account/:id', requireLogin, (req, res) => {
  const account = db.getAccount(req.params.id);
  res.json(account);
});

// [진단항목 23 | CWE-521] 취약한 비밀번호 허용
// 4자리면 통과. "강한 비밀번호"의 기준은 회사 정책이다.
function validatePassword(pw) {
  return pw.length >= 4;
}

// [진단항목 29 | CWE-307] 반복된 인증시도 제한 부재
// 실패 횟수 제한이 "없다". 부재를 증명하는 문제는 정적분석에 부적합.
router.post('/login', (req, res) => {
  const user = db.findUser(req.body.id);
  if (user && user.password === hash(req.body.pw)) {
    return res.json({ token: issueToken(user) });
  }
  res.status(401).json({ error: 'invalid' });
});

module.exports = router;
