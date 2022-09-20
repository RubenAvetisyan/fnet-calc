<script setup lang="ts">
import { differenceInCalendarDays, isSameDay, subMonths, getMonth, setMonth, getDate, addMonths, setDate, addDays } from 'date-fns'
import { Ref } from 'vue';

console.log('test useRoundUp: ', useRoundUp(5000, 50))

const props = defineProps({
  price: { type: Number, required: true },
  percent: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  billdays: { type: Array<number>, default: [11, 16, 21], required: true }
})

const maxBillday = Math.max(...props.billdays)

const minBillday = Math.min(...props.billdays)

const FORMAT = 'yyyy-MM-dd'

const today = useSetFormatForSingleDate(new Date(), FORMAT)

const startDay = ref(today)

const previousMonth = subMonths(Date.now(), 1)

const config = ref({
  startDate: {
    min: useFormatISO(setDate(previousMonth, maxBillday))
  },
  endDate: {
    min: useFormatISO(Date.now())
  }
})



const startDate = computed(() => useToDate(startDay))
const startDateAsString = computed(() => {
  return useSetFormat(startDay, FORMAT)
})
const anjatmanOr = computed(() => {
  return props.billdays.map(billday => {
    const sub = differenceInCalendarDays(setDate(unref(startDate), billday), unref(startDate))
    console.log('sub: ', sub);
    const nextMonth = useAddMonths(startDay, 1)

    return sub <= 0 ? useSetDate(nextMonth, billday) : useSetDate(startDay, billday)
  })
})


// const sd = useBillingDay(props.billdays, unref(startDays))
const filteredDays = computed(() => {
  return anjatmanOr.value.filter(day => {
    const diff = differenceInCalendarDays(day, useToDate(startDay))

    const res = diff >= 0

    return res
  }).sort((a, b) => differenceInCalendarDays(a, b))
})


const end = unref(filteredDays)[0]
const endDay = ref(useSetFormatForSingleDate(end, FORMAT))
const endDate = computed(() => useToDate(startDay))
console.log('endDate: ', endDate);

const activeDays = computed(() => {
  return differenceInCalendarDays(useToDate(endDay), useToDate(startDay))
})

const isDateEabled = (dateString: string | Date) => {
  const date = typeof dateString === 'string' ? useToDate(dateString) : dateString
  const isDate = props.billdays.some(billday => isSameDay(setDate(date, billday), date))
  return isDate
}


const result = computed(() => {
  return useGeResultValue(useToDate(startDay), useToDate(endDay), 10, props.priceAfterDiscount, 50)
})

const items = computed(() => {
  return [`Միացման օր՝ ${useSetFormat(unref(startDate), 'dd/MM/yyyy')}`,
  `Անջատման օր՝ ${useSetFormat(unref(endDay), 'dd/MM/yyyy')}`,
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

const onClendarButtonsClick = (v: string) => async (closeOverlay: boolean) => {
  onClick(v)()
}

const setNextEndDay = (start: Date) => {
  const nextThirtyDays = addDays(start, 30)
  let nearestEndDay = nextThirtyDays

  for (let i = 0; i < 100; i++) {
    if (isDateEabled(nearestEndDay)) {
      break;
    }

    nearestEndDay = addDays(nearestEndDay, 1)
  }

  return nearestEndDay
}

watch(() => startDay.value, (start) => {
  const diff = differenceInCalendarDays(useToDate(start), useToDate(endDay.value))
  if (diff > 0) endDay.value = useSetFormatForSingleDate(setNextEndDay(useToDate(start)), FORMAT)
})
</script>

<template><ion-card>
  <ion-card-header mb-0>
    <ion-card-subtitle mb-0>Ծառայության մատուցման`</ion-card-subtitle>
    <!-- <ion-card-title>Ծառայության մատուցման`</ion-card-title> -->
  </ion-card-header>
  <!-- <ion-label color="secondary"><span class="text-size-1rem">Ծառայության մատուցման`</span></ion-label> -->
  <ion-card-content>
    <grid>
      <row>
        <i-col>
        </i-col>
      </row>
      <row class="ion-align-items-center">
        <i-col>
          <!-- <mobi-select v-model="endDay" :values="orer" label="Անջատման օր՝"></mobi-select> -->
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
        title="Նշել անջատման օրվա ամսաթիվը" />
    </modal>
    <modal :is-open="isStartDate">
      <CalculatorCalendar id="startDate" v-model="startDay" :min="config.startDate.min"
        title="Նշել միացման օրվա ամսաթիվը" />
    </modal>
  </ion-card-content>
  </ion-card>
</template>
