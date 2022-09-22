import { acceptHMRUpdate, defineStore } from 'pinia'
import { Ref } from 'vue'

interface State {
  isEndDate: Ref<boolean>
  isStartDate: Ref<boolean>
  billdays: number[],
  MAIN_FORMAT: string
}

type ToggleIsEndDate = 'endDate' | 'startDate'

export const useCalendarStore = defineStore('calc', {
  state: ():State => {
    return {
      isEndDate: ref(false),
      isStartDate: ref(false),
      billdays: [11, 16, 21],
      MAIN_FORMAT: 'yyyy-MM-dd'
    }
  },
  actions: {
    toggleIsEndDate<T extends ToggleIsEndDate>(name: T): void {
      console.log('name: ', name);
      if (name === 'endDate') {
        this.isEndDate = !this.isEndDate
      }

      if (name === 'startDate') {
        this.isStartDate = !this.isStartDate
      }
    }
  },
  getters: {
    endDateModalShow():boolean {
      return this.isEndDate
    },
    startDateModalShow():boolean {
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
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot))
