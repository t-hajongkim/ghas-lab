// 진단항목 04 | 크로스사이트 스크립트(XSS) | CWE-79
// 진단항목 32 | 오류 메시지를 통한 정보 노출 | CWE-209
const express = require('express');
const router = express.Router();

// [VULN-04] 사용자 입력을 이스케이프 없이 HTML에 반영
router.get('/search', (req, res) => {
  const keyword = req.query.q;
  res.send('<h1>검색 결과: ' + keyword + '</h1><div id="results"></div>');
});

// [VULN-32] 예외 스택트레이스를 응답에 노출
router.get('/portfolio', (req, res) => {
  try {
    throw new Error('DB connection failed at 10.20.30.40:3306');
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

module.exports = router;
