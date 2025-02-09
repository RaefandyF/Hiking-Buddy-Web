// next.config.mjs
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development"; // Periksa apakah mode dev

const pwaConfig = {
  dest: "public", // Menentukan folder tempat service worker dan file terkait PWA disimpan
  disable: isDev, // Matikan PWA saat mode pengembangan
};

const nextConfig = {
  
};

export default withPWA({
  ...nextConfig, // Gabungkan konfigurasi Next.js dengan konfigurasi PWA
  ...pwaConfig, // Terapkan konfigurasi PWA
});
