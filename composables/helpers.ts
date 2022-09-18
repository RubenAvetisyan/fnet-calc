import { ComputedRef, Ref } from 'vue';
import { format, getDate, getDaysInMonth } from 'date-fns'

type Prop<T> = T | Ref<T>

type Strings = Prop<string | string[]>
type Dates = Prop<string | Date | string[] | Date[]>
type Format = Prop<string>

type UseSetFormat = (date: Dates, dateFormat: Format) => string[] | string
type UseSingleSetFormat = (date: Exclude<Dates, Prop<string[] | Date[]>>, dateFormat: Format) => string

export const useBatchUnref = (...args: Prop<any>[]) => args.map(arg=>unref(arg))

export const useSetFormatForSingleDate: UseSingleSetFormat = (date, dateFormat) => {
  const [d, f] = useBatchUnref(date, dateFormat)
  if (typeof d === 'string') {
    return format(new Date(d), unref(f))
  }

  return format(unref(d), unref(f))
}
export const useSetFormat:UseSetFormat = (date, dateFormat) => {

  if (Array.isArray(date)) {
    return date.map((d=>useSetFormatForSingleDate(d, dateFormat)))
  }

  return useSetFormatForSingleDate(date, dateFormat)
}

export const useRoundUp = <T extends Prop<number>>(num: T, precision: T) => {
  const [a,b] = useBatchUnref(num, precision)
  return Math.ceil(a / b) * b
}

export const useDatesStringToNumber = (d: Strings) => {
  const date = unref(d)
  if (Array.isArray(date)) {
    return date.map((dt: string) => getDate(new Date(dt)))
  }

  return getDate(new Date(date))
}
export const useBillingDays = (billdays: number[], startdays: number[]) => {
  return billdays.filter((d: number) => startdays
    .some((date: number) => d > date))
    .sort((a: number, b: number) => b - a)[0]
}
export const useGetDifference = (arr: number[], num: number) => {
  return arr.map((n: number) => unref(num) - n)
}

export const useGetDaysInMonth = (fullDate: string | Date) => {
  if (typeof fullDate === 'string') {
    return getDaysInMonth(new Date(fullDate))
  }

  return getDaysInMonth(fullDate)
}

export const usePricCalc = (
  diff: number | Ref<number>,
  lesThen: number | Ref<number>,
  priceAfterPerscent: number | Ref<number>,
  daysInMonth: number | Ref<number>
) => {
  return unref(diff) <= unref(lesThen) ? unref(priceAfterPerscent) : Math.abs(unref(diff)) * (unref(priceAfterPerscent) / unref(daysInMonth)) + unref(priceAfterPerscent)
}

export const useGeResultValue = (
  dates: string[] | Date[] | Ref<string[] | Date[]>,
  startdays: number[] | Ref<number[]>,
  difference: number[] | Ref<number[]>,
  maxRange: number | Ref<number>,
  priceAfterPerscent: number | Ref<number>,
  round: number | Ref<number>
) => {
  const daysInMonth = unref(dates).map(d=>useGetDaysInMonth(d))
  return unref(startdays).map((startDate: number, i) => {
    const calculatedPrice = usePricCalc(unref(difference)[i], unref(maxRange), unref(priceAfterPerscent), daysInMonth[i])
    return useRoundUp(calculatedPrice, unref(round))
  })
}
