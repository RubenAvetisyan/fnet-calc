<script setup lang="ts">
import { ComputedRef, Ref } from 'vue';

const props = defineProps({
  price: { type: Number, required: true },
  percent: { type: Number, required: true },
  billdays: { type: Array<number>, default: [11, 16, 21], required: true }
})

const priceAfterDiscount = computed(() => {
  const price: number = unref(props.price)
  const percent: number = unref(props.percent)

  return price - (price * percent / 100)
})

const today = useSetFormatForSingleDate(new Date(), 'yyyy-MM-dd')

const dates = ref([today])

const startdays = computed(() => {
  return useDatesStringToNumber(unref(dates))
}) as ComputedRef<number[]>

const sd = useBillingDays(props.billdays, unref(startdays))
const endDay = ref(sd)

const daysDiff = computed(() => {
  const starts = dates.value.map(d => useToDate(d))
  const end = new Date(2022, 8, endDay.value)
  return useDifferenceInCalendarDays(starts, end)
})


const result = computed(() => {
  console.log('daysDiff: ', unref(daysDiff));
  return useGeResultValue(dates, startdays, daysDiff, 10, priceAfterDiscount, 50)
})

const items = computed(() => {
  const res = unref(result)
  return unref(dates).map((date, i) => `${date}-ի դեպքում՝ ${res[i]}դր.`)
})
</script>

<template>
  <div class="wrapper bg-white rounded shadow w-full justify-center">
    <ion-item-group class="content-center ">
      <ion-item-divider>
        <ion-label>Ծառայության մատուցման`</ion-label>
      </ion-item-divider>
      <grid>
        <i-col class="basis-1/2">
          <my-button id="open-modal" expand="full" justify="center">Հաշվարկի սկիզբ</my-button>
          <ion-modal trigger="open-modal">
            <CalculatorCalendar id="datetime" v-model="dates" />
          </ion-modal>
        </i-col>
        <i-col class="basis-1/4">
          <mobi-select v-model="endDay" :values="billdays" label="Գանձման օր՝"></mobi-select>
        </i-col>
        </grid>
    </ion-item-group>
    <List :items="items">
      <template #headtext>
        <span class="text-purple-700 font-bold text-size-1.2rem">Գանձման ենթակա գումար.</span>
      </template>
    </List>
    <!-- <div v-for="(date, i) in dates" :key="date">result: {{result[i]}} for {{date}}</div> -->
  </div>
</template>
