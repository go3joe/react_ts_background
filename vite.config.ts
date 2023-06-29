import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//这里要安装@types/node 才不会报错
//如果第一个path报红，可以写成 * as path即可
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  }
})
