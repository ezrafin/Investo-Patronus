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
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Only split vendor libraries - let Vite handle app code
          // This prevents circular dependency issues
          if (id.includes('node_modules')) {
            // React core - keep separate for better caching
            if (
              id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router')
            ) {
              return 'vendor-react';
            }
            // UI libraries - frequently used together
            if (
              id.includes('node_modules/@radix-ui') ||
              id.includes('node_modules/lucide-react')
            ) {
              return 'vendor-ui';
            }
            // Animation library - separate chunk as it's large
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-animation';
            }
            // Query library
            if (id.includes('node_modules/@tanstack/react-query')) {
              return 'vendor-query';
            }
            // Supabase
            if (id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
            // Charts - keep with vendor-react to avoid initialization issues
            // Recharts has dependencies on React that need to be loaded together
            if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
              return 'vendor-react';
            }
            // Form libraries
            if (
              id.includes('node_modules/react-hook-form') ||
              id.includes('node_modules/@hookform') ||
              id.includes('node_modules/zod')
            ) {
              return 'vendor-forms';
            }
          }
          // Let Vite handle app code splitting automatically
        },
      },
    },
    // Warn if chunk exceeds 1MB
    chunkSizeWarningLimit: 1000,
    // Optimize asset handling
    assetsInlineLimit: 4096,
    // Enable source maps in production for debugging
    sourcemap: mode === 'development',
    // Minify CSS
    cssMinify: true,
    // Minify JS - use esbuild for better compatibility
    minify: mode === 'production' ? 'esbuild' : false,
    // Target modern browsers
    target: 'esnext',
    // Report compressed size
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
