export async function loadMDXComponent(filePath: string) {
  // filePath는 절대경로, 상대경로로 변환 필요
  const rel = filePath.replace(process.cwd() + '/', '')
  // Vite style import 불가 → dynamic import by alias 권장.
  // 해결: tsconfig paths + next.config transpilePackages or compile-time virtual module.
}
