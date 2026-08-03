import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, 'dist')
const port = Number(process.env.PORT) || 3000

const app = express()

app.disable('x-powered-by')

app.use(
  express.static(dist, {
    maxAge: '1h',
    index: false,
  }),
)

// SPA fallback for React Router (skip real files / future API routes)
app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, () => {
  console.log(`Royal Mason Resources listening on port ${port}`)
})
