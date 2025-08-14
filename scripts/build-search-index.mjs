import fg from 'fast-glob'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

const CONTENT_DIR = 'app/(content)' // 너의 글 폴더
const GLOB_DIR = CONTENT_DIR.replace(/[()]/g, '\\$&')

const OUT = 'public/search-index.json'

function toPlain(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ') // 코드블럭 제거
    .replace(/`([^`]+)`/g, '$1') // 인라인 코드
    .replace(/\!\[[^\]]*\]\([^)]*\)/g, ' ') // 이미지
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // 링크 텍스트만
    .replace(/[*_>#~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const files = await fg(`${GLOB_DIR}/**/*.{md,mdx}`, {
  onlyFiles: true,
})
const docs = []

for (const file of files) {
  const raw = await fs.readFile(file, 'utf8')
  const { data, content } = matter(raw)

  const rawDate = data.date
  const ts =
    rawDate && !Number.isNaN(Date.parse(rawDate))
      ? Date.parse(rawDate) // 숫자 타임스탬프 (정렬용)
      : null

  const rel = path
    .relative(CONTENT_DIR, file)
    .replace(/\\/g, '/') // 윈도우 대비

  const parts = rel.split('/') // ["카테고리", "파일.mdx"] ...
  const category = parts.length > 1 ? parts[0] : '' // 카테고리 폴더명
  const fileBase = path.basename(
    parts[parts.length - 1],
    path.extname(parts[parts.length - 1]),
  ) // 파일명(확장자 제거)

  docs.push({
    slug: fileBase, // 고유값
    date: rawDate,
    timeStamp: ts,
    title: data.title,
    tags: data.tags ?? [],
    category,
    content: toPlain(content).slice(0, 20000), // 과도한 용량 방지
  })
}

await fs.writeFile(OUT, JSON.stringify(docs), 'utf8')
console.log(
  `✔ search index -> ${OUT} (${docs.length} docs)`,
)
