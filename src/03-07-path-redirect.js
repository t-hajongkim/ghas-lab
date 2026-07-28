// 진단항목 03 | 경로 조작 및 자원 삽입 | CWE-22
// 진단항목 07 | 자동접속 연결 (Open Redirect) | CWE-601
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// [VULN-03] 사용자 입력 파일명을 그대로 경로에 사용
router.get('/download', (req, res) => {
  const file = req.query.file;
  const content = fs.readFileSync(path.join('/var/reports/', file));
  res.send(content);
});

// [VULN-07] 검증 없는 리다이렉트
router.get('/login-success', (req, res) => {
  const next = req.query.returnUrl;
  res.redirect(next);
});

module.exports = router;
