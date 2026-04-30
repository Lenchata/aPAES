import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  turbopack: {},
  /* config options here */
};

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  // Inject our custom SW logic (background sync, API caching)
  customWorkerSrc: "public",
  customWorkerPrefix: "sw-custom",
  workboxOptions: {
    disableDevLogs: true,
    // Cache app shell and static assets
    runtimeCaching: [
      {
        // Cache the app shell (HTML pages)
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "apaes-pages-cache",
          expiration: { maxEntries: 32, maxAgeSeconds: 86400 },
          networkTimeoutSeconds: 10,
        },
      },
    ],
  },
})(nextConfig);
