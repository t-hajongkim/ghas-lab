// 진단항목 02 | 코드 삽입 | CWE-94
// 진단항목 05 | 운영체제 명령어 삽입 | CWE-78
const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// [VULN-02] 사용자 입력을 eval로 실행 - 수익률 계산식
router.post('/calc', (req, res) => {
  const formula = req.body.formula;
  const result = eval(formula);
  res.json({ result });
});

// [VULN-05] 리포트 생성 시 파일명을 셸 명령에 삽입
router.get('/report', (req, res) => {
  const name = req.query.name;
  exec('python generate_report.py --out ' + name, (err, stdout) => {
    res.send(stdout);
  });
});

module.exports = router;
