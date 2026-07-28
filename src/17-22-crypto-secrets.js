// 진단항목 17 | 취약한 암호화 알고리즘 | CWE-327
// 진단항목 20 | 하드코드된 비밀번호 | CWE-798
// 진단항목 22 | 적절하지 않은 난수 값 | CWE-330
// 진단항목 18 | 중요정보 평문 저장 | CWE-312
const crypto = require('crypto');
const fs = require('fs');

// [VULN-20] 하드코딩된 자격증명
const DB_PASSWORD = "MiraeFund2026!admin";
const INTERNAL_API_KEY = "mrae_int_9f3a2b1c8d7e6f5a4b3c2d1e";

// [VULN-17] 취약한 해시/암호 알고리즘
function hashPassword(pw) {
  return crypto.createHash('md5').update(pw).digest('hex');
}
function encryptData(data, key) {
  const cipher = crypto.createCipheriv('des-ecb', key, null);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// [VULN-22] 예측 가능한 난수로 세션 토큰 생성
function generateSessionToken() {
  return Math.random().toString(36).substring(2);
}

// [VULN-18] 고객 주민번호 평문 저장
function saveCustomer(name, ssn) {
  fs.appendFileSync('/data/customers.txt', `${name},${ssn}\n`);
}

module.exports = { hashPassword, encryptData, generateSessionToken, saveCustomer, DB_PASSWORD, INTERNAL_API_KEY };
