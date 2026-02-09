#!/usr/bin/env node

/**
 * GitHub의 next.config.mjs 파일에서 output: "export" 설정을 제거합니다
 * 이를 통해 Vercel 배포 시 미들웨어와의 충돌을 해결합니다
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../next.config.mjs');

const correctConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
`;

try {
  fs.writeFileSync(configPath, correctConfig, 'utf8');
  console.log('[v0] ✅ next.config.mjs가 성공적으로 수정되었습니다!');
  console.log('[v0] output: "export" 설정이 제거되었습니다.');
} catch (error) {
  console.error('[v0] ❌ 파일 수정 실패:', error.message);
  process.exit(1);
}
