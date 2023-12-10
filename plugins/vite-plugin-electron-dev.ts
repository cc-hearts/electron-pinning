import type { Platform } from 'esbuild'
import { ViteDevServer } from 'vite'

const esbuildConfig = {
  entryPoints: ['./main/app.ts'],
  bundle: true,
  platform: 'node' as Platform,
  outfile: './dev-dist/main.js',
  external: ['electron'],
}

export const ElectronDevPlugin = () => {
  return {
    name: 'vite-plugin-electron-dev',
    async configureServer(server: ViteDevServer) {
      const esbuild = await import('esbuild')
      esbuild.buildSync(esbuildConfig)

      server.httpServer?.once('listening', async () => {
        const { spawn } = await import('child_process')

        const addressInfo = server.httpServer?.address()!

        if (typeof addressInfo !== 'string') {
          const port = addressInfo.port
          const address = addressInfo.address.includes('::') ? 'localhost' : addressInfo.address
          const httpAddress = `http://${address}:${port}`
          const electronProcess = spawn(
            (await import('electron')).default.toString(),
            ['./dev-dist/main.js', httpAddress],
            {
              cwd: process.cwd(),
              stdio: 'inherit',
            }
          )
          electronProcess.on('close', () => {
            server.close()
            process.exit(0)
          })
        }
      })
    }
  }
}