export function getParams() {
  return window
    .location
    .search
    .substr(1)
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=')
      acc.set(key, value)
      return acc
    }, new Map<string, string>())
}