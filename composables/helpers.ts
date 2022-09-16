export const useRoundUp = (num, precision) => {
  return Math.ceil(num / precision) * precision
}
