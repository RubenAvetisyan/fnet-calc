import { ComputedRef, Ref } from 'vue';
import { format, getDate, getDaysInMonth, differenceInCalendarDays, differenceInDays, parseISO, toDate, addDays, setDate, formatISO, addMonths } from 'date-fns'

type Prop<T> = T | Ref<T>

type DateString = Prop<Date | string>
type Strings = Prop<string | string[]>
type Dates = Prop<string | Date | number | string[] | Date[] | number[]>
type Format = Prop<string>

type UseSetFormat = (date: Dates, dateFormat: Format) => string[] | string
type UseSingleSetFormat = (date: Exclude<Dates, Prop<string[] | Date[]>>, dateFormat: Format) => string

export const useToDate = (date: Prop<string | number | Date>) => {
  const theDate = unref(date)
  if (theDate instanceof Date) return theDate

  if (typeof theDate === 'string') {
    return parseISO(theDate)
  }

  if (typeof theDate === 'number') {
    return toDate(theDate)
  }
  
  return  theDate
}

export const useFormatISO = (
  date: Prop<Date | number | string>,
  options?: {
    format?: 'extended' | 'basic';
    representation?: 'complete' | 'date' | 'time';
  }
): string => {
  return callback({ date, options: [options] }, formatISO)
}

export const useAddDays = (date: Prop<Date | number | string>, amount: number): Date => {
  return callback({ date, options: [amount] }, addDays)
}

export const useSetDate = (date: Prop<Date | number | string>, dayOfMonth: number):Date => {
  return callback({ date, options: [dayOfMonth] }, setDate)
}

export const useAddMonths = (date: Prop<Date | number | string>, amount: number) => {
  return callback({ date, options: [amount] }, addMonths)
}
export const useBatchUnref = (...args: Prop<any>[]) => args.map(arg=>unref(arg))

export const useSetFormatForSingleDate = (date: Prop<string | number | Date>, dateFormat: Prop<String>) => {
  const [d, f] = useBatchUnref(date, dateFormat)

  if (typeof d === 'string') {
    return format(useToDate(parseISO(d)), f)
  }

  return format(d, f)
}
export const useSetFormat: UseSetFormat = (date, dateFormat) => {
  const cb = (d: any, f: any)=>callback({ date:d, options: [f] }, useSetFormatForSingleDate)
  if (Array.isArray(date)) {
    return date.map((d=>cb(d, dateFormat)))
  }

  return cb(date, dateFormat)
}

export const useGetDate = (date: Prop<Date | number>) => {
  return getDate(unref(date))
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

export const useBillingDay = (billdays: number[], startday: number) => {
  return billdays.filter((billday: number) => startday < billday)
    .sort((a: number, b: number) => b - a)[0]
}

export const useDifferenceInCalendarDay = (start: Prop<string | number | Date>, end: Prop<number | Date>) => { 
  const startDays = useToDate(start)
  const endDay = unref(end)

  return Math.abs(differenceInCalendarDays(endDay, startDays))
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
  difference: Prop<number>,
  lesThen: Prop<number>,
  priceAfterPerscent: Prop<number>,
  daysInMonth: Prop<number>
) => {
  return unref(difference) <= unref(lesThen)
    ? Math.abs(unref(difference)) * (unref(priceAfterPerscent) / unref(daysInMonth)) + unref(priceAfterPerscent)
    : unref(priceAfterPerscent)
}

export const useRoundUp = <T extends Prop<number>>(num: T, precision: T) => {
  const [a, b] = useBatchUnref(num, precision)
  const sf = `${a}`.substr(-2)
  const simpleRound = `${a}`.substring(0, `${a}`.length - 2) + b

  return +sf < b && +sf !== 0 ? simpleRound : Math.ceil(a / b) * b
}

export const useGeResultValue = (
  startDate: Prop<Date>,
  endDate: Prop<Date>,
  maxRange: Prop<number>,
  priceAfterPerscent: Prop<number>,
  round: Prop<number>
) => {
  const daysinmonth = getDaysInMonth(useToDate(startDate))
  console.log('daysinmonth: ', daysinmonth);
  const difference = differenceInCalendarDays(unref(startDate), unref(endDate))
  console.log('difference: ', difference);
  const calculatedPrice = usePricCalc(difference, unref(maxRange), priceAfterPerscent, daysinmonth)
  console.log('calculatedPrice: ', calculatedPrice);

  return useRoundUp(calculatedPrice, unref(round))
}

export const useGeResultValues = (
  dates: string[] | Date[] | Ref<string[] | Date[]>,
  startdays: number[] | Ref<number[]>,
  difference: number[] | Ref<number[]>,
  maxRange: Prop<number>,
  priceAfterPerscent: Prop<number>,
  round: Prop<number>
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


function callback<T extends { date: any, options: any[] }, R extends Function>(data: T, cb: R) {
  let d = useToDate(data.date)
  let o = data.options

  return cb(d, ...o)
}
