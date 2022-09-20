<script setup lang="ts">
import { differenceInCalendarDays, isSameDay } from 'date-fns'
import { Ref } from 'vue';

const props = defineProps({
  price: { type: Number, required: true },
  percent: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  billdays: { type: Array<number>, default: [11, 16, 21], required: true }
})

const FORMAT = 'yyyy-MM-dd'

const today = useSetFormatForSingleDate(new Date(), FORMAT)

const startday = ref(today)

const calendarMin = computed(() => {
  return useFormatISO(useSetDate(useToDate(startday), 1))
})

const miacmanOr = computed(() => useSetFormatForSingleDate(startday, FORMAT))
const anjatmanOr = computed(() => {
  const mo = miacmanOr
  return props.billdays.map(billday => {
    const start = useDatesStringToNumber(mo) as number
    const sub = billday - start
    const startAsDate = useToDate(startday)
    const nextMonth = useAddMonths(startAsDate, 1)
    console.log('nextMonth: ', nextMonth);
    return sub < 0 ? useSetDate(nextMonth, billday) : useSetDate(startAsDate, billday)
  })
})


// const sd = useBillingDay(props.billdays, unref(startdays))
const filteredDays = computed(() => {
  return anjatmanOr.value.filter(day => {
    const diff = differenceInCalendarDays(day, useToDate(startday))
    console.log('diff: ', diff);
    const res = diff > 0
    console.log('res: ', res);
    return res
  }).sort((a, b) => differenceInCalendarDays(a, b))
})

console.log('unref(filteredDays): ', unref(filteredDays));
const end = unref(filteredDays)[0]
const endDay = ref(useSetFormatForSingleDate(end, FORMAT))

const activeDays = computed(() => {
  return differenceInCalendarDays(useToDate(endDay), useToDate(startday))
})

const isDateEabled = (dateString: string) => {
  const isDate = unref(filteredDays).some(day => {
    const end = useToDate(dateString)
    return isSameDay(day, end)
  })
  return isDate
}


const result = computed(() => {

  return useGeResultValue(miacmanOr, activeDays, 10, props.priceAfterDiscount, 50)
})

const items = computed(() => {
  return [`Միացման օր՝ ${unref(miacmanOr)}`,
  `Անջատման օր՝ ${unref(endDay)}`,
  `Վճարման ենթակա գումար՝ ${unref(result)}դր.`
  ]
})

const isEndDate = ref(false)
const isStartDate = ref(false)

const endDateCalendar = ref<HTMLInputElement | null>(null)

const onClock = (v: string) => () => {
  if (v === 'endDate') {
    isEndDate.value = !isEndDate.value
  }

  if (v === 'startDate') {
    isEndDate.value = !isEndDate.value
  }
}
</script>

<template><ion-card>
  <ion-card-header>
    <ion-card-subtitle>Ծառայության մատուցման`</ion-card-subtitle>
    <!-- <ion-card-title>Ծառայության մատուցման`</ion-card-title> -->
  </ion-card-header>
  <ion-label color="secondary"><span class="text-size-1rem"></span></ion-label>
  <grid>
    <row class="ion-align-items-center">
      <i-col>
        <!-- <mobi-select v-model="endDay" :values="orer" label="Անջատման օր՝"></mobi-select> -->
        <my-button id="open-end-modal" expand="block" color="primary" fill="solid" justify="center" :fn="onClock('endDate')">
          Անջատման օր` {{endDay}}
        </my-button>
        </i-col>
        <i-col>
          <my-button id="open-start-modal" expand="block" color="primary" fill="outline" justify="center"
            :fn="onClock('startDate')">
            Միացման օր` {{miacmanOr}}</my-button>
        </i-col>
        </row>
        <row>
          <ion-label color="warning"><span class="text-size-0.8rem">ակտիվ օրերի քանակ՝ {{ activeDays }}</span></ion-label>
        </row>
        </grid>
        <List :items="items">
          <template #headtext>
            <span class="text-purple-700 font-bold text-size-1rem">Գանձման ենթակա գումար.</span>
          </template>
        </List>
        <ion-modal :is-open="isEndDate">
          <ion-content class="ion-padding">
            <ion-item>
              <CalculatorCalendar ref="endDateCalendar" id="endDate" v-model="endDay" :is-date-eabled="isDateEabled"
                title="Նշել անջատման օրվա ամսաթիվը" />
            </ion-item>
          </ion-content>
        
        </ion-modal>
        <ion-modal :is-open="isStartDate">
          <ion-content class="ion-padding">
            <ion-item>
              <CalculatorCalendar ref="startDate" id="startDate" v-model="startday" :min="calendarMin"
                title="Նշել միացման օրվա ամսաթիվը" />
            </ion-item>
          </ion-content>
        </ion-modal>
  </ion-card>
</template>
