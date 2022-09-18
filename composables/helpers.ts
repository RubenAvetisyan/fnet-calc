import { ComputedRef, Ref } from 'vue';
import { format, getDate, getDaysInMonth, differenceInCalendarDays, differenceInDays, parseISO, toDate } from 'date-fns'

type Prop<T> = T | Ref<T>

type DateString = Prop<Date | string>
type Strings = Prop<string | string[]>
type Dates = Prop<string | Date | string[] | Date[]>
type Format = Prop<string>

type UseSetFormat = (date: Dates, dateFormat: Format) => string[] | string
type UseSingleSetFormat = (date: Exclude<Dates, Prop<string[] | Date[]>>, dateFormat: Format) => string

export const useToDate = (date: string | number) => {
  return typeof date === 'string' ? parseISO(date) : toDate(date)
}
export const useBatchUnref = (...args: Prop<any>[]) => args.map(arg=>unref(arg))

export const useSetFormatForSingleDate: UseSingleSetFormat = (date, dateFormat) => {
  const [d, f] = useBatchUnref(date, dateFormat)
  if (typeof d === 'string') {
    return format(parseISO(d), unref(f))
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
    return date.map((dt: string) => getDate(parseISO(dt)))
  }

  return getDate(parseISO(date))
}
export const useBillingDays = (billdays: number[], startdays: number[]) => {
  return billdays.filter((d: number) => startdays
    .some((date: number) => d > date))
    .sort((a: number, b: number) => b - a)[0]
}

export const useDifferenceInCalendarDays = (start: Prop<number[] | Date[]>, end: Prop<number | Date>) => { 
  const startDays = unref(start)
  const endDay = unref(end)
  return startDays.map((n) => Math.abs(differenceInCalendarDays(endDay, n)))
}
export const useGetDifference = (arr: number[], num: number) => {
  return arr.map((n: number) => unref(num) - n)
}

export const useGetDaysInMonth = (fullDate: string | Date) => {
  const date = typeof fullDate === 'string' ? parseISO(fullDate) : fullDate

  return getDaysInMonth(date)
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
  const daysInMonth = unref(dates).map(d => useGetDaysInMonth(d))
  const diff = unref(difference)
  const range = unref(maxRange)
  const pap = priceAfterPerscent
  return unref(startdays).map((startDate: number, i) => {
    const calculatedPrice = usePricCalc(diff[i], range, pap, daysInMonth[i])
    return useRoundUp(calculatedPrice, unref(round))
  })
}
