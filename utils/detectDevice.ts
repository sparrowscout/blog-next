export function isIOSChromeUA(ua: string) {
  // iOS 크롬은 UA에 CriOS가 들어감
  return /CriOS\/\d+/i.test(ua) && isIOSUA(ua)
}

export function isIOSUA(ua: string) {
  // iPhone/iPad/iPod 혹은 iPadOS가 Mac으로 위장한 케이스 대비
  const isIPhoneLike = /iP(hone|od|ad)/i.test(ua)
  const isIPadOSLike =
    /\bMac OS X\b/.test(ua) && /\bVersion\/\d+/i.test(ua)
  return isIPhoneLike || isIPadOSLike
}
