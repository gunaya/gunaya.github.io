import { readdir, stat, rename } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const IMG_DIR = path.join(ROOT, 'src', 'assets', 'img')
const MAX_DIMENSION = 1920
const QUALITY = 80

const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const files = (await readdir(IMG_DIR))
  .filter((name) => IMG_EXT.has(path.extname(name).toLowerCase()))
  .map((name) => path.join(IMG_DIR, name))

if (files.length === 0) {
  console.log('No images found in', IMG_DIR)
  process.exit(0)
}

let totalSaved = 0

for (const file of files) {
  const meta = await sharp(file).metadata()
  const width = meta.width ?? 0
  const height = meta.height ?? 0
  const tooLarge = width > MAX_DIMENSION || height > MAX_DIMENSION

  if (!tooLarge) continue

  const before = (await stat(file)).size
  const tmp = `${file}.tmp`

  await sharp(file)
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp)

  const after = (await stat(tmp)).size
  await rename(tmp, file)

  const saved = before - after
  totalSaved += saved
  console.log(
    `${path.basename(file)}: ${width}x${height} -> ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`
  )
}

console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`)
