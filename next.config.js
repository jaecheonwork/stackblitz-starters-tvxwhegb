/** @type {import('next').NextConfig} */
const nextConfig = {
    // 💡 ESLint(문법 검사관) 끄기
    eslint: {
      ignoreDuringBuilds: true,
    },
    // 💡 TypeScript(타입 검사관) 끄기
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;