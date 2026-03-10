// 获取公网IP
export async function getClientIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json")
    const data = await res.json()
    return JSON.stringify(data.ip)
  } catch (error) {
    console.error("获取IP失败", error)
    return null
  }
}


// 获取设备/浏览器信息
export function getDeviceInfo() {

  const ua = navigator.userAgent

  console.log(ua);
  let browser = "Unknown"

  if (ua.includes("Chrome")) browser = "Chrome"
  else if (ua.includes("Firefox")) browser = "Firefox"
  else if (ua.includes("Safari")) browser = "Safari"
  else if (ua.includes("Edge")) browser = "Edge"

  return {
    userAgent: ua,
    browser: browser,
    platform: navigator.platform,
    language: navigator.language,
    screen: window.screen.width + "x" + window.screen.height
  }
}