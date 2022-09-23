import type { Ref } from 'vue'
import {
  addDays, addMonths, differenceInCalendarDays, endOfMonth,
  format, formatISO, getDate,
  getDaysInMonth, isSameDay, parseISO, setDate, subDays,
  subMonths, toDate,
} from 'date-fns'

type Prop<T> = T | Ref<T>

type Asdate = Prop<string | number | Date>
type AsdateArray = Prop<string[] | number[] | Date[]>

// type DateString = Prop<Date | string>
type Strings = Prop<string | string[]>
type Dates = Asdate | AsdateArray

type Format = Prop<string>

type UseSetFormat = (date: Dates, dateFormat: Format) => string[] | string
// type UseSingleSetFormat = (date: Exclude<Dates, Prop<string[] | Date[]>>, dateFormat: Format) => string

export const useToDate = (date: Asdate) => {
  const theDate = unref(date)

  if (typeof theDate === 'string')
    return parseISO(theDate)

  if (typeof theDate === 'number')
    return toDate(theDate)

  return theDate
}

export const useIsSameDay = (dateLeft: Asdate, dateRight: Asdate) => {
  return isSameDay(useToDate(dateLeft), useToDate(dateRight))
}

export const useFormatISO = (
  date: Asdate,
  options?: {
    format?: 'extended' | 'basic'
    representation?: 'complete' | 'date' | 'time'
  },
): string => {
  return callback({ date, options: [options] }, formatISO)
}

export const useSetDate = (date: Asdate, dayOfMonth: number): Date => {
  return callback({ date, options: [dayOfMonth] }, setDate)
}

export const useAddDays = (date: Asdate, amount: number): Date => {
  return callback({ date, options: [amount] }, addDays)
}

export const useSubDays = (date: Asdate, amount: number): Date => {
  return callback({ date, options: [amount] }, subDays)
}

export const useAddMonths = (date: Asdate, amount: number): Date => {
  return callback({ date, options: [amount] }, addMonths)
}

export const useSubMonths = (date: Asdate, amount: number) => {
  return callback({ date, options: [amount] }, subMonths)
}

export const useEndOfMonth = (date: Asdate) => {
  const result = callback({ date }, endOfMonth)

  return result
}

export const useBatchUnref = (...args: Prop<any>[]) => args.map(arg => unref(arg))

export const useSetFormatForSingleDate = (date: Asdate, dateFormat: Prop<String>) => {
  const [d, f] = useBatchUnref(date, dateFormat)

  if (typeof d === 'string')
    return format(useToDate(parseISO(d)), f)

  return format(d, f)
}
export const useSetFormat: UseSetFormat = (date, dateFormat) => {
  const cb = (d: any, f: any) => callback({ date: d, options: [f] }, useSetFormatForSingleDate)
  if (Array.isArray(date))
    return date.map(d => cb(d, dateFormat))

  return cb(date, dateFormat)
}

export const useGetDate = (date: Prop<Date | number>) => {
  return getDate(unref(date))
}

export const useDatesStringToNumber = (d: Strings) => {
  const date = unref(d)
  if (Array.isArray(date))
    return date.map((dt: string) => getDate(parseISO(dt)))

  return getDate(parseISO(date))
}
export const useBillingDays = (billdays: number[], startdays: number[]) => {
  return billdays.filter((d: number) => startdays.some((date: number) => d > date))
    .sort((a: number, b: number) => b - a)[0]
}

export const useBillingDay = (billdays: number[], startday: number) => {
  const filteredBillingDays = billdays.filter((billday: number) => startday < billday)
  const soretrdBillingDays = filteredBillingDays.sort((a: number, b: number) => b - a)

  return soretrdBillingDays[0]
}

export const useDifferenceInCalendarDay = (start: Asdate, end: Asdate): number => {
  return differenceInCalendarDays(useToDate(start), useToDate(end))
}

export const useGetDifference = (arr: number[], num: number) => {
  return arr.map((n: number) => unref(num) - n)
}

export const useGetDaysInMonth = (fullDate: string | Date) => {
  const date = typeof fullDate === 'string' ? parseISO(fullDate) : fullDate

  return getDaysInMonth(date)
}

export const usePricCalc = (
  difference: Prop<number>,
  lesThen: Prop<number>,
  priceAfterPerscent: Prop<number>,
  daysInMonth: Prop<number>,
) => {
  return unref(difference) <= unref(lesThen)
    ? Math.abs(unref(difference)) * (unref(priceAfterPerscent) / unref(daysInMonth)) + unref(priceAfterPerscent)
    : unref(priceAfterPerscent)
}

export const useRoundUp = <T extends Prop<number>>(num: T, precision: T) => {
  const [a, b] = useBatchUnref(num, precision) as number[]
  const asString = `${a.toFixed(0)}`
  const sf = asString.substr(-2)
  const simpleRound = asString.substring(0, asString.length - 2) + b

  return +sf < b && +sf !== 0 ? simpleRound : Math.ceil(a / b) * b
}

export const useGeResultValue = (
  startDate: Prop<Date>,
  endDate: Prop<Date>,
  maxRange: Prop<number>,
  priceAfterPerscent: Prop<number>,
  round: Prop<number>,
) => {
  const daysinmonth = getDaysInMonth(useToDate(startDate))
  const difference = Math.abs(useDifferenceInCalendarDay(startDate, endDate))

  const calculatedPrice = usePricCalc(difference, unref(maxRange), priceAfterPerscent, daysinmonth)

  return useRoundUp(calculatedPrice, unref(round))
}

export const useGeResultValues = (
  dates: string[] | Date[] | Ref<string[] | Date[]>,
  startdays: number[] | Ref<number[]>,
  difference: number[] | Ref<number[]>,
  maxRange: Prop<number>,
  priceAfterPerscent: Prop<number>,
  round: Prop<number>,
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

function callback<T extends { date: any; options?: any[] }, R extends Function>(data: T, cb: R) {
  try {
    const d = useToDate(data.date)
    const o = data.options || []

    return cb(d, ...o)
  }
  catch (error) {

  }
}
