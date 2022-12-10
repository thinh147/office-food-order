import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import eslintPlugin from 'vite-plugin-eslint';
import vitePluginImp from 'vite-plugin-imp';
import { getThemeVariables } from 'antd/dist/theme';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), eslintPlugin(), vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        }
      ]
    })],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            return path.replace(/^\/api/, '')
          }
        }
      },
      // open: true
    },
    build: {

    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@core": fileURLToPath(new URL("./src/core", import.meta.url)),
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
        "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
        "@services": fileURLToPath(new URL("./src/services", import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: {
          //   'primary-color': '#1DA57A',
          //   'link-color': '#1DA57A',
          //   'border-radius-base': '8px',
          // },
          modifyVars: {
            ...getThemeVariables({
              // dark: true, // 开启暗黑模式
              compact: true, // 开启紧凑模式,
            }),
            'primary-color': '#ff8000',
            'header-color': '#fcdb99',
            'success-color': '#52c41a',
            'warning-color': '#faad14',
            'error-color': '#f5222d',
            'link-color': '#ff8000',
            'font-size-base': '16px',
            'border-radius-base': '4px',
            'text-color': '#3E3E3E',
            'heading-color': '#272727',
            'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
            'disabled-color': 'rgba(0, 0, 0, 0.25)',
            'border-color-base': '#d9d9d9',
            'box-shadow-base': ' 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
          },
          javascriptEnabled: true,
        }
      }
    }
  })
}
