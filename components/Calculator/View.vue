<script setup lang="ts">
import { ComputedRef, Ref } from 'vue';
import { differenceInCalendarDays, isSameDay } from 'date-fns'

const props = defineProps({
  price: { type: Number, required: true },
  percent: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  billdays: { type: Array<number>, default: [11, 16, 21], required: true }
})

const today = useSetFormatForSingleDate(new Date(), 'yyyy-MM-dd')

const startday = ref(today)

const calendarMin = computed(() => {
  return useFormatISO(useSetDate(useToDate(startday), 1))
})

const miacmanOr = computed(() => useSetFormatForSingleDate(startday, 'dd-MM-yyyy'))
const anjatmanOr = computed(() => {
  return props.billdays.map(billday => {
    const start = useDatesStringToNumber(miacmanOr) as number
    const sub = billday - start
    const startAsDate = useToDate(startday)
    const nextMonth = useAddMonths(startAsDate, 1)
    console.log('nextMonth: ', nextMonth);
    return sub < 0 ? useSetDate(nextMonth, billday) : useSetDate(startAsDate, billday)
  })
})

const orer = computed(() => {
  const result = unref(anjatmanOr).map((day) => useGetDate(day)).join()
  console.log('result: ', result);
  return result
})


// const sd = useBillingDay(props.billdays, unref(startdays))
const filteredDays = computed(() => {
  return anjatmanOr.value.filter(day => {
    const diff = differenceInCalendarDays(day, useToDate(startday))
    console.log('diff: ', diff);
    const res = diff > 0
    console.log('res: ', res);
    return res
  })
})

const end = useSetFormatForSingleDate(useToDate(Date.now()), 'd-MM -yyyy')
const endDay = ref(end)


const isDateEabled = (dateString: string) => {
  const isDate = unref(filteredDays).some(day => isSameDay(day, useToDate(dateString)))
  console.log('isDate: ', isDate);
  return isDate
}

const calendarData: Ref<any> = ref({
  model: undefined,
  title: '',
  isDateEabled,
  min: undefined
})
const setCalendarId = (name: string) => {
  const title = name === 'selectdate' ? 'Նշել անջատման օրվա ամսաթիվը' : 'Նշել միացման օրվա ամսաթիվը'
  const min = name === 'datetime' ? calendarMin.value : undefined
  const model = name === 'datetime' ? startday : endDay
  calendarData.value = {
    model,
    title,
    isDateEabled,
    min
  }
  console.log('calendarData: ', calendarData.value);
}
// const daysDiff = computed(() => {
//   const starts = dates.value //.map(d => useToDate(d))
//   const end = new Date(2022, 8, endDay.value)
//   return useDifferenceInCalendarDay(starts, end)
// })


// const result = computed(() => {
//
//   return useGeResultValue(dates, daysDiff, 10, props.priceAfterDiscount, 50)
// })

// const miacmanOr = computed(() => useSetFormatForSingleDate(dates, 'dd/MM/yyyy'))
// const unjatmanOr = computed(() => useSetFormatForSingleDate(useSetDate(useAddDays(useToDate(dates), 30), unref(endDay)), 'dd/MM/yyyy'))

//

// const items = computed(() => {
//   return [`Միացման օր՝ ${unref(miacmanOr)}`,
//   `անջատման օր՝ ${unref(unjatmanOr)}`,
//   `Վճարման ենթակա գումար՝ ${unref(result)}դր.`]
// })
</script>

<template><ion-card>
  <ion-card-header>
    <ion-card-subtitle>Ծառայության մատուցման`</ion-card-subtitle>
    <!-- <ion-card-title>Ծառայության մատուցման`</ion-card-title> -->
  </ion-card-header>
  <ion-label color="secondary"><span class="text-size-1rem"></span></ion-label>
  <grid>
    <row class="ion-align-items-center">
      <i-col class="basis-1/4 bg-gr">
        <!-- <mobi-select v-model="endDay" :values="orer" label="Անջատման օր՝"></mobi-select> -->
        <my-button id="open-modal" expand="block" justify="center" @click="setCalendarId('selectdate')">Անջատման օր
          {{endDay}}</my-button>
        </i-col>
        <i-col class="basis-1/2">
          <my-button id="open-modal" expand="block" justify="center" @click="setCalendarId('datetime')">Միացման օր
            {{miacmanOr}}</my-button>
        </i-col>
        </row>
        </grid>
        <!-- <List :items="items
                                                                                                                                                                                                                                                                                                                                  ">
                                                                                                                                                                                                                                                                                                                                    <template #headtext>
                                                                                                                                                                                                                                                                                                                                      <span class="text-purple-700 font-bold text-size-1rem">Գանձման ենթակա գումար.</span>
                                                                                                                                                                                                                                                                                                                                    </template>
                                                                                                                                                                                                                                                                                                                                  </List> -->
        <ion-modal trigger="open-modal">
          <CalculatorCalendar id="datetime" v-model="calendarData.model" :is-date-eabled="calendarData.isDateEabled"
            :min="calendarData.min" :title="calendarData.title" />
  </ion-modal>
    <!-- <div v-for="(date, i) in dates" :key="date">result: {{result[i]}} for {{date}}</div> -->
  </ion-card>
</template>
