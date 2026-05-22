import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const ESTUDIANTES_API_ORIGIN = 'https://0k9u060818.execute-api.us-east-1.amazonaws.com'
const RETOS_API_ORIGIN = 'https://llw6ciwl24.execute-api.us-east-1.amazonaws.com'
const SUSCRIPCIONES_API_ORIGIN = 'https://d2lszp0r0g.execute-api.us-east-1.amazonaws.com'
const UPLOADS_API_ORIGIN = 'https://yyttmg8mpb.execute-api.us-east-1.amazonaws.com'
const EVALUACIONES_API_ORIGIN = 'https://7q0szxlpu5.execute-api.us-east-1.amazonaws.com'
const CERTIFICACIONES_API_ORIGIN = 'https://015f64ddgc.execute-api.us-east-1.amazonaws.com'
const EMAILS_API_ORIGIN = 'https://pbns3gv4s4.execute-api.us-east-1.amazonaws.com'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/api-suscripciones': {
        target: SUSCRIPCIONES_API_ORIGIN,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-suscripciones/, '/dev'),
      },
      '/api-uploads': {
        target: UPLOADS_API_ORIGIN,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-uploads/, '/dev'),
      },
      '/api-evaluaciones': {
        target: EVALUACIONES_API_ORIGIN,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-evaluaciones/, '/dev'),
      },
      '/api-certificaciones': {
        target: CERTIFICACIONES_API_ORIGIN,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-certificaciones/, '/dev'),
      },
      '/api-emails': {
        target: EMAILS_API_ORIGIN,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-emails/, '/dev'),
      },
      '/api-retos': {
        target: RETOS_API_ORIGIN,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-retos/, '/dev'),
      },
      '/api': {
        target: ESTUDIANTES_API_ORIGIN,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/dev'),
      },
    },
  },
})
