import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Let Vite handle chunk splitting automatically with proper dependency resolution
    // This ensures correct load order and avoids React initialization issues
    rollupOptions: {
      output: {
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // Don't use manual chunks - let Vite handle it automatically
        // Vite's automatic splitting respects dependencies and ensures correct load order
      },
    },
    // Warn if chunk exceeds 500KB (more aggressive limit for better performance)
    chunkSizeWarningLimit: 500,
    // Optimize asset handling - inline small assets to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Enable source maps only in development for faster builds
    sourcemap: mode === 'development',
    // Minify CSS for smaller bundle size
    cssMinify: true,
    // Minify JS - use esbuild for faster builds and better compatibility
    minify: mode === 'production' ? 'esbuild' : false,
    // Target modern browsers for smaller bundle size
    target: 'esnext',
    // Report compressed size to track bundle optimization
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      'recharts',
      'd3-scale',
      'd3-shape',
      'd3-time',
      'd3-time-format',
    ],
    // Force pre-bundling of recharts dependencies
    esbuildOptions: {
      target: 'esnext',
    },
  },
}));
