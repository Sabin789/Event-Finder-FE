import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {


  const env = dotenv.config().parsed

  // Return the Vite configuration
  return {
    plugins: [react()],
    define: {
      'process.env': env,
    },
    build: {
      outDir: 'build', // Output directory for the build files
      assetsDir: './public', // Directory for static assets (relative to outDir)
      sourcemap: true, // Generate source maps
      minify: true, // Minify the generated files
      target: 'es2015', // Target browser compatibility
      cssCodeSplit: true,
    },
  };
});
