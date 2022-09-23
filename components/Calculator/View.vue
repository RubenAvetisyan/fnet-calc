<script setup lang="ts">
import { storeToRefs } from 'pinia'
// import { subMonths } from 'date-fns'

// const { priceAfterDiscount } = storeToRefs(useCalcStore())
const { endDateModalShow, startDateModalShow,
  startDay, startDate, startDateAsString,
  endDay, endDate, endDateAsString,
  billdays,
  maxBillday,
  FORMAT: F_MAT,
  PRIMARY_FORMAT,
  previousMonth,
  filteredDays,
  activeDays,
  finalPrice,
  recomendedPrice,
  nextMonth,
  nearestDay
} = storeToRefs(useCalendarStore())
const FORMAT = F_MAT.value

endDay.value = useSetFormatForSingleDate(filteredDays.value[0], FORMAT)
// const startDay = ref(today.value)

// const previousMonth = subMonths(Date.now(), 1)
// let nextMonth = useAddMonths(Date.now(), 1)

const isDateEabled = useIsDateEabled(billdays)

// const startDate = computed(() => useToDate(startDay))
// const startDateAsString = computed(() => {
//   return useSetFormat(startDay, FORMAT)
// })
// const anjatmanOr = computed(() => {
//   return billdays.value.map((billday) => {
//     const sub = useDifferenceInCalendarDay(useSetDate(startDate, billday), startDate)

//     const nextMonth = useAddMonths(startDay, 1)

//     return sub <= 0 ? useSetDate(nextMonth, billday) : useSetDate(startDay, billday)
//   })
// })

// const filteredDays = computed(() => {
//   return anjatmanOr.value.filter((day) => {
//     const diff = useDifferenceInCalendarDay(day, startDay)

//     const res = diff >= 0

//     return res
//   }).sort((a, b) => useDifferenceInCalendarDay(a, b))
// })

// const end = filteredDays.value[0]

// const endDate = computed(() => useToDate(endDay))
// const endDateAsString = computed(() => {
//   return useSetFormat(endDay, FORMAT)
// })

// const activeDays = computed(() => {
//   return useDifferenceInCalendarDay(endDay, startDay)
// })

// const result = computed(() => {
//   return useGeResultValue(useToDate(startDay), useToDate(endDay), 10, priceAfterDiscount, 50)
// })

const items = computed(() => {
  const finalResult = [
    `Միացման օր՝ ${useSetFormatForSingleDate(startDate.value, PRIMARY_FORMAT.value)}`,
    `Անջատման օր՝ ${useSetFormatForSingleDate(endDate.value, PRIMARY_FORMAT.value)}`,
    `Վճարման ենթակա գումար՝ ${finalPrice.value}դր.`
  ]

  const recomendedPay = `Վճարման ենթակա գումարը կլորացումով (մինչև ${recomendedPrice.value}դր.)՝ ${finalPrice.value}դր.`

  if (finalPrice.value !== recomendedPrice.value) finalResult.push(recomendedPay)

  return finalResult
})

// const endDateModalShow = ref(false)
// const startDateModalShow = ref(false)

// const onClick = (v: string) => () => {
//   if (v === 'endDate') {
//     return endDateModalShow.value = !endDateModalShow.value
//   }

//   if (v === 'startDate') {
//     return startDateModalShow.value = !startDateModalShow.value
//   }
// }

const config = ref({
  startDate: {
    min: useFormatISO(useSetDate(previousMonth, maxBillday.value)),
  },
  endDate: {
    min: useFormatISO(startDate),
    max: useFormatISO(useAddMonths(Date.now(), 1)),
  },
})

const initiator = ref('')
watch(() => {
  return {
    start: startDay.value,
    end: endDay.value,
  }
}, ({ start, end }, { start: oldStart, end: oldEnd }) => {
  if (start === oldStart && end === oldEnd)
    return

  const difference = useDifferenceInCalendarDay(end, start)

  if (start !== oldStart && initiator.value !== 'endDay') {
    initiator.value = 'startDay'
    // const nearestDay = useSetNextEndDay(start, billdays, 'add')

    // nextMonth.value = useAddMonths(startDate, 1)
    const maxDate = useSetDate(nextMonth, useGetDaysInMonth(nextMonth.value))
    const minDate = useSetDate(Date.now(), 1)

    config.value.endDate.min = useFormatISO(minDate)
    config.value.endDate.max = useFormatISO(maxDate)
    endDay.value = useSetFormatForSingleDate(nearestDay, FORMAT)
    return
  }

  if (end !== oldEnd && initiator.value !== 'startDay' && (difference < 1 || difference > 30)) {
    initiator.value = 'endDay'
    const nearestDay = useSetNextEndDay(end, billdays, 'sub')
    startDay.value = useSetFormatForSingleDate(nearestDay, FORMAT)
    return
  }

  initiator.value = ''
})
</script>

<template>
  <ion-card>
    <ion-card-header mb-0>
      <ion-card-subtitle mb-0>
        Ծառայության մատուցման`
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <grid>
        <row>
          <i-col />
        </row>
        <row class="ion-align-items-center">
          <i-col>
            <my-button id="open-end-modal" identity="endDate" expand="block" color="primary" fill="solid" justify="center">
              Անջատման օր` {{ endDateAsString }}
            </my-button>
          </i-col>
          <i-col>
            <my-button id="open-start-modal" identity="startDate" expand="block" color="primary" fill="outline" justify="center">
              Միացման օր` {{ startDateAsString }}
            </my-button>
          </i-col>
        </row>
        <row>
          <ion-label color="warning">
            <span class="text-size-0.8rem">ակտիվ օրերի քանակ (հավելյալ)՝ {{ activeDays
            }}</span>
          </ion-label>
        </row>
      </grid>
      <List :items="items">
        <template #headtext>
          <span class="text-purple-700 font-bold text-size-1rem">Գանձման ենթակա գումար.</span>
        </template>
      </List>
      <modal :is-open="endDateModalShow">
        <CalculatorCalendar
          id="endDate" v-model="endDay" :min="config.endDate.min" :is-date-eabled="isDateEabled"
          :max="config.endDate.max" title="Նշել անջատման օրվա ամսաթիվը"
        />
      </modal>
      <modal :is-open="startDateModalShow">
        <CalculatorCalendar
          id="startDate" v-model="startDay" :min="config.startDate.min"
          title="Նշել միացման օրվա ամսաթիվը"
        />
      </modal>
    </ion-card-content>
  </ion-card>
</template>
