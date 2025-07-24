// Utility function to generate a random number between 20 and 80
export function getRandomNumber(end: number, start: number = 0): number {
  return Math.floor(Math.random() * end) + start
}

// Utility function to generate a random number between 20 and 80
export function getRandomNumber2(end: number, start: number = 0): number {
  return Math.random() * end + start
}
