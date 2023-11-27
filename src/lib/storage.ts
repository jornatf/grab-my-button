// Get localStorag item
export const storageGet = (key: string): JSON | boolean => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : false
}

// Set localStorage item
export const storageSet = (key: string, value: object): object => {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}