import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const dir = join(dirname(fileURLToPath(import.meta.url)), '../public')
const src = readFileSync(join(dir, 'logo.svg'), 'utf8')

// The mark (VT symbol) ends around y=262. Text starts at y=299.
// Crop viewBox to show only the mark.
const MARK_H = 272

const mark = src
  .replace(/viewBox="0 0 447 382"/, `viewBox="0 0 447 ${MARK_H}"`)

const markWhite = mark
  .replace(/fill="#0E1D2D"/g, 'fill="#FFFFFF"')
  .replace(/fill="#8A7563"/g, 'fill="#BFAE9B"')

const logoWhite = src
  .replace(/fill="#0E1D2D"/g, 'fill="#FFFFFF"')
  .replace(/fill="#8A7563"/g, 'fill="#BFAE9B"')

writeFileSync(join(dir, 'logo-mark.svg'), mark)
writeFileSync(join(dir, 'logo-mark-white.svg'), markWhite)
writeFileSync(join(dir, 'logo-white.svg'), logoWhite)

console.log('Created logo-mark.svg, logo-mark-white.svg, logo-white.svg')
