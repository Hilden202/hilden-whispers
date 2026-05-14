import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

const normalizeBasePath = (basePath = "/") => {
  if (basePath === "./") return basePath;
  if (ABSOLUTE_URL_PATTERN.test(basePath)) {
    return basePath.endsWith("/") ? basePath : `${basePath}/`;
  }

  const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
};

const basePath = normalizeBasePath(
  process.env.VITE_BASE_PATH ||
    (process.env.NODE_ENV === "production" ? "/hilden-whispers/" : "/")
);
const publicPath = (assetPath: string) => `${basePath}${assetPath.replace(/^\/+/, "")}`;

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: basePath,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
            },
          },
        ],
      },
      manifest: {
        name: "Hilden Visioner – Podcast",
        short_name: "Hilden Visioner",
        description: "Teknik, tankar och visioner – en podcast av Hilden Media",
        theme_color: "#0d1117",
        background_color: "#0d1117",
        display: "standalone",
        orientation: "portrait",
        start_url: basePath,
        icons: [
          {
            src: publicPath("pwa-icon-192.png"),
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: publicPath("pwa-icon-512.png"),
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: publicPath("pwa-icon-512.png"),
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
