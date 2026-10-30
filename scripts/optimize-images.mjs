import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const inputDir = path.join(root, 'src/assets/img')
const outputDir = path.join(root, 'src/generated/photos')
const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const files = (await readdir(inputDir)).filter((name) => extensions.has(path.extname(name).toLowerCase())).sort()
await mkdir(outputDir, { recursive: true })

const imports = []
const entries = []
for (const [index, name] of files.entries()) {
  // Hash the filename to avoid collisions, including files that differ only by extension.
  const id = createHash('sha256').update(name).digest('hex').slice(0, 16)
  const input = path.join(inputDir, name)
  const fullName = `${id}-full.webp`
  const thumbName = `${id}-thumb.webp`
  const info = await sharp(input).rotate().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(outputDir, fullName))
  await sharp(input).rotate().resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true }).webp({ quality: 75 }).toFile(path.join(outputDir, thumbName))
  imports.push(`import full${index} from './${fullName}'`, `import thumb${index} from './${thumbName}'`)
  entries.push(`  { src: full${index}, thumbnail: thumb${index}, filename: ${JSON.stringify(name)}, orient: ${JSON.stringify(info.width > info.height ? 'landscape' : 'portrait')} }`)
}
await writeFile(path.join(outputDir, 'index.js'), `${imports.join('\n')}\n\nexport default [\n${entries.join(',\n')}\n]\n`)
console.log(`Generated ${files.length} optimized photos and thumbnails without changing originals.`)
