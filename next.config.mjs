// next.config.mjs
import withPWA from "next-pwa";

const pwaConfig = {
  dest: "public", // Menentukan folder tempat service worker dan file terkait PWA disimpan
};

const nextConfig = {
  
};

export default withPWA({
  ...nextConfig, // Gabungkan konfigurasi Next.js dengan konfigurasi PWA
  ...pwaConfig, // Terapkan konfigurasi PWA
});
