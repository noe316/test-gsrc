// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }
//
// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // 👈 GitHub Pages 배포를 위해 필수!
  basePath: "/test-gsrc", // 👈 레포지토리 이름 (CSS/JS 경로 문제 해결)
  images: {
    unoptimized: true, // 👈 GitHub Pages에서는 Next.js 이미지 최적화 기능 사용 불가
  },
};

export default nextConfig;
