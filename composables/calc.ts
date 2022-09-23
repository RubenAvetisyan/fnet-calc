import { acceptHMRUpdate, defineStore } from 'pinia'
import { Ref } from 'vue'

interface State {
  price: Ref<number>
  percent: Ref<number>
}

export const useCalcStore = defineStore('calculator', {
  state: ():State => {
    return {
      price: ref(5000),
      percent: ref(0),
    }
  },
  actions: {
    updatePtice(value: number) {
      this.price = value
    },
  },
  getters: {
    priceAfterDiscount: (state) => {
      return state.price - (state.price * state.percent / 100)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot))
