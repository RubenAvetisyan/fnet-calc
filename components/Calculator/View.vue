<script setup lang="ts">
import { subMonths, addDays } from 'date-fns'
import { id } from 'date-fns/locale';


const props = defineProps({
  price: { type: Number, required: true },
  percent: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  billdays: { type: Array<number>, default: [11, 16, 21], required: true }
})

const maxBillday = Math.max(...props.billdays)

// const minBillday = Math.min(...props.billdays)

const FORMAT = 'yyyy-MM-dd'

const today = useSetFormatForSingleDate(new Date(), FORMAT)

const startDay = ref(today)

const previousMonth = subMonths(Date.now(), 1)

const isDateEabled = useIsDateEabled(props.billdays)
console.log('isDateEabled: ', isDateEabled(useToDate('2022-10-11')));



const startDate = computed(() => useToDate(startDay))
const startDateAsString = computed(() => {
  return useSetFormat(startDay, FORMAT)
})
const anjatmanOr = computed(() => {
  return props.billdays.map(billday => {
    const sub = useDifferenceInCalendarDay(useSetDate(startDate, billday), startDate)

    const nextMonth = useAddMonths(startDay, 1)

    return sub <= 0 ? useSetDate(nextMonth, billday) : useSetDate(startDay, billday)
  })
})

const filteredDays = computed(() => {
  return anjatmanOr.value.filter(day => {
    const diff = useDifferenceInCalendarDay(day, startDay)

    const res = diff >= 0

    return res
  }).sort((a, b) => useDifferenceInCalendarDay(a, b))
})


const end = unref(filteredDays)[0]
const endDay = ref(useSetFormatForSingleDate(end, FORMAT))
const endDate = computed(() => useToDate(startDay))


const activeDays = computed(() => {
  return useDifferenceInCalendarDay(endDay, startDay)
})


const result = computed(() => {
  return useGeResultValue(useToDate(startDay), useToDate(endDay), 10, props.priceAfterDiscount, 50)
})

const items = computed(() => {
  return [`Միացման օր՝ ${useSetFormat(unref(startDate), 'dd/MM/yyyy')}`,
    `Անջատման օր՝ ${useSetFormat(unref(endDate), 'dd/MM/yyyy')}`,
  `Վճարման ենթակա գումար՝ ${unref(result)}դր.`
  ]
})

const isEndDate = ref(false)
const isStartDate = ref(false)

const onClick = (v: string) => () => {
  if (v === 'endDate') {
    return isEndDate.value = !isEndDate.value
  }

  if (v === 'startDate') {
    return isStartDate.value = !isStartDate.value
  }
}

const config = ref({
  startDate: {
    min: useFormatISO(useSetDate(previousMonth, maxBillday)),
    confirm: !isEndDate.value,
    cancel: !isEndDate.value,
  },
  endDate: {
    min: useFormatISO(Date.now()),
    confirm: !isStartDate.value,
    cancel: !isStartDate.value,
  }
})

const initiator = ref('')
watch(() => {
  return {
    start: startDay.value,
    end: endDay.value
  }
}, ({ start, end }, { start: oldStart, end: oldEnd }) => {
  console.log('start === oldStart && end === oldEnd: ', start === oldStart && end === oldEnd);
  if (start === oldStart && end === oldEnd) return

  console.log(`start !== oldStart && initiator.value !== 'endDay': `, start !== oldStart && initiator.value !== 'endDay');
  if (start !== oldStart && initiator.value !== 'endDay') {
    initiator.value = 'startDay'
    const nearestDay = useSetNextEndDay(start, props.billdays, 'add')
    endDay.value = useSetFormatForSingleDate(nearestDay, FORMAT)
    return
  }

  console.log(`end !== oldEnd && initiator.value !== 'startDay': `, end !== oldEnd && initiator.value !== 'startDay');
  if (end !== oldEnd && initiator.value !== 'startDay') {
    initiator.value = 'endDay'
    const nearestDay = useSetNextEndDay(end, props.billdays, 'sub')
    startDay.value = useSetFormatForSingleDate(nearestDay, FORMAT)
    return
  }

  initiator.value = ''

})
</script>

<template><ion-card>
  <ion-card-header mb-0>
    <ion-card-subtitle mb-0>Ծառայության մատուցման`</ion-card-subtitle>
  </ion-card-header>
  <ion-card-content>
    <grid>
      <row>
        <i-col>
        </i-col>
      </row>
      <row class="ion-align-items-center">
        <i-col>
          <my-button id="open-end-modal" expand="block" color="primary" fill="solid" justify="center"
            :fn="onClick('endDate')">
            Անջատման օր` {{endDay}}
          </my-button>
        </i-col>
        <i-col>
          <my-button id="open-start-modal" expand="block" color="primary" fill="outline" justify="center"
            :fn="onClick('startDate')">
            Միացման օր` {{startDateAsString}}</my-button>
        </i-col>
      </row>
      <row>
        <ion-label color="warning"><span class="text-size-0.8rem">ակտիվ օրերի քանակ՝ {{ activeDays }}</span>
        </ion-label>
      </row>
    </grid>
    <List :items="items">
      <template #headtext>
        <span class="text-purple-700 font-bold text-size-1rem">Գանձման ենթակա գումար.</span>
      </template>
    </List>
    <modal :is-open="isEndDate">
      <CalculatorCalendar id="endDate" v-model="endDay" :min="config.endDate.min" :is-date-eabled="isDateEabled"
        :confirm="onClick('endDate')" :cancel="onClick('endDate')" title="Նշել անջատման օրվա ամսաթիվը" />
    </modal>
    <modal :is-open="isStartDate">
      <CalculatorCalendar id="startDate" v-model="startDay" :min="config.startDate.min" :confirm="onClick('startDate')"
        :cancel="onClick('startDate')" title="Նշել միացման օրվա ամսաթիվը" />
    </modal>
  </ion-card-content>
  </ion-card>
</template>
