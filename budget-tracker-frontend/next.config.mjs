/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    srcDir: "src", // 👈 Add this to tell Next.js that your files are in `src/`
  };
  
  export default nextConfig;
  