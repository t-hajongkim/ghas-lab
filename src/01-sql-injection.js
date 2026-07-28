// 진단항목 01 | SQL 삽입 | CWE-89 | 예상: CodeQL default suite 탐지
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createConnection({ host: 'localhost', user: 'app', database: 'fund' });

// [VULN-01] 계좌번호를 문자열 연결로 쿼리에 삽입
router.get('/account', (req, res) => {
  const accountNo = req.query.accountNo;
  const sql = "SELECT balance, holder FROM accounts WHERE account_no = '" + accountNo + "'";
  db.query(sql, (err, rows) => {
    res.json(rows);
  });
});

// [VULN-01b] 펀드 수익률 조회 - 템플릿 리터럴 삽입
router.get('/fund', (req, res) => {
  const code = req.query.code;
  db.query(`SELECT * FROM fund_returns WHERE fund_code = '${code}'`, (err, rows) => {
    res.json(rows);
  });
});

module.exports = router;
