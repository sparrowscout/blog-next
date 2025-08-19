export type OS = 'Win' | 'Mac'
export type Browsers = {
  [key: string]: string
}

const BROWSER_IOS: Browsers = {
  crios: 'Chrome', // Google Chrome (iOS)
  fxios: 'Firefox', // Mozilla Firefox (iOS)
  edgios: 'Edge', // Microsoft Edge (iOS)
  whale: 'Whale', // Naver Whale (iOS)
  opios: 'Opera', // Opera (iOS)
  samsungbrowser: 'Samsung Internet', // Samsung Internet (iOS)
  safari: 'Safari', // Safari (macOS/iOS)
}

const BROWSER_AOS: Browsers = {
  chrome: 'Chrome', // Google Chrome (Android)
  firefox: 'Firefox', // Mozilla Firefox (Android)
  edg: 'Edge', // Microsoft Edge (Android)
  opr: 'Opera', // Opera (Android)
}

const BROWSER_WIN: Browsers = {
  msie: 'Internet Explorer', // Internet Explorer (Windows)
  trident: 'Internet Explorer', // Internet Explorer (Windows)
  edge: 'Edge', // Microsoft Edge (Windows)
}

const BROWSER_ETC: Browsers = {
  vivaldi: 'Vivaldi', // Vivaldi
  brave: 'Brave', // Brave
  konqueror: 'Konqueror', // Konqueror
  'pale moon': 'Pale Moon', // Pale Moon
  seamonkey: 'SeaMonkey', // SeaMonkey
}

export const BROWSER_NAME: Browsers = {
  ...BROWSER_AOS,
  ...BROWSER_WIN,
  ...BROWSER_IOS,
  ...BROWSER_ETC,
}

export const checkOS = (os: OS) =>
  navigator.userAgent.includes(os)

export const getDeviceType = () => {
  const ua = navigator.userAgent

  if (
    /tablet|ipad|playbook|silk/i.test(ua) &&
    !/mobi|tablet pc/i.test(ua)
  ) {
    return 'Tablet'
  }

  if (/mobi|android|touch|mini/i.test(ua)) {
    return 'Phone'
  }

  return 'PC'
}

export const checkPC = () => {
  if (typeof window === 'undefined') return false

  const isPC = getDeviceType() === 'PC'
  const isTouchable =
    'ontouchstart' in window || navigator.maxTouchPoints > 0
  const hasPhysicalKeyboard = false // Replace with a reliable check if needed
  const isScreenLargeEnough =
    window.innerWidth >= 1280 && window.innerHeight >= 720

  if (isPC) {
    if (!isTouchable || hasPhysicalKeyboard) {
      return true
    }

    if (isScreenLargeEnough) {
      return true
    }
  }

  return false
}

/** AOS 브라우저 여부 확인 */
export const checkAOS = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  return Object.keys(BROWSER_AOS).some((key) =>
    userAgent.includes(key),
  )
}

/** IOS 브라우저 여부 확인
 * AOS의 userAgent에서 웹표준 및 호환성을 위해 AppleWebKit, Safari 존재 가능.
 * 즉, IOS 브라우저이면서 AOS 브라우저로 포함되지 않는 것으로 판별
 */
export const checkIOS = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  return (
    Object.keys(BROWSER_IOS).some((key) =>
      userAgent.includes(key),
    ) && !checkAOS()
  )
}

export const getBrowserName = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  let name = 'Unknown'
  const target = Object.keys(BROWSER_NAME).find((key) =>
    userAgent.includes(key),
  )
  if (target) {
    name = BROWSER_NAME[target]
  }

  return name
}
