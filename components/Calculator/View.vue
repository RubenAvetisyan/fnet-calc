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

const items = computed(() => {
  return `${unref(dates)}-ի դեպքում՝ ${unref(result)}դր.`
})
</script>

<template>
  <div class="wrapper bg-white rounded shadow w-full justify-center">
    <ion-item-group class="content-center ">
      <ion-item-divider>
        <ion-label color="Secondary" class="text-size-1rem">Ծառայության մատուցման`</ion-label>
      </ion-item-divider>
      <grid>
        <row class="ion-align-items-center">
          <i-col class="basis-1/2">
            <my-button id="open-modal" expand="block" justify="center">Հաշվարկի սկիզբ</my-button>
          </i-col>
          <i-col class="basis-1/4 bg-gr">
            <mobi-select v-model="endDay" :values="billdays" label="Գանձման օր՝"></mobi-select>
          </i-col>
          </row>
          </grid>
          </ion-item-group>
          <List :items="[items]">
            <template #headtext>
              <span class="text-purple-700 font-bold text-size-1.2rem">Գանձման ենթակա գումար.</span>
            </template>
          </List>
          <ion-modal trigger="open-modal">
            <CalculatorCalendar id="datetime" v-model="dates" />
          </ion-modal>
    <!-- <div v-for="(date, i) in dates" :key="date">result: {{result[i]}} for {{date}}</div> -->
  </div>
</template>
