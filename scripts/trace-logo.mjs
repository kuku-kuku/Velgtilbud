import { Jimp, JimpMime } from 'jimp'
import potrace from 'potrace'
import { promisify } from 'util'
import { writeFileSync } from 'fs'

const trace = promisify(potrace.trace)

const SRC = new URL('../public/logo.jpg', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const OUT = new URL('../public/logo.svg', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

function colorDist(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2)
}

async function makeLayer(img, targetR, targetG, targetB, threshold = 65) {
  const layer = img.clone()
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const hex = layer.getPixelColor(x, y)
      const r = (hex >>> 24) & 0xff
      const g = (hex >>> 16) & 0xff
      const b = (hex >>>  8) & 0xff
      const d = colorDist(r, g, b, targetR, targetG, targetB)
      const val = d < threshold ? 0x000000ff : 0xffffffff
      layer.setPixelColor(val, x, y)
    }
  }
  return layer
}

async function traceLayer(layer) {
  const buf = await layer.getBuffer(JimpMime.bmp)
  const svg = await trace(buf, { color: 'black', background: 'transparent', threshold: 128 })
  const paths = [...svg.matchAll(/<path[^>]*\/>/g)].map(m => m[0]).join('\n  ')
  return paths
}

async function main() {
  console.log('Loading', SRC)
  const img = await Jimp.read(SRC)
  const w = img.width
  const h = img.height
  console.log(`Image: ${w}x${h}`)

  console.log('Tracing navy layer (#0E1D2D)...')
  const navyLayer  = await makeLayer(img, 14, 29, 45)
  const navyPaths  = await traceLayer(navyLayer)

  console.log('Tracing taupe layer (#8A7563)...')
  const taupeLayer = await makeLayer(img, 138, 117, 99)
  const taupePathsRaw = await traceLayer(taupeLayer)

  const navyColored  = navyPaths.replace(/fill="[^"]*"/g, 'fill="#0E1D2D"')
  const taupeColored = taupePathsRaw.replace(/fill="[^"]*"/g, 'fill="#8A7563"')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="Velgtilbud">
  <g id="navy">
  ${navyColored}
  </g>
  <g id="taupe">
  ${taupeColored}
  </g>
</svg>`

  writeFileSync(OUT, svg)
  console.log('Written to', OUT)
}

main().catch(e => { console.error(e.message); process.exit(1) })
