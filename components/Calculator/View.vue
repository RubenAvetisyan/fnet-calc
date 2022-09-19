<script setup lang="ts">
import { ComputedRef, Ref } from 'vue';

const props = defineProps({
  price: { type: Number, required: true },
  percent: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  billdays: { type: Array<number>, default: [11, 16, 21], required: true }
})

const today = useSetFormatForSingleDate(new Date(), 'yyyy-MM-dd')

const dates = ref(today)

const startdays = computed(() => {
  return useDatesStringToNumber(unref(dates))
}) as ComputedRef<number>

const sd = useBillingDay(props.billdays, unref(startdays))
const endDay = ref(sd)

const daysDiff = computed(() => {
  const starts = dates.value //.map(d => useToDate(d))
  const end = new Date(2022, 8, endDay.value)
  return useDifferenceInCalendarDay(starts, end)
})


const result = computed(() => {
  console.log('daysDiff: ', unref(daysDiff));
  return useGeResultValue(dates, daysDiff, 10, props.priceAfterDiscount, 50)
})

const miacmanOr = computed(() => useSetFormatForSingleDate(dates, 'dd/MM/yyyy'))
const unjatmanOr = computed(() => useSetFormatForSingleDate(useSetDate(useAddDays(useToDate(dates), 30), unref(endDay)), 'dd/MM/yyyy'))

const calendarMin = computed(() => {
  return useFormatISO(useSetDate(useToDate(dates), 1))
})
console.log('calendarMin: ', unref(calendarMin));

const items = computed(() => {  
  return [`Միացման օր՝ ${unref(miacmanOr)}`,
  `անջատման օր՝ ${unref(unjatmanOr)}`,
  `Վճարման ենթակա գումար՝ ${unref(result)}դր.`]
})
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
        <mobi-select v-model="endDay" :values="billdays" label="Անջատման օր՝"></mobi-select>
      </i-col>
      <i-col class="basis-1/2">
        <my-button id="open-modal" expand="block" justify="center">Միացման օր {{miacmanOr}}</my-button>
      </i-col>
    </row>
  </grid>
  <List :items="items
  ">
    <template #headtext>
      <span class="text-purple-700 font-bold text-size-1rem">Գանձման ենթակա գումար.</span>
    </template>
  </List>
  <ion-modal trigger="open-modal">
    <CalculatorCalendar id="datetime" v-model="dates" :min="calendarMin" />
  </ion-modal>
    <!-- <div v-for="(date, i) in dates" :key="date">result: {{result[i]}} for {{date}}</div> -->
  </ion-card>
</template>
