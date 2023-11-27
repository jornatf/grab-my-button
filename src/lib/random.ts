// Random from 0 to {count}
export const rand = (count: number): number => {
  return Math.floor(Math.random() * count)
}

// Random from {min} to {max}
export const randBetween = (min: number, max: number): number => {
  return Math.abs(min - rand(max))
}