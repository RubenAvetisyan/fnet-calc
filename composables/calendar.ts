import { useSetFormatForSingleDate } from './helpers';
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Ref } from 'vue'

interface StartDate {
    min: string
} 

interface EndDate {
    min: string
    max: string
}

interface Config {
  startDate: StartDate
  endDate: EndDate
}

interface State {
  isEndDate: boolean
  isStartDate: boolean
  billdays: number[]
  MAIN_ROUND_NUMBER: number
  RECOMENDED_ROUND_NUMBER: number
  MAIN_FORMAT: string
  PRIMARY_FORMAT: string
  startDay: string
  endDay: string
  nextMonth: Date
  config: Config
}

type ToggleIsEndDate = 'endDate' | 'startDate'

interface Actions {
  toggleIsEndDate: ToggleIsEndDate
}

const FORMAT = 'yyyy-MM-dd'

export const useCalendarStore = defineStore('calendar', {
  state: ():State => {
    return {
      isEndDate: false,
      isStartDate: false,
      billdays: [11, 16, 21],
      MAIN_FORMAT: FORMAT,
      PRIMARY_FORMAT: 'dd/MM/yyyy',
      startDay: useSetFormatForSingleDate(new Date(), FORMAT),
      endDay: '',
      nextMonth: useAddMonths(Date.now(), 1),
      MAIN_ROUND_NUMBER: 1,
      RECOMENDED_ROUND_NUMBER: 50,
      config: {
        startDate: {
          min: ''
        },
        endDate: {
          min: '',
          max: '',
        },
      }
    }
  },
  actions: {
    toggleIsEndDate<T extends ToggleIsEndDate>(name: T): void {
      if (name === 'endDate')
        this.isEndDate = !this.isEndDate

      if (name === 'startDate')
        this.isStartDate = !this.isStartDate
    },
    setNextMonth(day: number): void { 
      this.nextMonth = useAddMonths(this.startDate, day)
    },
    // setConfigStartDate(key: Partial<StartDate>, value: string): void {
    //   this.config.startDate[key] = value
    // },
    setInitialConfig(): void { 
      this.config
    }
  },
  getters: {
    endDateModalShow(): boolean {
      return this.isEndDate
    },
    startDateModalShow(): boolean {
      return this.isStartDate
    },
    currentBilldays(): number[] {
      return this.billdays
    },
    reversedBilldays(): number[] {
      return this.billdays.reverse()
    },
    maxBillday(): number {
      return Math.max(...this.billdays)
    },
    minBillday(): number {
      return Math.min(...this.billdays)
    },
    FORMAT(): string {
      return this.MAIN_FORMAT
    },
    today(): string {
      return useSetFormatForSingleDate(new Date(), this.MAIN_FORMAT)
    },
    previousMonth() {
      return useSubMonths(Date.now(), 1)
    },
    startDate(): Date {
      return useToDate(this.startDay)
    },
    startDateAsString: (state): string => useSetFormatForSingleDate(state.startDay, FORMAT),
    endDate: (state): Date => useToDate(state.endDay),
    endDateAsString: (state): string => useSetFormatForSingleDate(state.endDay, FORMAT),
    anjatmanOr(): Date[] {
      return this.billdays.map((billday: number) => {
        const sub = useDifferenceInCalendarDay(useSetDate(this.startDate, billday), this.startDate)
        const nextMonth = useAddMonths(this.startDay, 1)

        return sub <= 0 ? useSetDate(nextMonth, billday) : useSetDate(this.startDay, billday)
      })
    },
    filteredDays(): Date[] {
      return this.anjatmanOr.filter((day: Date) => {
        const diff = useDifferenceInCalendarDay(day, this.startDay)

        const res = diff >= 0

        return res
      }).sort((a: Date, b: Date) => useDifferenceInCalendarDay(a, b))
    },
    activeDays: (state) => useDifferenceInCalendarDay(state.endDay, state.startDay),
    finalPrice(): string | number {
      const {priceAfterDiscount} = useCalcStore()
      return useGeResultValue(this.startDate, this.endDate, 10, priceAfterDiscount, this.MAIN_ROUND_NUMBER)
    },
    recomendedPrice(): string | number { 
      const {priceAfterDiscount} = useCalcStore()
      return useGeResultValue(this.startDate, this.endDate, 10, priceAfterDiscount, this.RECOMENDED_ROUND_NUMBER)
    },
    // recommendedPrice(){}
    nearestDay(): Date {
      return useSetNextEndDay(this.startDay, this.billdays, 'add')
    }
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot))
