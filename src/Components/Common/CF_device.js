export function CF_DeviceChecking() {
  const ua = navigator.userAgent || "";
  return {
    iphone: /(iPhone|iPod|iPad)/i.test(ua),
    blackberry: /BlackBerry/i.test(ua),
    android: /Android/i.test(ua),
  };
}
